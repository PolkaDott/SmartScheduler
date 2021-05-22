import React, {Component} from "react";

class LogIn extends Component {
  render() {
    return (
     <div class="container">
        <div class="row">
           <div class="col-12 col-lg-8 offset-lg-2">
             <form method="post">
                 <div class="form-group">
                    <label for="user_name_input">Enter your name</label>
                    <input type="text" id="username" name="name" class="form-control" placeholder="Enter name" required/>
                 </div>
                 <div class="form-group">
                    <label for="exampleInputPassword1">Enter your password</label>
                    <input type="password" id="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                 </div>
      {/* {% if doest_exist %}
                    <div id="alert" class="alert alert-danger text-center" role="alert">
                    Username doest exists
                    </div>
                 {% endif %}
                 {% if password_incorrect %}
                    <div id="alert" class="alert alert-danger text-center" role="alert">
                    Password is incorrect
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

export default LogIn;
