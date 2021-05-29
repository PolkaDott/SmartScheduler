import Header from './Header.js';
import Main from './Main.js';
import { AuthContext } from './AuthContext.js';
import {useState} from "react";
import FetchAPI from "./FetchAPI.js";

export default function App() {
  const [isAuth, setAuth] = useState(FetchAPI.getRefresh() ? 1 : 0);
  return (
    <AuthContext.Provider value={[isAuth, setAuth]}>
      <Header/>
      <Main/>
    </AuthContext.Provider>
  );
}