import React, {useState} from "react";
export default function ModalAddcase(){
  var [name, setName] = useState('');
  var [desc, setDesc] = useState('');
  var [start, setStart] = useState('');
  var [end, setEnd] = useState('');
  let [errorMessage, setErrorMessage] = useState('');

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
    alert(name + " " + desc + " "  + start + " " + end)
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
                  errorMessage
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
              <button value="Send" className="btn btn-primary" disabled={false} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}