import React from "react";

export default function Noteitem(props) {
  const note = props.note;
  return (
    <div>
      {note.title}
      {note.description}
    </div>
  );
}
