import {Chart} from 'chart.js';
export default function OilCanvas(props){
  var cases = props.cases;
  var oilCanvas = <canvas></canvas>
  if (cases === null)
  return null;
  var case_nums = Number(cases.length);
  var cases_times = [];
  var cases_labels = [];
  var full_day = []
  full_day.length = 24
  for (var i = 0; i < 24; i++) full_day[i] = "Free";
  for (var i = 0; i < case_nums; i++)
  {
    console.log(cases[i])
      cases_times[i] = Number(cases[i]['end_time'].slice(0,2)) - Number(cases[i]['start_time'].slice(0,2));
      //cases_times[i] = document.getElementById(i+"_duration").textContent;
      //cases_labels[i] = document.getElementById(i+"_name").textContent;
      cases_labels[i] = cases[i]['name'];
      
      //var start_time =  document.getElementById(i+"_start").textContent.toString().slice(-2);
      var start_time = Number(cases[i]['start_time'].slice(0,2));
      var end_time = Number(cases[i]['end_time'].slice(0,2));
      //var end_time =  Number(document.getElementById(i+"_end").textContent.toString().slice(-2));
      for (var j = start_time; j <= end_time; j++){
          //full_day[j] = document.getElementById(i+"_name").textContent.toString().slice(7);
          full_day[j] = cases_labels[i];
      }
  }

  var lst_val = [];
  for (i = 1; i < 25; i++){
      if (full_day[i] == "Free"){
          lst_val[i] = 0;
      }
      else {
          lst_val[i] = 1;
      }
  }
  var oilData = {
      labels: [
          full_day[1],
          full_day[2],
          full_day[3],
          full_day[4],
          full_day[5],
          full_day[6],
          full_day[7],
          full_day[8],
          full_day[9],
          full_day[10],
          full_day[11],
          full_day[12],
          full_day[13],
          full_day[14],
          full_day[15],
          full_day[16],
          full_day[17],
          full_day[18],
          full_day[19],
          full_day[20],
          full_day[21],
          full_day[22],
          full_day[23],
          full_day[24],
      ],
      datasets: [
          {
              barPercentage: 0.5,
              barThickness: 80,
              maxBarThickness: 90,
              minBarLength: 2,
              data: [
                          lst_val[1],
                          lst_val[2],
                          lst_val[3],
                          lst_val[4],
                          lst_val[5],
                          lst_val[6],
                          lst_val[7],
                          lst_val[8],
                          lst_val[9],
                          lst_val[10],
                          lst_val[11],
                          lst_val[12],
                          lst_val[13],
                          lst_val[14],
                          lst_val[15],
                          lst_val[16],
                          lst_val[17],
                          lst_val[18],
                          lst_val[19],
                          lst_val[20],
                          lst_val[21],
                          lst_val[22],
                          lst_val[23],
                          lst_val[24],
                          0,
              ],
              
              fill : true,
              borderWidth: 6
          }]
  };
  var options = {
      legend: {
          display: false,
        },
      scale: {
          angleLines: {
              display: true
          },
          ticks: {
              suggestedMin: 0,
              suggestedMax: 1,
              display: false,
          },
      }
  };
  var pieChart = new Chart(oilCanvas, {
  type: 'radar',
  data: oilData,
  options: options,
  });
  return oilCanvas;
}