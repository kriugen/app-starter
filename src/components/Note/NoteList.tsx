import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { Fab, ListItemButton } from '@mui/material';
import Link from 'next/link';

export default function NoteList({ notes }) {
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
            <Link href={`/note/${note.id}`}>
            <ListItemButton component="a">
                <ListItemText primary={ note.title } />
            </ListItemButton>
            </Link>
        </ListItem>
        ))}
      </List>
      <Fab sx={{ float: 'right' }} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}
