import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
    }

    ul {
      list-style: none;
    }

    body {
      padding: 20px;
    }
`;

export default GlobalStyles;
