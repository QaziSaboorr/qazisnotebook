import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext"; //going up one step
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
export default function Notes() {
  const context = useContext(noteContext);
  const { notes, GetAllNotes, editNote } = context;
  useEffect(() => {
    GetAllNotes();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (current) => {
    ref.current.click();
    setNote({
      id: current._id,
      etitle: current.title,
      edescription: current.description,
      etag: current.tag,
    });
  };
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  let handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //this uses dot operator to deform original note fields and combine them with new fields value with same name
  };
  let handleClick = () => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>

              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleChange}
                    value={note.etitle}
                  />
                  <div id="title" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={handleChange}
                    value={note.edescription}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleChange}
                    value={note.etag}
                  />
                </div>
              </form>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleClick();
                }}
                disabled={
                  note.edescription.length < 5 || note.etitle.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>

        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((notes) => {
          return (
            <Noteitem key={notes._id} note={notes} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
}
