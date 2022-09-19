import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import NoteEdit from '../src/components/Note/NoteEdit';
import { Container, Button, Snackbar, IconButton, Alert } from '@mui/material';
import { gql, useMutation } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close';

const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const Notes: NextPage = (params) => {
  if (params.notes == null) {
    return <Alert data-test="login-error" severity="error">Please login</Alert>
  }

  const [deleteNote, deleteState] = useMutation(DELETE_NOTE);

  const [notes, setNotes] = useState(params.notes);
  const [note, setNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);
  const [noteIndex, setNoteIndex] = useState(-1);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    console.log('reason', reason);
    if (reason == 'undo') {
      notes.splice(noteIndex, 0, deletingNote);
      setNote(deletingNote);
      setNotes(notes);
    } else {
      if (deletingNote)
        deleteNote({variables: { id: deletingNote.id }});
    }

    setDeletingNote(null);
  };
  
  const action = (
    <>
      <Button color="secondary" size="small" onClick={(e) => handleClose(e, 'undo')}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
    <Grid container sx={{height: "200px"}}>
      <Grid xs={3}>
        <Container>
          <Button data-test='new-note-button' color="primary" variant="contained" aria-label="add"
            onClick={() => { setNote(null); }}>
              New Note
          </Button>
        </Container>
        <NoteList  
          onSelected={(note) => { setNote(note) }} selectedNote={ note } notes={ notes } />
      </Grid>
      <Grid xs={9}>
        <Button disabled={ !note || !!deletingNote } sx={{float: "right" }} 
          onClick={async () => {
            const index = notes.findIndex(n => n.id == note.id);
            setNoteIndex(index);
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
            
            setDeletingNote(note);
          }}>Delete</Button>
        <NoteEdit 
          onDone={(note) => {
          let n = notes.find(n => n.id == note.id);
          if (n) {
            n.title = note.title;
            n.body = note.body;
          } else {
            notes.push(note);
            setNote(note);
          }
          setNotes([...notes]);
        }}
        note={note} />
      </Grid>
    </Grid>
    <Snackbar
        open={!!deletingNote}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note deleted"
        action={action}
      />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  if (!session)
    return {
      props: {
        notes: null,
      },
    };

    const notes = await prisma.note.findMany({
    where: { userId: session.user.id },
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
