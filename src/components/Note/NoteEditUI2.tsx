import { useEffect, useState, useRef } from 'react';
import { Box } from "@mui/material";

export default function NoteEditUI2({ note, onSubmit }) {
  const titleInput = useRef(null);
  const bodyInput = useRef(null);

  useEffect(() => {
    titleInput.current.value = note?.title ?? '';
    bodyInput.current.value = note?.body ?? '';
  }, [note]);

  const timeout = 1000;
  let timer;
  function change() {
    console.log(titleInput.current.value)
      clearTimeout(timer);
      timer = setTimeout(() => {  
        onSubmit({id: note?.id, 
          title: titleInput.current.value, 
          body: bodyInput.current.value});
    }, timeout);
  }

  return (
    <Box>
      <input ref={titleInput} type='text' onChange={(e) => change()} />
      <input ref={bodyInput} type='text' onChange={(e) => change()} />
    </Box>
  );
};