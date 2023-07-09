import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3 bg-dark">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">
              {note.title}{" "}
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </h5>
          </div>
          <p className="card-text">{note.description}</p>
          <hr />
          <span className="d-flex gap-3">
            <i
              className="fa-sharp fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <p className="card-text">#{note.tag}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
