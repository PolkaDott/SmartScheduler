import React, {useState, useContext, useEffect} from "react";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import FetchAPI from "./FetchAPI.js";
import { AuthContext } from "./AuthContext.js";
import ModalAddcase from "./ModalAddcase.js";

export default function Scheduler() {
  const history = useHistory();
  const [, setAuth] = useContext(AuthContext);
  var [cases, setCases] = useState(null);
  var username = localStorage.getItem('username');

  const path = window.location.pathname;
  var day = undefined;
  var dayId;
  switch(path){
    case '/monday':
      day = 'mon';
      dayId = 1;
      break;
    case '/tuesday':
      day = 'tue';
      dayId = 2;
      break;
    case '/wednesday':
      day = 'wed';
      dayId = 3;
      break;
    case '/thursday':
      dayId = 4;
      day = 'thu';
      break;
    case '/friday':
      dayId = 5;
      day = 'fri';
      break;
    case '/saturday':
      dayId = 6;
      day = 'sat';
      break;
    case '/sunday':
      dayId = 0;
      day = 'sun';
      break;
    default:
      throw new Error('Unrecognized pathname')
  }

  var curDay = new Date();
  curDay.setDate(curDay.getDate() + ((7 - curDay.getDay() + dayId) % 7));
  var isNewCases = cases === null;
  useEffect(() => {
    FetchAPI.fetchM('timetable/get_all_user_tasks/')
    .then(res => {
      res = res.filter( function(onecase) {
        return onecase['user'] === username;
      })
      res = res.filter(function (onecase) {
        var caseDate = onecase['date'];
        if (curDay.getFullYear() != caseDate.slice(0,4)) // years
          return false;
        if (Number(curDay.getMonth()) + 1 != caseDate.slice(5,7)) // months
          return false;
        if (curDay.getDate() != caseDate.slice(8, 10)) //days
          return false;
        return true;
      })
      setCases(res);
    })
  }, [isNewCases, path])
  var refresh = FetchAPI.getRefresh();
  if (!refresh || !username){
    setAuth(0);
    FetchAPI.clearToken();
    setTimeout(()=>history.push('/login'), 10);
    return null;
  }

  var buttonDelete = (id) => {
    console.log(id + ' deleted')
  }
  var buttonChange = (id) => {
    console.log(id + ' changed')
  }
  var casesHtml = []
  for (let i in (cases === null ? [] : cases)){
    casesHtml.push( 
      <div  className="col-12 col-lg-4 onecase" key={i}>
          <div style={{height: "250px", width: "240px"}} className="card mb-4 ">
            <div className="card-body">
                <h5 className="card-title">
                  <div id="{{ case.6 }}_name">Case - {cases[i].name}</div>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <div id="{{ case.6 }}_start">Case start - { cases[i].start_time.slice(0,5) }</div>
                  <div id="{{ case.6 }}_end">Case end - { cases[i].end_time.slice(0,5) }</div>
                </h6>
                <div className="d-flex justify-content-around mb-3">
                  <button onClick={()=> buttonDelete(i)} className="btn btn-secondary">Delete</button>
                  <button onClick={() => buttonChange(i)} className="btn btn-secondary">Change</button>
                </div>
                <div>Case description - { cases[i].description }</div>
            </div>
          </div>
      </div>
    )
  }
          
  var menuHtml = []
  var dropdownMenuHtml = []
  var idDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  for (let i in idDays){
    var j = ((new Date).getDay() + Number(i)) % 7;
    menuHtml.push(
      <li className="list-group-item" key={i}><Link to={'/'+idDays[j].toLowerCase()}>{idDays[j]}</Link></li>
    )
    dropdownMenuHtml.push(
      <li className="dropdown-item" key={i}><Link to={'/'+idDays[j].toLowerCase()}>{idDays[j]}</Link></li>
    )
  }

return (
<div className="container">
   <div className="d-lg-none text-center mb-3">
      <div className="btn-group">
         <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
         {  path.slice(1,2).toUpperCase() + path.slice(2)}
         </button>
         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {dropdownMenuHtml}
         </div>
      </div>
   </div>
   <div className="row">
      <div className="d-none d-lg-flex col-lg-2 order-2 order-lg-1">
         <ul className="list-group list-group-flush text-center">
          {menuHtml}
         </ul>
      </div>
      <div className="col-lg-8 order-1">
        <p className="d-none d-lg-flex justify-content-lg-center">
          { path.slice(1,2).toUpperCase() + path.slice(2) +' ' + curDay.toJSON().slice(8, 10) + '.' + curDay.toJSON().slice(5,7) }
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
      <div className="col-12 col-lg-2 order-0 order-lg-3">
        <ul className="list-group list-group-flush text-center">
          <li className="list-group-item" ><a data-bs-toggle="modal" data-bs-target="#exampleModal" >Add case</a></li>
          <li className="list-group-item"><a href="{% url 'setdefault' %}/{{day_short}}/">Set as default</a></li>
          <li className="list-group-item"><a href="{% url 'resettodefault' %}/{{day_short}}/">Reset cases</a></li>
        </ul>
      </div>
   </div>
   <ModalAddcase username={username} cases={cases} day={curDay} setCases={setCases}/>
</div>

  );
}