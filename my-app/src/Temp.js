import React from "react";
export default function Temp(){
  return (
    <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body p-2 p-lg-5">



              <h2 className="text-center">Add new case</h2>
              <div className="row">
                <div className="col-12 col-lg-6">
                    <div>
                      <label>Case</label>
                      <input id="case" name="case" type="text" className="form-control" placeholder="Enter case name"/>
                      <small className="form-text text-muted">For example, play Dota</small>
                    </div>
                    <div>
                      <label>Case description</label>
                      <input id="case_description" name="case_description" type="text" className="form-control" placeholder="Enter case description"/>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div>
                      <label>Case start time</label>
                      <input id="start_time" name="start_time" type="time" className="form-control" placeholder="Start time" onchange="check_time_start()"/>
                      <small className="form-text text-muted">
                          In a day 24 hours
                        </small>
                    </div>
                    <div>
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



          </div>
          <div class="modal-footer text-center mt-2">
              <button id="send_btn" type="submit" value="Send" className="btn btn-primary" disabled="true">Submit</button>
          </div>
        </div>
      </div>
    </div>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

    </div>
  )
}