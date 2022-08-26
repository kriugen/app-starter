import * as React from 'react';
import { useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Fab, ListItemButton } from '@mui/material';
import Link from 'next/link';
import NoteEdit from './NoteEdit';
import { gql, useMutation } from '@apollo/client';

const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $body: String!) {
    createNote(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

export default function NoteList({ notes, onSelected }) {
  const [createNote, { data, loading, error }] = useMutation(CREATE_NOTE);

  const [ add, setAdd ] = useState(false);
  if (add) {
    return <NoteEdit onSubmit={(note) => createNote({ variables: note })} />
  }

  return (
    <div>
      <List>
        {notes.map((note) => (
          <ListItem
            key={note.id}
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemButton component="a" onClick={() => onSelected(note)}>
                <ListItemText primary={ note.title } />
            </ListItemButton>
        </ListItem>
        ))}
      </List>
      <Fab sx={{ float: 'right' }} color="primary" aria-label="add"
        onClick={() => setAdd(true)}>
        <AddIcon />
      </Fab>
    </div>
  );
}
