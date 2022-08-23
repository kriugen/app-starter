import type { NextPage } from 'next'
import { prisma } from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import NoteView from '../../../src/components/Note/NoteView';

const NoteViewPage: NextPage = ({ note }) => {
    if (!note) {
        return <div>Not Found</div>;
    }

    return (
        <NoteView note={note} />
    )
}

export const getServerSideProps = async ({ params, req, res }) => {
  const { user } = getSession(req, res);
  const notes = await prisma.note.findMany({
    where: { AND: [ { id: params.id }, { userId: user.id } ] },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  return {
    props: {
      note: notes && notes.length > 0 ? notes[0] : null,
    },
  };
};

export default NoteViewPage
