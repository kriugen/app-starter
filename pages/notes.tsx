import type { NextPage } from 'next'
import prisma from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const Profile: NextPage = ({ notes }) => {
  return (
    <>
    { 
      notes.map((note) => {
        return <div key={note.id}>
            <Link href={`/note/${note.id}`}>
            <a>{note.title}</a>
          </Link>
        </div>;
      })
    }
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const { user } = getSession(req, res);
  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};

export default Profile
