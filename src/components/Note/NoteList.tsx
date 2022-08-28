import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';

export default function NoteList({ notes, onSelected, selectedNote }) {
  return (
    <List sx={{maxHeight: '100%', overflow: 'auto'}}>
      {notes.map((note) => (
        <NoteListItem 
          key={note.id}
          note={ note } 
          selectedNote={ selectedNote }
          onSelected = {(note) => { onSelected(note); }}
          />
      ))}
    </List>
  );
}

function NoteListItem({ note, selectedNote, onSelected }) {
  return <ListItem
        >
          <ListItemButton component="a" 
            selected={ selectedNote && selectedNote.id == note.id }
            onClick={() => { onSelected(note)}}>
              <ListItemText primary={ note.title } />
          </ListItemButton>
      </ListItem>
}
