import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import styles from './NoteEditUI.module.css'

export default function NoteEditUI3({ note, onSubmit }) {
  const titleRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    titleRef.current.value = note?.title || '';
    bodyRef.current.value = note?.body || '';
  }, [note]);

  let throttling = false;
  let timer;

  function submit() {
    throttle(() => {
      onSubmit({
      id: note?.id, 
      title: titleRef.current.value || 'Untitled', 
      body: bodyRef.current.value
    });

    window.clearTimeout(timer);
    throttling = false;
  })};

  function throttle(f) {
    if (!throttling) {
      throttling = true;
      timer = window.setTimeout(f, 1000);
    }
  }
  return (
    <Box>
      <textarea ref={titleRef} placeholder='Title' 
        className={styles.title} onChange={(e) => { submit()}} />
      <textarea ref={bodyRef} rows={5} placeholder='Body' 
        className={styles.body} onChange={(e) => { submit()}} />
    </Box>
  );
};