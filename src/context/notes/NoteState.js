import { useState } from "react";
import NoteContext from "./NoteContext";
import apiHost from "../../datas/Host";
import axios from "axios";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    try {
      const { data } = await axios.get(apiHost + "/api/notes/fetchallnotes", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (data?.success) {
        setNotes(data.data);
      }
    } catch (error) {
      alert(error.response.data.errors[0].msg);
    }
  };

  const addNote = async (title, description, tag) => {
    const { data } = await axios.post(
      apiHost + "/api/notes/addnote",
      { title, description, tag },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    console.log(data);
    getNotes();
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const { data } = await axios.put(
        apiHost + "/api/notes/updatenote/" + id,
        { title, description, tag },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      getNotes();
    } catch (error) {
      alert(error.response.data.errors[0].msg);
    }
  };

  const deleteNote = async (id) => {
    const isDelete = window.confirm("Apakan anda yakin ingin menghapus?");
    if (isDelete) {
      const { data } = await axios.delete(
        apiHost + "/api/notes/deletenote/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      console.log(data);
      getNotes();
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
