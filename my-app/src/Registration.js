import React, {useRef, useState} from "react";
import FetchAPI from './FetchAPI';
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

export default function Registration() {
  const history = useHistory();
  var refreshToken = FetchAPI.getRefresh();
  if (refreshToken){
    history.push('/')
  }
  let [errorMessage, setErrorMessage] = useState('');
  var usernameRef = useRef();
  var password1Ref = useRef();
  var password2Ref = useRef();
  var emailRef = useRef();
  const [, setAuth] = React.useContext(AuthContext);

  var submitButton = (event) => {
      event.preventDefault();
      var password1 = password1Ref.current.value,
          password2 = password2Ref.current.value;
      if (password1 !== password2){
        setErrorMessage('Passwords do not match')
        return;
      }
      FetchAPI.register(usernameRef.current.value, password1, emailRef.current.value)
      .then(res => {
        switch(res){
          case 0:
            setErrorMessage('Occured request error. Write to administrator')
            break;
          case 14:
            setErrorMessage('This username already exist')
            break;
          case 15:
            setErrorMessage('This email is invalid')
            break;
          case 16:
            setErrorMessage('This email already exist')
            break;
          case 17:
            setErrorMessage('This password is too short')
            break;
          case 18:
            setErrorMessage('This password is too common')
            break;
          case 200: case 201:
            var timer = setInterval(()=>{
              if (FetchAPI.getRefresh()){
                setAuth(1);
                history.push('/');
                clearInterval(timer);
            }
            }, 10);
            break;
          default:
             setErrorMessage('Occured unknown error. Write to administrator')
        }
      });
    };

  return (
      <div className="container">
        <div className="row">
            <div className="col-12 col-lg-8 offset-lg-2">
              <form onSubmit={submitButton}>
                  <div className="form-group">
                    <label htmlFor="Input1">Enter your username</label>
                    <input ref={usernameRef} type="text" id="Input1" name="name" className="form-control" placeholder="Enter username" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Input2">Enter your email address</label>
                    <input ref={emailRef} type="email" id="Input2" name="mail" className="form-control" placeholder="Enter email" required/>
                    <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else :)</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Input3">Enter your password</label>
                    <input ref={password1Ref} type="password" className="form-control" id="Input3" placeholder="Password" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Input4">Confirm your password</label>
                    <input ref={password2Ref}  type="password" name="some_content" className="form-control" id="Input4" placeholder="Confirm Password" required/>
                  </div>
                  { errorMessage &&
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