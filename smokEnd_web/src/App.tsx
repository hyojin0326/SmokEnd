import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import Signin from "./pages/Signin";
import Findpw from "./pages/Findpw";
import Signup from "./pages/Signup";
import SocialSignup from "./pages/SocialSignup";
import ReviewPopup from "./components/ReviewPopup";
import Introduction from "./pages/Introduction";
import SelfAssessment from "./pages/SelfAssessment";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import SmokeText from "./pages/SmokeText";
import NicotineComponent from "./components/NicotineComponent";
import HabitComponent from "./components/HabitComponent";
import KnowledgeComponent from "./components/KnowledgeComponent";
import ConditionComponent from "./components/ConditionComponent";
// import Footer from "./components/Footer";
import Purchase from "./pages/Purchase";
import Purchase_P from "./pages/Purchase_P";

import SelfAssessmentResult from "./components/SelfAssessmentResult";
import NoSmokingArea from "./pages/NosmokingAreas copy";
import ScrollToTop from "./components/ScrollToTop";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import SmokEndCase from "./pages/SmokEndCase";
import TextWrite from "./pages/TextWrite";
import SmokeTextById from "./pages/SmokeTextById";
import Analyze from "./pages/Analyze";
import Kakao from "./pages/oAuthKakao";
import Naver from "./pages/oAuthNaver";

const GlobalStyles = createGlobalStyle`
  *{
    padding:0;
    margin:0;
  }

`;
function AppContent() {
  const location = useLocation();
  const noFooterRoutes = [
    "/login",
    "/signup",
    "/findpw",
    "/socialSignup",
    "/textWrite/necessity",
    "/textWrite/risk",
  ];

  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
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
        {/* <Route path="/" element={<><Test /></>}/> */}
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/socialSignup" element={<SocialSignup />} />
        <Route path="/findpw" element={<Findpw />} />
        <Route
          path="/selfAssessment/*"
          element={
            <>
              <Header />
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
        <Route
          path="/purchase"
          element={
            <>
              <Header />
              <Purchase />
            </>
          }
        />
        <Route
          path="/mileagePurchase"
          element={
            <>
              <Header />
              <Purchase_P />
            </>
          }
        />

        {/* <Route path="/smokeText/:tab" element={<SmokeText />} /> */}
        <Route path="/smokeText" element={<SmokeText />} />
        <Route
          path="/smokeText/:tab"
          element={
            <>
              <Header />
              <SmokeText />
            </>
          }
        />

        <Route
          path="/introduction"
          element={
            <>
              <Header />
              <Introduction />
            </>
          }
        />
        <Route
          path="/noSmokingArea"
          element={
            <>
              <Header />
              <NoSmokingArea />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Shop />
            </>
          }
        />
        <Route
          path="/smokEndCase"
          element={
            <>
              <Header />
              <SmokEndCase />
            </>
          }
        />

        <Route path="/oAuthkakao" element={<Kakao />} />
        <Route path="oAuthNaver" element={<Naver />} />

        <Route
          path="/analyze"
          element={
            <>
              <Analyze />
            </>
          }
        />

        <Route
          path="/textWrite/:category"
          element={
            <>
              <TextWrite />
            </>
          }
        />
      </Routes>
      {shouldShowFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
