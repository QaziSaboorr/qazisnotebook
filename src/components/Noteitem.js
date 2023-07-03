import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
export default function Noteitem(props) {
  const note = props.note;
  const updateNote = props.updateNote;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      {" "}
      {/* coloumns will occupy 1/4 or 3 out of 12 coloumn space */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">{note.tag}</p>
          <i
            className="fa-regular fa-square-minus mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i
            className="fa-regular fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
