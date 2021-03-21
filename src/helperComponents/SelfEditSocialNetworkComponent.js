import React ,{useState,useMemo} from 'react';
import Observable from '../services/Observable';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { save_multiData } from '../actions/actions';
import TextField from '@material-ui/core/TextField';

const EditList = ((props) => {

    const SocialNetworkList = useMemo(function(){

        return JSON.parse(localStorage.getItem("soc"));

    },[]);


    const [currentNetworkTwo, SetCurrentNetworkTwo] = React.useState('');

    const showList = SocialNetworkList.map((item,index) =>

        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>

    );

    const InsidehandleEdit = (event) => {
        SetCurrentNetworkTwo(event.target.value);
        setUrl('');
        //props.dispatch(save_multiData({_object:currentNetworkTwo}));
    };

    const [url,setUrl] = useState('');

    const setUrlEvent = (event) => {
      var url = event.target.value;
      setUrl(url);

      props.dispatch(save_multiData({_object:currentNetworkTwo,name:url}));
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

 export default connect()(EditList);
