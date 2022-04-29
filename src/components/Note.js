import React, { useState } from "react";
import styled from "styled-components";
import NoteIcon from "../img/item-icon.svg";
import Delete from "../img/delete-icon.svg";
const Note = ({
  note,
  setFolders,
  folder,
  folders,
  setActiveNote,
  setCurrentFolder,
  toggle,
  setToggle,
  isActive,
  currentFolder,
  activeNote,
}) => {
  const deleteNote = (e) => {
    setFolders(
      folders.map((el) => {
        if (el.id === folder.id) {
          return {
            ...el,
            items: folder.items.filter((element) => element.id !== note.id),
          };
        }
        return el;
      })
    );
  };
  const changeNoteName = (e) => {
    setActiveNote({
      ...note,
      name: e.target.value,
    });
    setFolders(
      folders.map((el) => {
        if (el.id === folder.id) {
          return {
            ...el,
            items: el.items.map((item) => {
              if (item.id === note.id) {
                return {
                  ...item,
                  name: e.target.value,
                };
              }
              return item;
            }),
          };
        }
        return el;
      })
    );
  };
  return (
    <StyledNote>
      <div className="note-wrapper" onClick={() => setActiveNote(note)}>
        <img src={NoteIcon} alt="" />
        {toggle ? (
          <input
            maxLength="20"
            readOnly
            className="input-readonly"
            type="text"
            placeholder="New note"
            onChange={changeNoteName}
            value={note.name}
            onDoubleClick={() => setToggle(false)}
          />
        ) : (
          <input
            maxLength="20"
            type="text"
            placeholder="New note"
            onChange={changeNoteName}
            value={note.name}
          />
        )}
      </div>
      <img src={Delete} alt="" onClick={deleteNote} />
    </StyledNote>
  );
};

const StyledNote = styled.div`
  transition: background-color 0.1s ease;
  font-size: 16px;
  padding: 10px 15px 10px 35px;
  align-items: center;
  border-radius: 6px;
  margin-top: 5px;
  &:hover {
    background-color: #404040;
  }
  display: flex;
  justify-content: space-between;
  .input-readonly {
    cursor: pointer;
  }
  .note-wrapper {
    display: flex;
    cursor: pointer;
    p {
      width: 200px;
    }
  }
`;

export default Note;
