import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function NoteView({ note, onEdit }) {
  if (!note)
    return null;
  
    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="caption">
          { note.title }
        </Typography>
        <Typography variant="body2">
          { note.body }
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onEdit(true)} size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}
