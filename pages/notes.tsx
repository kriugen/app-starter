import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import NoteEdit from '../src/components/Note/NoteEdit';
import NoteView from '../src/components/Note/NoteView';
import { Container, Button } from '@mui/material';

const Profile: NextPage = (params) => {
  const [notes, setNotes] = useState(params.notes);
  const [note, setNote] = useState(null);
  const [edit, setEdit] = useState(false);
  const [dirty, setDirty] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
      <Container>
        <Button color="primary" variant="contained" aria-label="add"
          onClick={() => { setNote(null); setEdit(true)}}>
            New Note
        </Button>
      </Container>
        <NoteList onSelected={(note) => { setEdit(false); setNote(note) }} notes={ notes } />
      </Grid>
      <Grid xs={9}>
        { 
          edit 
            ? <NoteEdit 
              onChange={(dirty) => { setDirty(dirty); } } 
              onDone={(note) => {
              setNote(note);
              let n = notes.find(n => n.id == note.id);
              if (n) {
                n.title = note.title;
                n.body = note.body;
              } else {
                notes.push(note);
              }
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
