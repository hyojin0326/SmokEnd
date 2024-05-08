import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Footer from "./components/Footer";

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
      <Footer/>
    </>
  )
}

export default App;
