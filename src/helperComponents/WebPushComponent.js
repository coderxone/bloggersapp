import React, { useEffect,useState } from 'react'
import Observable from '../services/Observable';
import { checkSupport,getToken,onMessageListener,GetPermission }  from '../helperComponents/pushNotification';
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

      var messaging = checkSupport();
      if(messaging !== false){
        const observRequest = Observable.subscribeByTimer_15_second().subscribe(timer => {
          GetPermission().then((status => {
            console.log(status);
            if(status === true){

              getToken(messaging).then(result => {
                //console.log(result);
                if(result !== false){
                  localStorage.setItem("firebaseToken",result);
                  localStorage.setItem("listenfirebaseToken","1");
                }

              });

              observRequest.unsubscribe();
            }
          }));

        });


        onMessageListener(messaging).then(result => {
          if(result !== false){
            console.log(result);
          }
        });
      }

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
