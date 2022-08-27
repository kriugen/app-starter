import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, ListItemButton } from '@mui/material';

export default function NoteList({ notes, onSelected }) {
  return (
    <Box>
      <List>
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
    </Box>
  );
}
