import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';

export default function NoteList({ notes, onSelected }) {
  return (
    <List sx={{maxHeight: '100%', overflow: 'auto'}}>
      {notes.map((note) => (
        <ListItem
          key={note.id}
        >
          <ListItemButton component="a" onClick={() => onSelected(note)}>
              <ListItemText primary={ note.title } />
          </ListItemButton>
      </ListItem>
      ))}
    </List>
  );
}
