import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const note = [
    //
    {
      _id: "648be324b527bfdweaa74bb889",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Title",
      description: "Please wake up early",
      tag: "Personal",
      date: "2023-06-16T04:20:52.825Z",
      __v: 0,
    },
    {
      _id: "6498ddb9a9fd87961asda09bab74",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Please wake up early",
      tag: "Personal",
      date: "2023-06-26T00:37:13.781Z",
      __v: 0,
    },
    {
      _id: "6498ddbda9fd8796dasd109bab76",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Please wake up eweqearly",
      tag: "Personal",
      date: "2023-06-26T00:37:17.131Z",
      __v: 0,
    },
    {
      _id: "6498ddbfa9fd87961asdas09bab78",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Pleaseweqweqw wake up eweqearly",
      tag: "Personal",
      date: "2023-06-26T00:37:19.254Z",
      __v: 0,
    },
    {
      _id: "648be324b527bfewqdqaa74bb889",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Title",
      description: "Please wake up early",
      tag: "Personal",
      date: "2023-06-16T04:20:52.825Z",
      __v: 0,
    },
    {
      _id: "6498ddb9a9fd879rwq6109bab74",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Please wake up early",
      tag: "Personal",
      date: "2023-06-26T00:37:13.781Z",
      __v: 0,
    },
    {
      _id: "6498ddbda9fd87961rqw09bab76",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Please wake up eweqearly",
      tag: "Personal",
      date: "2023-06-26T00:37:17.131Z",
      __v: 0,
    },
    {
      _id: "6498ddbfa9twqefd8796109bab78",
      user: "648bdf87b527bfeaa74bb87f",
      title: "My Titlfweeff",
      description: "Pleaseweqweqw wake up eweqearly",
      tag: "Personal",
      date: "2023-06-26T00:37:19.254Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(note);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
