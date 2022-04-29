import React from "react";
import styled from "styled-components";
import Folder from "./Folder";
import FolderIcon from "../img/folder-icon.svg";
const Nav = ({
  folders,
  setFolders,
  notes,
  setNotes,
  activeNote,
  setActiveNote,
  setCurrentFolder,
  toggle,
  setToggle,
  currentFolder,
  changeNoteName,
  isMenuOpen,
}) => {
  const newFolder = () => {
    setFolders([
      ...folders,
      {
        name: "",
        items: [],
        id: Math.random(),
      },
    ]);
  };

  return (
    <StyledNav
      style={
        isMenuOpen
          ? { transform: "translateX(0)" }
          : { transform: "translateX(-100%)" }
      }
    >
      {/* <div className="logo">
        <img src={Logo} alt="Logo" />
      </div> */}
      <div className="folders-wrapper">
        {folders.map((folder, key) => {
          return (
            <Folder
              key={key}
              currentFolder={currentFolder}
              toggle={toggle}
              setToggle={setToggle}
              folder={folder}
              setFolders={setFolders}
              folders={folders}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              setCurrentFolder={setCurrentFolder}
              // changeNoteName={changeNoteName}
            />
          );
        })}
      </div>
      {/* <p className="add-folder" onClick={() => newFolder()}>
        Add new folder...
      </p> */}
      <button className="add-folder" onClick={() => newFolder()}>
        <img src={FolderIcon} alt="Add folder" className="folder-icon" />
        <p>Add folder</p>
      </button>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  transition: transform 0.3s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .add-folder {
    cursor: pointer;
    width: 100%;
    background-color: #262626;
    color: white;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    padding: 15px 0;
    margin-bottom: 10px;
  }
  padding: 10px 10px 0 10px;
  position: fixed;
  overflow-y: scroll;
  .logo {
    padding: 0 0 0 15px;
    margin-bottom: 0 !important;
    img {
      margin-right: 10px;
    }
  }
  .add-folder {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    .folder-icon {
      margin-right: 5px;
    }
  }
  min-width: 370px;
  height: 100vh;
  background-color: #171717;
  /* box-shadow: 9px 8px 59px -12px rgba(214, 214, 214, 1); */
`;

export default Nav;
