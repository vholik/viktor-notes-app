import GlobalStyle from "./globalStyles";
import Nav from "./components/Nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Logo from "./img/logo.svg";
function App() {
  const [folders, setFolders] = useState(
    JSON.parse(localStorage.getItem("folders") || "[]")
  );
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);
  const [toggle, setToggle] = useState(true);
  const [activeNote, setActiveNote] = useState({
    name: "Hello people👋",
    text: `This is Viktor's Note and it was created by Viktor Holik. In the navbar you can create theme folders and notes to them, it's simple. Let's rock!`,
  });
  const [currentFolder, setCurrentFolder] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const textareaHandler = (e) => {
    if (currentFolder.items.some((e) => e.id === activeNote.id) === false) {
      alert("Please choose your note");
    }
    currentFolder.items.map((it) => {
      if (it.id == activeNote.id) {
        setActiveNote({
          ...activeNote,
          text: e.target.value,
        });
        setFolders(
          folders.map((element) => {
            if (element.id === currentFolder.id) {
              return {
                ...currentFolder,
                items: element.items.map((item) => {
                  if (item.id === activeNote.id) {
                    return {
                      ...item,
                      text: e.target.value,
                    };
                  }
                  return item;
                }),
              };
            }
            return element;
          })
        );
      }
    });
  };

  const changeNoteName = (e) => {
    setFolders(
      folders.map((el) => {
        if (el.id === currentFolder.id) {
          return {
            ...el,
            items: currentFolder.items.map((el) => {
              if (el.id === activeNote.id) {
                return {
                  ...el,
                  name: e.target.value,
                };
              }
              return el;
            }),
          };
        }
        return el;
      })
    );
  };

  return (
    <div className="App" onClick={() => setToggle(true)}>
      <GlobalStyle />
      <Wrapper>
        <Nav
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggle={toggle}
          setToggle={setToggle}
          folders={folders}
          setFolders={setFolders}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          setCurrentFolder={setCurrentFolder}
          currentFolder={currentFolder}
          changeNoteName={changeNoteName}
        />
        <div
          className="burger"
          style={isMenuOpen ? { marginLeft: "385px" } : { transform: "15px" }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="burger__line"></div>
          <div className="burger__line"></div>
          <div className="burger__line"></div>
        </div>
        <div className="container-wrapper">
          <div className="header-wrapper">
            <input
              className="logo"
              spellCheck="false"
              maxLength="20"
              autoFocus
              type="text"
              placeholder="New note"
              onChange={(e) => {
                setActiveNote({
                  ...activeNote,
                  name: e.target.value,
                });
                setFolders(
                  folders.map((el) => {
                    if (el.id === currentFolder.id) {
                      return {
                        ...el,
                        items: currentFolder.items.map((el) => {
                          if (el.id === activeNote.id) {
                            return {
                              ...activeNote,
                              name: e.target.value,
                            };
                          }
                          return el;
                        }),
                      };
                    }
                    return el;
                  })
                );
              }}
              value={activeNote.name}
            />
            <p className="note-time">{activeNote.date}</p>
          </div>
          <div className="line"></div>
          <textarea
            spellcheck="false"
            onChange={textareaHandler}
            value={activeNote.text}
            placeholder="Fell free to express your feelings..."
          ></textarea>
        </div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  font-family: "Inter", sans-serif;
  .burger {
    margin-left: 15px;
    margin-top: 15px;
    transition: margin 0.3s ease;
    &__line {
      height: 3px;
      width: 35px;
      background-color: white;
      margin-bottom: 5px;
      /* border-radius: 2px; */
    }
  }
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      font-size: 30px;
      background-color: #0f0f0f;
      color: white;
    }
    .note-time {
      font-size: 16px;
      color: rgba(211, 211, 211, 0.6);
    }
  }
  .logo {
    display: block;
    font-size: 41px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: Inter, sans-serif;
    border: none;
    outline: none;
  }
  display: flex;
  .container-wrapper {
    margin-top: 100px;
    margin: 100px auto 0 auto;
    width: 600px;
    textarea {
      resize: none;
      width: 100%;
      height: 60vh;
      outline: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-family: "Inter", sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 24px;
      background-color: #0f0f0f;
    }
    h1 {
      font-size: 41px;
      font-weight: 600;
    }
    .line {
      margin: 0 0 25px 0;
      border-top: 1px solid rgba(211, 211, 211, 0.3);
      width: 100%;
    }
    p {
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

export default App;
