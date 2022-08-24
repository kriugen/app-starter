import { gql, useMutation } from '@apollo/client'

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
      <NoteEditUI data={ note } onSubmit={
        (note) => updateNote({ variables: { ...note, updateNoteId: note.id }})
      } />
    )
}

export default NoteEdit
