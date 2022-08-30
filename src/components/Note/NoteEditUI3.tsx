import { Box } from "@mui/material";
import { DebounceInput } from 'react-debounce-input'

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
      <DebounceInput type='text' debounceTimeout={500} value={note?.title} 
        onChange={(e) => submit({ title: e.target.value })} />
      <DebounceInput type='text' debounceTimeout={500} value={note?.body} 
        onChange={(e) => submit({ body: e.target.value })} />
    </Box>
  );
};