/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { save_multiData } from '../../actions/actions';

const SelectLanguage = (props) => {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={languageArray}
      getOptionLabel={(option) => option.title}
      // defaultValue={languageArray[0]}
      onChange={(event, newValue) => {
        //console.log(newValue);
        if(newValue){
          //_object
          var saveObj = {
            _object:"lang",
            name:newValue.value
          }

          props.dispatch(save_multiData(saveObj));
        }

      }}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select language" variant="outlined" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const languageArray = [
  { title: 'English', value: "eng" },
  { title: 'Russian', value: "ru" },
];

 export default connect()(SelectLanguage);
