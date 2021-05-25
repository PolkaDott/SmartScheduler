import React, {useRef} from "react";

function tryLogIn(event, usernameRef, passwordRef){
  var formData = new FormData();
  formData.append("username", usernameRef.current.value);
  formData.append("password", passwordRef.current.value);
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Content-Type' , 'application/json');
  myHeaders.append("Access-Control-Allow-Origin", "*");
  var hheaders = {
    Accept : '*/*',
    "Access-Control-Allow-Origin": "http://localhost:3000/",
    "Access-Control-Allow-Method": "POST",
    "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type"
  }
  var requestOptions = {
    method: 'POST',
    headers: hheaders,
    body: formData,
    redirect: 'follow'
  };
  fetch("http://188.225.83.42:7070/auth/login/", requestOptions)
      .then(response => {
        console.log('res: ' + response.status)
      })
  event.preventDefault();
}

function LogIn() {
  
  var usernameRef = useRef();
  var passwordRef = useRef();

  const submitButton = (event) => tryLogIn(event, usernameRef, passwordRef);

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
    {/* {% if doest_exist %}
                  <div id="alert" className="alert alert-danger text-center" role="alert">
                  Username doest exists
                  </div>
                {% endif %}
                {% if password_incorrect %}
                  <div id="alert" className="alert alert-danger text-center" role="alert">
                  Password is incorrect
                  </div>
                {% endif %}*/}
                <button id="submit" type="submit" className="btn btn-secondary">Submit</button>
            </form>
          </div>
      </div>
    </div>
    );
}

export default LogIn;
