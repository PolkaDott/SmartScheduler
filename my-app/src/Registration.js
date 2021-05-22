import React, {Component} from "react";

class Registration extends Component {
  render() {
    return (
       <div class="container">
          <div class="row">
             <div class="col-12">
               <form method="post">
                   <div class="form-group">
                      <label for="user_name_input">Enter your name</label>
                      <input type="text" id="username" name="name" class="form-control" placeholder="Enter name" required/>
                   </div>
                   <div class="form-group">
                      <label for="exampleInputEmail1">Enter your email address</label>
                      <input type="email" id="username" name="mail" class="form-control" placeholder="Enter email" required/>
                      <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else :)</small>
                   </div>
                   <div class="form-group">
                      <label for="exampleInputPassword1">Enter your password</label>
                      <input type="password" id="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                   </div>
                   <div class="form-group">
                      <label for="exampleInputPassword1">Confirm your password</label>
                      <input id="confirm_password" onchange="validate()" type="password" name="some_content" class="form-control" id="exampleInputPassword1" placeholder="Confirm Password" required/>
                   </div>
                   <div id="alert" style={{display: "none"}} class="alert alert-danger text-center" role="alert">
                     Passwords do not match
                   </div>
      {/*{% if username_exists %}
                      <div id="alert" class="alert alert-danger text-center" role="alert">
                      Username is already exists
                      </div>
                   {% endif %}*/}
                   <button id="submit" type="submit" class="btn btn-secondary">Submit</button>
               </form>
             </div>
          </div>
       </div>
    );
  }
}

export default Registration;
