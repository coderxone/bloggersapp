/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={languageArray}
      getOptionLabel={(option) => option.title}
      defaultValue={languageArray[0]}
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
