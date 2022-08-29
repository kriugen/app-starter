import { gql, useMutation } from '@apollo/client'
import { Alert } from '@mui/material';

import NoteEditUI from '../../../src/components/Note/NoteEditUI';

const UPDATE_NOTE = gql`
  mutation UpdateNote($title: String, $body: String, $id: String) {
    updateNote(title: $title, body: $body, id: $id) {
      id
      userId
      title
      body
    }
  }
`;

const CREATE_NOTE = gql`
  mutation CreateNote($title: String!, $body: String!) {
    createNote(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

const NoteEdit = ({ note, onDone, onChange }) => {
  const [noteCommand, { data, loading, error }] = useMutation(note ? UPDATE_NOTE : CREATE_NOTE);
  const [deleteNote, deleteState] = useMutation(DELETE_NOTE);

  return (
      <NoteEditUI note={ note }
      onChange={onChange}
      onDelete={(note) => {
        deleteNote({variables: { id: note.id }});
      }}
      onSubmit={
        async (note) => { 
        const result = await noteCommand({ variables: note });
        onDone(result.data.createNote ?? result.data.updateNote); 
      }}

      genericMessage={
        error && 
          <Alert data-test="form-error" severity="error">
              {error.message}
          </Alert>
        }
        disabled={loading}
      />
    )
}

export default NoteEdit
