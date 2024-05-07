import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";

const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
    font-family: 'NanumSquareRound', sans-serif;
  }
`;
function App() {
  return (
    <>
      <GlobalStyles/>
      <Main/>
    </>
  )
}

export default App;
