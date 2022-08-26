import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import NoteEdit from '../src/components/Note/NoteEdit';
import NoteView from '../src/components/Note/NoteView';

const Profile: NextPage = (params) => {
  const [notes, setNotes] = useState(params.notes);
  const [note, setNote] = useState(null);
  const [edit, setEdit] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <NoteList onSelected={(note) => setNote(note)} notes={ notes } />
      </Grid>
      <Grid xs={9}>
        { 
          edit 
            ? <NoteEdit onDone={(note) => {
              setNote(note);
              const n = notes.find(n => n.id == note.id);
              n.title = note.title;
              n.body = note.body;
              setNotes(notes);
              setEdit(false);
            }} note={note} />
            : <NoteView onEdit={() => setEdit(true)} note={note} /> 
        }
      </Grid>
    </Grid>
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
