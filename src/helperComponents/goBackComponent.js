import React from 'react';
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

 const Item = () => {
    let history = useHistory();
    return (
      <div className="back-icon-div"  onClick={(e) => history.goBack()}>
          <ArrowBackIosIcon className="back-icon"/>
      </div>

    );
};

export default Item;
