import type { NextPage } from 'next'
import { gql, useMutation, useQuery } from '@apollo/client'

import { prisma } from '../../../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import NoteEdit from '../../../src/components/Note/NoteEdit';

const UPDATE_NOTE = gql`
  mutation UpdateNote($title: String, $body: String, $updateNoteId: String) {
    updateNote(title: $title, body: $body, id: $updateNoteId) {
      id
      userId
      title
      body
    }
  }
`;

const NoteEditPage: NextPage = ({ note }) => {
  const [updateNote, { data, loading, error }] = useMutation(UPDATE_NOTE);

    if (!note) {
        return <div>Not Found</div>;
    }

    return (
        <>
            <div><Link href={`/note/${note.id}`}><a>View</a></Link></div>
            <NoteEdit data={ note } onSubmit={
              (note) => updateNote({ variables: { ...note, updateNoteId: note.id }})
            } />
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

export default NoteEditPage
