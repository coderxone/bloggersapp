import React from 'react';
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

 const Item = (props) => {

    const center = props.center;
    let history = useHistory();
    return (
      <div className="back-button-with-center">
          <div className="back-icon-div"  onClick={(e) => history.goBack()}>
              <ArrowBackIosIcon className="back-icon"/>
          </div>
          <div className="profileBlock">
              <div className="profileInformation">
                  {center}
              </div>
          </div>
      </div>

    );
};

export default Item;
