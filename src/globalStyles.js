import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');  
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* font-family: Inter !important; */
  }
  body {
      /* font-family: 'Inter', sans-serif; */
      overflow-x: hidden;
      background-color: #0f0f0f;
  }
`;

export default GlobalStyle;
