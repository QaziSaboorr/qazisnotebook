import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const note = [];

  const [notes, setNotes] = useState(note);

  const GetAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YmRmODdiNTI3YmZlYWE3NGJiODdmIn0sImlhdCI6MTY4Njg4ODMyN30.EzEqHmVe9fSwFcfrqUlImUjcqgFJ9C7K2ZH14g1-ymI",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  let addNote = async (note) => {
    // To Do Api Call
    const title = note.title;
    const description = note.description;
    const tag = note.tag;
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YmRmODdiNTI3YmZlYWE3NGJiODdmIn0sImlhdCI6MTY4Njg4ODMyN30.EzEqHmVe9fSwFcfrqUlImUjcqgFJ9C7K2ZH14g1-ymI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();
    const json = await response.json();
    console.log(json);
    let Note = json;
    setNotes(notes.concat(Note));
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YmRmODdiNTI3YmZlYWE3NGJiODdmIn0sImlhdCI6MTY4Njg4ODMyN30.EzEqHmVe9fSwFcfrqUlImUjcqgFJ9C7K2ZH14g1-ymI",
      },
    });

    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4YmRmODdiNTI3YmZlYWE3NGJiODdmIn0sImlhdCI6MTY4Njg4ODMyN30.EzEqHmVe9fSwFcfrqUlImUjcqgFJ9C7K2ZH14g1-ymI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const json = response.json();
    let tempNote = [...notes]; //THIS IS TO MAKE DEEP COPY OF ARRAY
    for (let index = 0; index < notes.length; index++) {
      const element = tempNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        tempNote[index] = element;
        break;
      }
    }
    setNotes(tempNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, GetAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
