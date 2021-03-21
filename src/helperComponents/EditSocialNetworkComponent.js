import React from 'react';
import Observable from '../services/Observable';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const EditList = ((props) => {

    const list = props.list;
    const currentNetworkTwo = props.currentNetworkTwo;

    const showList = list.map((item,index) =>

        <MenuItem key={index} value={item}>{item}</MenuItem>

    );

    const InsidehandleEdit = (event) => {
        Observable.sendData_subject_Edit(event.target.value);
    };

    return (

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentNetworkTwo}
        onChange={InsidehandleEdit}
      >
        {showList}

      </Select>

    );


});

export default EditList;
