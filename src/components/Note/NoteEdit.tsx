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

const NoteEdit = ({ note, onDone, onChange }) => {
  const [noteCommand, { data, loading, error }] = useMutation(note ? UPDATE_NOTE : CREATE_NOTE);
    return (
      <NoteEditUI note={ note }
      onChange={onChange}
      onSubmit={
        (note) => { 
        noteCommand({ variables: note });
        onDone(note); 
      }}

      genericMessage={
        error
          ? (
            <Alert data-test="form-error" severity="error">
              {error.message}
            </Alert>
          )
          : ((data && !loading) && <Alert data-test='form-success' severity='info'>
            {note ? 'Updated' : 'Created'}&nbsp;Successfully!
          </Alert>)
        }
        disabled={loading}
      />
    )
}

export default NoteEdit
