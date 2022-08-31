import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';

export default function NoteList({ notes, onSelected, selectedNote }) {
  return (
    <List sx={{maxHeight: '100%', overflow: 'auto', width: '250px'}}>
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
  function shorten(text) {
    const max = 20;
    if (text.length > max) {
      return text.substring(0, max - 3) + '...';
    }

    return text;
  }
  return <ListItem>
          <ListItemButton component="a" 
            selected={ selectedNote && selectedNote.id == note.id }
            onClick={() => { onSelected(note)}}>
              <ListItemText primary={ shorten(note.title) } />
          </ListItemButton>
      </ListItem>
}
