import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Findpw from "./pages/Findpw";
import Signup from "./pages/Signup";

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
      <Signup/>
    </>
  )
}

export default App;
