import React, { useEffect,useState } from 'react'
import Observable from '../services/Observable';

import {
  useHistory,
  Redirect,
} from "react-router-dom";
const TemplateHelperComponent = () => {

  const [redirect,Setredirect] = useState(false);
  const [route,SetRoute] = useState("");

  const goToPush = (url) => {
    SetRoute("/" + url);
    Setredirect(true);
  };




  useEffect(() => {




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
