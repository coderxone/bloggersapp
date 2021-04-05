import React, { useEffect,useState } from 'react'
import Observable from '../services/Observable';
import { getToken,onMessageListener,GetPermission }  from '../helperComponents/pushNotification';
import {
  useHistory,
  Redirect,
} from "react-router-dom";
const RemotePushController = () => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const goToPush = (url) => {
    SetRoute("/" + url);
    Setredirect(true);
  };



    const webPush = () => {
      const observRequest = Observable.subscribeByTimer_15_second().subscribe(timer => {
        GetPermission().then((status => {
          console.log(status);
          if(status === true){

            getToken().then(result => {
              //console.log(result);
              localStorage.setItem("firebaseToken",result);
              localStorage.setItem("listenfirebaseToken","1");
            });

            observRequest.unsubscribe();
          }
        }));

      });


      onMessageListener().then(result => {
        console.log(result);
      });
    }

  useEffect(() => {

        webPush();


  }, []);

return (
  <div>

      <div>
      {redirect === true && (
          <Redirect to={route} />
        )
      }
      </div>
  </div>
);
}
export default RemotePushController;
