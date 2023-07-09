import { useState } from "react";
import NoteContext from "./NoteContext";
import apiHost from "../../datas/Host";

const NoteState = (props) => {
  const getToken = localStorage.getItem("auth-token");
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const response = await fetch(apiHost + "/api/notes/fetchallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken,
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      setNotes(json.data);
    }
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(apiHost + "/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log(note);
    getNotes();
  };

  const deleteNote = async (id) => {
    const isDelete = window.confirm("Apakan anda yakin ingin menghapus?");
    if (isDelete) {
      const response = await fetch(apiHost + "/api/notes/deletenote/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken,
        },
      });
      await response.json();
      getNotes();
    }
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(apiHost + "/api/notes/updatenote/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    await response.json();
    getNotes();
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
