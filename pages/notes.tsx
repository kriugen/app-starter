import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import NoteEdit from '../src/components/Note/NoteEdit';
import { Container, Button } from '@mui/material';
import { gql, useMutation } from '@apollo/client'

const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const Notes: NextPage = (params) => {
  const [deleteNote, deleteState] = useMutation(DELETE_NOTE);

  const [notes, setNotes] = useState(params.notes);
  const [note, setNote] = useState(null);
  return (
    <Grid container spacing={1} sx={{height: "200px"}}>
      <Grid xs={3}>
        <Container>
          <Button color="primary" variant="contained" aria-label="add"
            onClick={() => { setNote(null); }}>
              New Note
          </Button>
        </Container>
        <NoteList  
          onSelected={(note) => { setNote(note) }} selectedNote={ note } notes={ notes } />
      </Grid>
      <Grid xs={9}>
        <Button disabled={!note} sx={{float: "right" }} 
          onClick={async () => {
            await deleteNote({variables: { id: note.id }});

            const index = notes.findIndex(n => n.id == note.id);
            let nextNote = null;
            if (index + 1 == notes.length) {
              if (notes.length > 1) {
                nextNote = notes[0];
              }
            } else {
              nextNote = notes[index + 1];
            }
  
            setNote(nextNote);
            notes.splice(index, 1);
            setNotes(notes);
          }}>Delete</Button>
        <NoteEdit 
          onDone={(note) => {
          let n = notes.find(n => n.id == note.id);
          if (n) {
            n.title = note.title;
            n.body = note.body;
          } else {
            notes.push(note);
          }
          setNotes([...notes]);
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

export default Notes
