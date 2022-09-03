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

const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $body: String) {
    createNote(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const NoteEdit = ({ note, onDone }) => {
  const [noteCommand, { data, loading, error }] = useMutation(note ? UPDATE_NOTE : CREATE_NOTE);
  return (
      <NoteEditUI note={ note }
      onSubmit={
        async (note) => {
        console.log('++submit', noteCommand, note);
        try {
        const result = await noteCommand({ variables: note });
        } catch (e) {
          console.log('+ERRORS', JSON.stringify(e, null, 2));
          throw e;
        }
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
