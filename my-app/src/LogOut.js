import React from "react";
import { useHistory } from "react-router-dom";
import FetchAPI from "./FetchAPI.js";
import { AuthContext } from "./AuthContext.js";

export default function LogOut() {
  FetchAPI.clearToken();
  var history = useHistory();
  const [, setAuth] = React.useContext(AuthContext);
  setTimeout(()=>{
    history.push('/login');
    setAuth(0);
  }, 10);
  
  return (
    <div></div>
  );
}