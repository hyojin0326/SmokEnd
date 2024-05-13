import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Findpw from "./pages/Findpw";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
  }
`;

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Main/>,
//     children:[
//       {
//         path:"",
//         element:<Main/>,
//       }
//     ]
//   },
//   {
//     path:"/login",
//     element:<Signin/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>
//   }
// ])
function App() {
  return (
    <>
      <GlobalStyles/>
      <Router>
        <Routes>
          <Route path="/" element={<><Header/><Main/></>}/>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findpw" element={<Findpw/>}/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App;
