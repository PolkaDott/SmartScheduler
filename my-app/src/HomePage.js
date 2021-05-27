import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import FetchAPI from "./FetchAPI.js";

export default function HomePage() {
  const history = useHistory();
  var refresh = FetchAPI.getRefresh();
  if (!refresh){
    history.push('/login')
  }

  return (
    <div>Home
    </div>
  );
}