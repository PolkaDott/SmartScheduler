import React, {useRef, useState} from "react";
import FetchAPI from "./FetchAPI.js";

function LogIn() {
  let [errorMessage, setErrorMessage] = useState('');
  var usernameRef = useRef();
  var passwordRef = useRef();

  var submitButton = (event) => {
    event.preventDefault();
    (new FetchAPI()).getTokenData(usernameRef.current.value, passwordRef.current.value)
    .then(res => {
      if (res === 0)
        setErrorMessage('Возникли проблемы с выполнением запроса');
      else if (res === 200 || res === 201)
        setErrorMessage('');
      else if (res === 401)
        setErrorMessage('Логин или пароль введены неверно');
      else
        setErrorMessage('Возникла неизвестная ошибка')
    });
  };

  return (
    <div className="container">
      <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <form onSubmit={submitButton} >
                <div className="form-group">
                  <label htmlFor="Input2">Enter your name</label>
                  <input ref={usernameRef} type="text" id="Input2" className="form-control" placeholder="Enter name" required/>
                </div>
                <div className="form-group">
                  <label htmlFor="Input1">Enter your password</label>
                  <input ref={passwordRef} type="password" className="form-control" id="Input1" placeholder="Password" required/>
                </div>
                { 
                  errorMessage && <div id="alert" className="alert alert-danger text-center" role="alert">
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

export default LogIn;
