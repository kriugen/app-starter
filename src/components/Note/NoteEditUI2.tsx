import { Box, Button } from "@mui/material";

export default function NoteEditUI2(props) {
  const { note } = props;

  return (
    <Box>
      <input type='text' />
      <input type='text' />                
    </Box>
  );
};