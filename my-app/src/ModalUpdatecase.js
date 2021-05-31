import React, {useState, useEffect} from "react";
import FetchAPI from './FetchAPI.js';

export default function ModalUpdatecase(props){
  var [name, setName] = useState('');
  var [desc, setDesc] = useState('');
  var [start, setStart] = useState('');
  var [end, setEnd] = useState('');
  let [errorMessage, setErrorMessage] = useState('');
  var [isValid, setValid] = useState(false);
  var cases = props.cases;

  useEffect(()=>{
    if (!start || !end){
      setValid(false);
      setErrorMessage('')
      return;
    }
    var newBeginHour = start.slice(0,2);
    var newBeginMin = start.slice(3,5);
    var newEndHour = end.slice(0,2);
    var newEndMin = end.slice(3,5);
    if (newBeginHour > newEndHour || 
      (newBeginHour == newEndHour && newBeginMin >= newEndMin)){
      setValid(false)
      setErrorMessage ('Start time cannot be earlier than end time');
      return;
    }
    for (let i in cases){
      var beginHour = cases[i].start_time.slice(0,2);
      var beginMin = cases[i].start_time.slice(3,5);
      var endHour = cases[i].end_time.slice(0,2);
      var endMin = cases[i].end_time.slice(3,5);
      if (!(newBeginHour > endHour || (newBeginHour == endHour && newBeginMin >= endMin) ||
            newEndHour < beginHour || (newEndHour == beginHour && newEndMin <= beginMin))
      ){
        setValid(false);
        setErrorMessage ('Time stamps intersect')
        return;
      }
    }
    setErrorMessage('');
    if (name)
      setValid(true);
    else 
      setValid(false);
  }, [start, end, name])

  var onChangeName = (event) => {
    setName(event.target.value);
  }
  var onChangeDesc = (event) => {
    setDesc(event.target.value);
  }
  var onChangeStart = (event) => {
    setStart(event.target.value);
  }
  var onChangeEnd = (event) => {
    setEnd(event.target.value);
  }
  var handleSubmit = () => {
    var month = Number(props.day.getMonth()) + 1;
    month = month < 10 ? '0' + month : month;
    var date = props.day.getFullYear() + '-' + month + '-' + props.day.getDate();
    FetchAPI.fetchM('timetable/create_user_task/', 
    {
      user : props.username,
      date : date,
      start_time : start,
      end_time : end,
      name : name,
      description : desc ? desc : '.'
    });
    props.setCases(null);
  }

  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body p-2 p-lg-5">
              <h2 className="text-center">Add new case</h2>
              <div className="row">
                <div className="col-12 col-lg-6">
                    <div >
                      <label>Case</label>
                      <input type="text" className="form-control" placeholder="Enter case name" onChange={onChangeName}/>
                      <small className="form-text text-muted">For example, play Dota</small>
                    </div>
                    <div >
                      <label>Case description</label>
                      <input type="text" className="form-control" placeholder="Enter case description" onChange={onChangeDesc}/>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div >
                      <label>Case start time</label>
                      <input type="time" className="form-control" placeholder="Start time" onChange={onChangeStart}/>
                      <small className="form-text text-muted">
                          In a day 24 hours
                        </small>
                    </div>
                    <div >
                      <label>Case end time</label>
                      <input  type="time" className="form-control" onChange={onChangeEnd}/>
                    </div>
                </div>
              </div>
              {
                errorMessage &&
                <div id="alert" className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              }
              <div className="d-none d-lg-flex">
                <h3 className="text-center d-lg-none">Current time chart</h3>
                <canvas id="oilChart1"></canvas>
                <div id="free_time">
                </div>
              </div>
          </div>
          <div className="modal-footer text-center mt-2">
              <button value="Send" className="btn btn-primary" disabled={!isValid} data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}