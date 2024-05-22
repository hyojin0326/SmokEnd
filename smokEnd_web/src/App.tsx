import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Findpw from "./pages/Findpw";
import Signup from "./pages/Signup";
import SelfAssessment from "./pages/SelfAssessment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SmokeText from "./pages/SmokeText";
import NicotineComponent from "./components/NicotineComponent";
import HabitComponent from "./components/HabitComponent";
import KnowledgeComponent from "./components/KnowledgeComponent";
import ConditionComponent from "./components/ConditionComponent";
import Footer from "./components/Footer";
import SelfAssessmentResult from "./components/SelfAssessmentResult";
import Purchase from "./pages/Purchase";
import Purchase_P from "./pages/Purchase_P";


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
          <Route path="/selfAssessment/*" element={<><Header/><SelfAssessment /></>}>
            <Route path="nicotine" element={<><NicotineComponent/></>} />
            <Route path="habit" element={<HabitComponent/>}/>
            <Route path="knowledge" element={<KnowledgeComponent/>}/>
            <Route path="condition" element={<ConditionComponent/>}/>
            <Route path="result" element={<><SelfAssessment/></>}/>
          </Route>
          <Route path="/smokeText" element={<><SmokeText/></>}/>
          <Route path="/purchase" element={<><Header/><Purchase/></>} />
          <Route path="/mileagePurchase" element={<Purchase_P/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
