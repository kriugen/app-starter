import { Box } from "@mui/material";
import { DebounceInput } from 'react-debounce-input'
import styles from './NoteEditUI.module.css'

export default function NoteEditUI3({ note, onSubmit }) {
  function submit({title, body }: { title?: string, body?: string}) {
    onSubmit({
      id: note?.id, 
      title: title || note?.title, 
      body: body || note?.body 
    });
  }
  return (
    <Box>
      <DebounceInput placeholder='Title' className={styles.title} type='text' debounceTimeout={500} value={note?.title} 
        onChange={(e) => submit({ title: e.target.value })} />
      <DebounceInput element={'textarea'} rows="5" placeholder='Body' className={styles.body} type='text' debounceTimeout={500} value={note?.body} 
        onChange={(e) => submit({ body: e.target.value })} />
    </Box>
  );
};