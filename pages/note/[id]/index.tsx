import type { NextPage } from 'next'
import { prisma } from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const NoteViewPage: NextPage = ({ note }) => {
    if (!note) {
        return <div>Not Found</div>;
    }

    return (
        <>
            <div><Link href={`/note/${note.id}/edit`}><a>Edit</a></Link></div>
            <b>{note.title}</b>
            <div>
                {note.body}
            </div>
        </>
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
