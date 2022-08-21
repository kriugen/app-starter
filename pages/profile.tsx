import type { NextPage } from 'next'
import prisma from '../lib/prisma';
import { useProfile } from '../src/components/Profile/hooks';
import { getSession } from '@auth0/nextjs-auth0';

const Profile: NextPage = ({ user }) => {
  console.log('---USER', user);
  return (
    <>
      <div>
        User Profile
      </div>
      <div>
        { user.email }
      </div>
      <div>
        Created At
        { user.createdAt }
      </div>
      <div>
        Updated At
        { user.updatedAt }
      </div>
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const { user } = getSession(req, res);
  let dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: {
      id: true,
      email: true,
      image: true,
      createdAt: true,
      updatedAt: true
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: { email: user.email },
    });
  }

  return {
    props: {
      user: { 
        ...dbUser, 
        createdAt: dateToString(dbUser?.createdAt), 
        updatedAt: dateToString(dbUser?.updatedAt) 
      },
    },
  };
};

function dateToString(date?: Date) {
  return date?.toString();
}

export default Profile
