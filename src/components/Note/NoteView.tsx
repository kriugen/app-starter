import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function NoteView({ note }) {
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
        <Link href={`/note/${note.id}/edit`}>
          <Button size="small">Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
