import React ,{useState,useEffect} from 'react';
import Observable from '../services/Observable';



function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(0);

  useEffect(() => {

   console.log(isOnline);
   //setIsOnline(1);
  // setIsOnline(3);
   //need to keep tracking
   console.log(isOnline);

    // Specify how to clean up after this effect:
    return function cleanup() {

      //need to change something
      console.log(isOnline);
      //setIsOnline(2);
      console.log(isOnline);

    };
  });


  return isOnline;
}
//Observable.sendData_subject("test");


export default FriendStatus;
