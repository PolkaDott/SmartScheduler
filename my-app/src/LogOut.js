import React from "react";
import { useHistory } from "react-router-dom";
import FetchAPI from "./FetchAPI.js";
import { AuthContext } from "./AuthContext.js";

export default function LogOut() {
  var history = useHistory();
  const [, setAuth] = React.useContext(AuthContext);

  FetchAPI.clearToken();
  setTimeout(()=>{
    setAuth(0);
    setTimeout(()=>history.push('/'), 10);
  }, 10);
  
  return null;
}