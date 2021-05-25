import React from "react";

function Registration() {
  const myStyle = {display : "none"}
  return (
      <div className="container">
        <div className="row">
            <div className="col-12">
              <form method="post">
                  <div className="form-group">
                    <label htmlFor="user_name_input">Enter your name</label>
                    <input type="text" id="username" name="name" className="form-control" placeholder="Enter name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter your email address</label>
                    <input type="email" id="username" name="mail" className="form-control" placeholder="Enter email" required/>
                    <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else :)</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Input1">Enter your password</label>
                    <input type="password" className="form-control" id="Input1" placeholder="Password" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Input2">Confirm your password</label>
                    <input onchange="validate()" type="password" name="some_content" className="form-control" id="Input2" placeholder="Confirm Password" required/>
                  </div>
                  <div id="alert" style={myStyle} className="alert alert-danger text-center" role="alert">
                    Passwords do not match
                  </div>
    {/*{% if username_exists %}
                    <div id="alert" className="alert alert-danger text-center" role="alert">
                    Username is already exists
                    </div>
                  {% endif %}*/}
                  <button id="submit" type="submit" className="btn btn-secondary">Submit</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default Registration;
