import React from 'react';
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

 const Item = () => {
    let history = useHistory();
    return (
      <div className="backabsolute"  onClick={(e) => history.goBack()}>
          <ArrowBackIosIcon className="backstyle"/>
      </div>

    );
};

export default Item;
