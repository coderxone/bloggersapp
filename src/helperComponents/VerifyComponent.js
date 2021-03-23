import React ,{useState,useMemo} from 'react';
import Observable from '../services/Observable';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { save_multiData } from '../actions/actions';
import TextField from '@material-ui/core/TextField';

const VerifyComponent = ((props) => {

    const SocialNetworkList = ['SSN','ITIN','EIN'];


    const [currentNetworkTwo, SetCurrentNetworkTwo] = React.useState('SSN');

    const showList = SocialNetworkList.map((item,index) =>

        <MenuItem key={index} value={item}>{item}</MenuItem>

    );

    const InsidehandleEdit = (event) => {
        SetCurrentNetworkTwo(event.target.value);
        setUrl('');
        //props.dispatch(save_multiData({_object:currentNetworkTwo}));
    };

    const [url,setUrl] = useState('');

    const setUrlEvent = (event) => {
      var url = event.target.value;
      if(url.length < 10){
        setUrl(url);
        props.dispatch(save_multiData({_object:currentNetworkTwo,name:url}));
      }



    }

    return (

      <div className="fullSelect">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentNetworkTwo}
            onChange={InsidehandleEdit}
            className="fullSelect"
          >
            {showList}

          </Select>

          <TextField
              required
              onChange={setUrlEvent}
              value={url}
              className="textFieldAppStyleTwo"
            />

    </div>

    );


});

 export default connect()(VerifyComponent);
