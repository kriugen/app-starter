import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import NoteEdit from '../src/components/Note/NoteEdit';
import { Container, Button } from '@mui/material';

const Profile: NextPage = (params) => {
  const [notes, setNotes] = useState(params.notes);
  const [note, setNote] = useState(null);
  const [dirty, setDirty] = useState(false);
  return (
    <Grid container spacing={1} sx={{height: "200px"}}>
      <Grid xs={3} sx={{backgroundColor: "red"}}>
        <Container>
          <Button color="primary" variant="contained" aria-label="add"
            onClick={() => { setNote(null); }}>
              New Note
          </Button>
        </Container>
        <NoteList  
          onSelected={(note) => { setNote(note) }} notes={ notes } />
      </Grid>
      <Grid xs={9}>
        <NoteEdit 
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
        }} 
        onDeleted={(note) => {
          const index = notes.findIndex(n => n.id == note.id);
          notes.splice(index, 1);
          setNotes(notes);
          setNote(null);
        }}
        note={note} />
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
