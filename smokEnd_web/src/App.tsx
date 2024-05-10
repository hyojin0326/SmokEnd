import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";

const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
  }
`;
function App() {
  return (
    <>
      <GlobalStyles/>
      <Signin/>
    </>
  )
}

export default App;
