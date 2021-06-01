import React, {useRef, useState, useContext} from "react";
import FetchAPI from "./FetchAPI.js";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

export default function LogIn() {
  const history = useHistory();
  var refreshToken = FetchAPI.getRefresh();
  let [errorMessage, setErrorMessage] = useState('');
  var usernameRef = useRef();
  var passwordRef = useRef();
  const [, setAuth] = useContext(AuthContext);

  if (refreshToken){
    setTimeout(()=>history.push('/'), 10);
    return null;
  }

  var submitButton = (event) => {
    event.preventDefault();
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    FetchAPI.getTokenData(username, password)
    .then(res => {
      if (res === 0)
        setErrorMessage('Occured request errors. Write to administrator');
      else if (res === 200 || res === 201){
        var timer = setInterval(()=>{
          if (FetchAPI.getRefresh()){
            setAuth(1);
            setTimeout(()=>history.push('/'), 10);
            localStorage.setItem('username', username);
            clearInterval(timer);
            return null;
          }
        }, 10);
      }
      else if (res === 401)
        setErrorMessage('Login or password are wrong');
      else
        setErrorMessage('Unknown error. Write to administrator')
    });
  };

  return (
    <div className="container">
      <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <form onSubmit={submitButton} >
                <div className="form-group">
                  <label htmlFor="Input2">Enter your username</label>
                  <input ref={usernameRef} type="text" id="Input2" className="mb-3 form-control" placeholder="Enter username" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="Input1">Enter your password</label>
                  <input ref={passwordRef} type="password" className="form-control mb-3" id="Input1" placeholder="Password" required/>
                </div>
                { 
                  errorMessage &&
                  <div id="alert" className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                  </div>
                }
                <button id="submit" type="submit" className="btn btn-secondary">Submit</button>
            </form>
          </div>
      </div>
    </div>
    );
}
