import { useHistory } from "react-router-dom";

export default function HomePage(){
  const history = useHistory();
  var day = undefined;
  var today = new Date();        
  var todayId = today.getDay();
  switch(todayId){
    case 0: 
      day = '/sunday';
      break;
    case 1:
      day = '/monday';
      break;
    case 2:
      day = '/tuesday';
      break;
    case 3:
      day = '/wednesday';
      break;
    case 4:
      day = '/thursday';
      break;
    case 5:
      day = '/friday';
      break;
    case 6:
      day = '/saturday';
      break;
  }
  setTimeout(()=>history.push(day), 10);
  return null;
}