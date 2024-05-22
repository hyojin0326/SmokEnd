import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Findpw from "./pages/Findpw";
import Signup from "./pages/Signup";
import Review from "./pages/Review";
import Introduction from "./pages/Introduction";
import SelfAssessment from "./pages/SelfAssessment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import SmokeText from "./pages/SmokeText";
import NicotineComponent from "./components/NicotineComponent";
import HabitComponent from "./components/HabitComponent";
import KnowledgeComponent from "./components/KnowledgeComponent";
import ConditionComponent from "./components/ConditionComponent";
// import Footer from "./components/Footer";
import SelfAssessmentResult from "./components/SelfAssessmentResult";

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
      <GlobalStyles />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
              </>
            }
          />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/findpw" element={<Findpw />} />
          <Route
            path="/selfAssessment/*"
            element={
              <>
                <SelfAssessment />
              </>
            }
          />
          <Route
            path="nicotine"
            element={
              <>
                <NicotineComponent />
              </>
            }
          />
          <Route path="habit" element={<HabitComponent />} />
          <Route path="knowledge" element={<KnowledgeComponent />} />
          <Route path="condition" element={<ConditionComponent />} />
          <Route path="result" element={<SelfAssessmentResult />} />

          <Route path="/Review" element={<Review />} />
          <Route path="/SmokeText" element={<SmokeText />} />
          <Route path="/Introduction" element={<Introduction />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
