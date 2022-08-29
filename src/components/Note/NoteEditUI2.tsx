import { useEffect, useState } from 'react';
import { Box } from "@mui/material";

export default function NoteEditUI2({ note, onSubmit }) {
  const [title, setTitle] = useState(note?.title);
  const [body, setBody] = useState(note?.body);
  useEffect(() => {
    setTitle(note?.title);
  }, [note]);

  function submitTitle(val) {
    setTitle(val);
    onSubmit({id: note?.id, title: val, body});
  }

  function submitBody(val) {
    setBody(val);
    onSubmit({id: note?.id, title, body: val});
  }

  return (
    <Box>
      <input type='hidden' value={note.id} />
      <input type='text' value={title} onChange={(e) => submitTitle(e.target.value)} />
      <input type='text' value={body} onChange={(e) => submitBody(e.target.value)} />
    </Box>
  );
};