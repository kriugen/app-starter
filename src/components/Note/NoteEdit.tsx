import { gql, useMutation } from '@apollo/client'
import { Alert } from '@mui/material';

import NoteEditUI from './NoteEditUI';

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

const NoteEdit = ({ note, onDone }) => {
  const [noteCommand, { data, loading, error }] = useMutation(UPDATE_NOTE);
  return (
      <NoteEditUI note={ note }
      onSubmit={
        async (note) => {
          const result = await noteCommand({ variables: note });
          onDone(result.data.updateNote); 
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
