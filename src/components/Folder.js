import React from "react";
import styled from "styled-components";
import Arrow from "../img/item-arrow.svg";
import Note from "./Note";
import Delete from "../img/delete-icon.svg";
import AddIcon from "../img/add-icon.svg";
import { useState } from "react";
import { useEffect } from "react";
import ImageFolder from "../img/folder-icon.svg";

const Folder = ({
  folder,
  setFolders,
  folders,
  activeNote,
  setActiveNote,
  setCurrentFolder,
  toggle,
  setToggle,
  currentFolder,
  // changeNoteName,
}) => {
  const [isActive, setIsActive] = useState(false);
  let newDate = new Date();

  useEffect(() => {
    if (folder.items.length === 0) {
      setIsActive(false);
    }
  });
  const openNotes = () => {
    setIsActive(!isActive);
  };
  const addNotes = () => {
    setIsActive(true);
    setFolders(
      folders.map((item) => {
        if (item.id === folder.id) {
          return {
            ...item,
            items: [
              ...item.items,
              {
                date: `${newDate.getDate()}/${
                  (newDate.getMonth() + 1).toString.length == 2
                    ? `${newDate.getMonth() + 1}`
                    : `${"0" + (newDate.getMonth() + 1)}`
                }/${newDate.getFullYear()}`,
                name: "",
                id: Math.random(),
                text: "",
              },
            ],
          };
        }
        return item;
      })
    );
  };

  return (
    <StyledFolder onClick={() => setCurrentFolder(folder)}>
      <div
        className="folder-wrapper"
        style={
          folder === currentFolder
            ? { background: "#404040" }
            : { backgroundColor: "transparent" }
        }
      >
        <div className="left">
          <img
            src={Arrow}
            alt=""
            onClick={openNotes}
            style={
              isActive
                ? { transform: "rotate(90deg)" }
                : { transform: "rotate(0deg)" }
            }
          />
          <img src={ImageFolder} alt="Folder" className="folder" />
          {toggle ? (
            <input
              onClick={() => setIsActive(!isActive)}
              className="disabled-input"
              spellcheck="false"
              maxLength="20"
              readOnly
              autoFocus
              onDoubleClick={() => setToggle(false)}
              type="text"
              value={folder.name}
              placeholder="New folder"
              onChange={(e) => {
                setFolders(
                  folders.map((item) => {
                    if (item.id === folder.id) {
                      return {
                        ...item,
                        name: e.target.value,
                      };
                    }

                    return item;
                  })
                );
              }}
            />
          ) : (
            <input
              spellcheck="false"
              maxLength="20"
              autoFocus
              type="text"
              placeholder="New folder"
              onChange={(e) => {
                setFolders(
                  folders.map((item) => {
                    if (item.id === folder.id) {
                      return {
                        ...item,
                        name: e.target.value,
                      };
                    }

                    return item;
                  })
                );
              }}
            />
          )}
        </div>
        <div className="right">
          <img src={AddIcon} alt="" onClick={() => addNotes()} />
          <img
            src={Delete}
            alt=""
            className="delete"
            onClick={() =>
              setFolders(folders.filter((item) => item.id !== folder.id))
            }
          />
        </div>
      </div>
      <div className="notes-wrapper">
        {isActive &&
          folder.items.map((note, key) => (
            <Note
              activeNote={activeNote}
              currentFolder={currentFolder}
              note={note}
              setFolders={setFolders}
              folders={folders}
              folder={folder}
              key={key}
              setActiveNote={setActiveNote}
              toggle={toggle}
              setToggle={setToggle}
            />
          ))}
      </div>
    </StyledFolder>
  );
};

const StyledFolder = styled.div`
  font-size: 16px;
  .notes-wrapper {
    margin-bottom: 5px;
  }
  .disabled-input {
    cursor: pointer;
  }

  img {
    transition: transform 0.2s ease;
  }
  .folder {
    margin-left: 8px;
  }
  input {
    background: transparent;
    border: none;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 500;
    margin-left: 8px;
    outline: none;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
  font-weight: 500;
  .folder-wrapper {
    padding: 10px 15px;
    margin-top: 5px;
    width: 100% !important;
    transition: background-color 0.1s ease;
    border-radius: 6px;

    &:hover {
      background-color: #404040 !important;
    }
    .left {
      display: flex;
      width: 100%;
    }
    .right {
      display: flex;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    p {
      margin-left: 10px;
    }
    .delete {
      margin-left: 15px;
    }
  }
`;

export default Folder;
