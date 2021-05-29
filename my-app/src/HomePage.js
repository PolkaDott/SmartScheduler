import React, {useState, useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import FetchAPI from "./FetchAPI.js";
import { AuthContext } from "./AuthContext.js";

export default function HomePage() {
  const history = useHistory();
  const [, setAuth] = useContext(AuthContext);
  var [cases, setCases] = useState(null);
  var username = localStorage.getItem('username');
  useEffect(() => {
    FetchAPI.fetchM('timetable/get_all_user_tasks/')
    .then(res => {
      if (res.ok){
        res.json().then(res => {
          console.log(res);
          res = res.filter( function(onecase) {
            return onecase['user'] === username;
          })
          setCases(res);
        })
      }
      else 
        throw new Error('Не удалось выполнить запрос timetable/get_all_user_tasks/');
    })
  }, [])
  var refresh = FetchAPI.getRefresh();

  if (!refresh || !username){
    setAuth(0);
    FetchAPI.clearToken();
    setTimeout(()=>history.push('/login'), 10);
    return null;
  }

  if (!cases){
    return null;
  }
  var casesHtml = []

  for (let i in cases){
    console.log(i);
    casesHtml.push( 
      <div  className="col-12 col-lg-4" key={i}>
          <div style={{height: "250px", width: "18rem"}} className="card mb-4 ">
            <div className="card-body">
                <h5 className="card-title">
                  <div id="{{ case.6 }}_name">Case - { "case.0"}</div>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <div id="{{ case.6 }}_start">Case start - { "case.1"}</div>
                  <div id="{{ case.6 }}_end">Case end - { "case.1" }</div>
                </h6>
                <div className="d-flex justify-content-around mb-3">
                  <form method="get" action="{% url 'deletecase' %}/{{day_short}}/{{ case.5 }}/">
                      <button type="submit" className="btn btn-secondary">Delete</button>
                  </form>
                  <form method="get" action="{% url 'changecase' %}/{{day_short}}/{{ case.5 }}/">
                      <button type="submit" className="btn btn-secondary">Change</button>
                  </form>
                </div>
                <div>Case description - { "case.34"}</div>
                <div className="d-none" id="{{ case.6 }}_duration">Case duration - {"case23"}</div>
            </div>
          </div>
      </div>
    )
  }
          
  return (
<div id="popupWin" className="modalwin p-2 p-lg-5"style={{display: "none"}} >
   <form method="POST" action="{% url 'addcase' %}/{{ day_short }}/">
      <h2 className="text-center">Add new case</h2>
      <div className="row">
         <div className="col-12 col-lg-6">
            <div className="form-group">
               <label>Case</label>
               <input id="case" name="case" type="text" className="form-control" placeholder="Enter case name"/>
               <small className="form-text text-muted">For example, play Dota</small>
            </div>
            <div className="form-group">
               <label>Case description</label>
               <input id="case_description" name="case_description" type="text" className="form-control" placeholder="Enter case description"/>
            </div>
         </div>
         <div className="col-12 col-lg-6">
            <div className="form-group">
               <label>Case start time</label>
               <input id="start_time" name="start_time" type="time" className="form-control" placeholder="Start time" onchange="check_time_start()"/>
               <small className="form-text text-muted">
                  In a day 24 hours
                </small>
            </div>
            <div className="form-group">
               <label>Case end time</label>
               <input id="end_time" name="end_time" type="time" className="form-control" placeholder="End time" onchange="check_time_end()"/>
            </div>
         </div>
      </div>
      <div id="alert" style={{display: "none"}} className="alert alert-danger" role="alert">
          Time stamps intersect
      </div>
      <div className="d-none d-lg-flex">
      <h3 className="text-center d-lg-none">Current time chart</h3>
      <canvas id="oilChart1"></canvas>
      <div id="free_time">
      </div>
      </div>
      <div className="text-center mt-2">
      <button id="send_btn" type="submit" value="Send" className="btn btn-primary" disabled="true">Submit</button>
      </div>
   </form>
</div>,

<div className="container">
   <div className="d-lg-none text-center mb-3">
      <div className="btn-group">
         <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         { "DAYNAME 61" }
         </button>
         <div className="dropdown-menu">
            <a className="dropdown-item" href="{% url 'monday' %}">Monday</a>
            <a className="dropdown-item" href="{% url 'tuesday' %}">Tuesday</a>
            <a className="dropdown-item" href="{% url 'wednesday' %}">Wednesday</a>
            <a className="dropdown-item" href="{% url 'thursday' %}">Thursday</a>
            <a className="dropdown-item" href="{% url 'friday' %}">Friday</a>
            <a className="dropdown-item" href="{% url 'saturday' %}">Saturday</a>
            <a className="dropdown-item" href="{% url 'sunday' %}">Sunday</a>
         </div>
      </div>
   </div>
   <div className="row">
      <div className="d-none d-lg-flex col-lg-2 order-2 order-lg-1">
         <ul className="list-group list-group-flush text-center">
            <li className="list-group-item"><a href="{% url 'monday' %}">Monday</a></li>
            <li className="list-group-item"><a href="{% url 'tuesday' %}">Tuesday</a></li>
            <li className="list-group-item"><a href="{% url 'wednesday' %}">Wednesday</a></li>
            <li className="list-group-item"><a href="{% url 'thursday' %}">Thursday</a></li>
            <li className="list-group-item"><a href="{% url 'friday' %}">Friday</a></li>
            <li className="list-group-item"><a href="{% url 'saturday' %}">Saturday</a></li>
            <li className="list-group-item"><a href="{% url 'sunday' %}">Sunday</a></li>
         </ul>
      </div>
      <div className="col-lg-8 order-1">
         <p className="d-none d-lg-flex justify-content-lg-center">
            { "DAYNAME 88" }
         </p>
         <p className="text-center">
            You have { "EMPTYTIME 91" } hours free time
         </p>
         <p id="case_nums" className="d-none">
            { "CASES_COUNT 94" }
         </p>
         <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuemin="0" aria-valuemax="100">{ "PROGRESS 97"}%</div> 
         </div>
         <br/>
         <div className="row">
          {casesHtml}
           </div> 
      </div>
   </div>
   <div className="col-12 col-lg-2 order-0 order-lg-3">
         <ul className="list-group list-group-flush text-center">
            <li className="list-group-item" onclick="showModalWin()">Add case</li>
            <li className="list-group-item"><a href="{% url 'setdefault' %}/{{day_short}}/">Set as default</a></li>
            <li className="list-group-item"><a href="{% url 'resettodefault' %}/{{day_short}}/">Reset cases</a></li>
         </ul>
      </div>
</div>

  );
}