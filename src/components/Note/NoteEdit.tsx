import { gql, useMutation } from '@apollo/client'
import { Alert } from '@mui/material';

import NoteEditUI from '../../../src/components/Note/NoteEditUI';

const UPDATE_NOTE = gql`
  mutation UpdateNote($title: String, $body: String, $updateNoteId: String) {
    updateNote(title: $title, body: $body, id: $updateNoteId) {
      id
      userId
      title
      body
    }
  }
`;

const NoteEdit = ({ note }) => {
  const [updateNote, { data, loading, error }] = useMutation(UPDATE_NOTE);

    if (!note) {
        return <div>Not Found</div>;
    }

    return (
      <NoteEditUI data={ note } 
      onSubmit={
        (note) => updateNote({ variables: { ...note, updateNoteId: note.id }})
      } 
      genericMessage={
        error
          ? (
            <Alert data-test="form-error" severity="error">
              {error.message}
            </Alert>
          )
          : ((data && !loading) && <Alert data-test='form-success' severity='info'>
            {note.id ? 'Updated' : 'Created'}&nbsp;Successfully!
          </Alert>)
      }
      disabled={loading}
      />
    )
}

export default NoteEdit
