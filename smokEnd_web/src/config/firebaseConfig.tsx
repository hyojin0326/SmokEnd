import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyDOdpCwH2FpdzSDIRKt8JbhywuUDi851Is",
//     authDomain: "nwitter-reloaded-c0215.firebaseapp.com",
//     projectId: "nwitter-reloaded-c0215",
//     storageBucket: "nwitter-reloaded-c0215.appspot.com",
//     messagingSenderId: "798823543277",
//     appId: "1:798823543277:web:0faf04254e6eb8fa2777e4"
//   };s

const firebaseConfig = {
  apiKey: "AIzaSyBPgGTj4iBArN95jAaB4rgcUekkuAFQxrU",
  authDomain: "logintest-e4050.firebaseapp.com",
  projectId: "logintest-e4050",
  storageBucket: "logintest-e4050.appspot.com",
  messagingSenderId: "947449011418",
  appId: "1:947449011418:web:34c952d132c5c3591219e3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };