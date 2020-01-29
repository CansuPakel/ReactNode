import React, { useState, useContext } from "react";
import NoteContext from '../context/notes-context';

const AddNoteForm = () => {
    const {dispatch} = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = e => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTE",
      title,
      body
    });
    setTitle(""); //remove wat in inputstaat
    setBody("");
  };

  return (
    <form onSubmit={addNote}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={body} onChange={e => setBody(e.target.value)}></textarea>
      <button>add note</button>
    </form>
  );
};

export default AddNoteForm;
