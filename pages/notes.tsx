import type { NextPage } from 'next'
import { prisma } from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import NoteList from '../src/components/Note/NoteList';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

const Profile: NextPage = ({ notes }) => {
  const [note, setNote] = useState(null);
  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <NoteList onSelected={(note) => setNote(note)} notes={ notes } />
      </Grid>
      <Grid xs={9}>
        {note && note.title}
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const { user } = getSession(req, res);
  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      title: true,
      body: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};

export default Profile
