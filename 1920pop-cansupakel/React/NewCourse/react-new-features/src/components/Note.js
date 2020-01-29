import React, { useContext } from "react";
import useMousePosition from '../hooks/useMousePosition'
import NotesContext from "../context/notes-context";

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        {position.x}, {position.y}
      </p>
      <button
        onClick={() => dispatch({ type: "REMOVE_NOTE", title: note.title })}
      >
        x
      </button>
    </div>
  );
};

export { Note as default };
