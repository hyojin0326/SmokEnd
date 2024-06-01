import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebaseConfig";

const Test: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
  
    const handleGoogleLogin = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((data) => {
          setUserData(data.user);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <div>
        <button onClick={handleGoogleLogin}>Login</button>
        {userData ? <div>{userData.displayName}</div> : null}
      </div>
    );
  };
  export default Test;