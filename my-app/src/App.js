import Header from './Header.js';
import Main from './Main.js';
import { AuthContext } from './AuthContext.js';
import {useState} from "react";

export default function App() {
  const [isAuth, setAuth] = useState(0);
  return (
    <AuthContext.Provider value={[isAuth, setAuth]}>
      <Header/>
      <Main/>
    </AuthContext.Provider>
  );
}