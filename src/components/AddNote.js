import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";
const AddNote = () => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(noteContext);
  const { addNote } = context;
  let handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //this uses dot operator to deform original note fields and combine them with new fields value with same name
  };
  let handleClick = (e) => {
    e.preventDefault();

    addNote(note);
    setNote({ title: "", description: "", tag: "" });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleChange}
              value={note.title}
            />
            <div id="title" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleChange}
              value={note.description}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleChange}
              value={note.tag}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
            disabled={note.description.length < 5 || note.title.length < 5}
            value={note}
          >
            AddNote
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
