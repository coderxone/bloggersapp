import React from 'react';
import TextField from '@material-ui/core/TextField';
import AlertComponent from '../../helperComponents/AlertBoxComponent';

const MultiInputComponent = (props) => {

  const fieldType = props.fieldType;
  const name = props.name;
  const error = props.error;
  const AlertText = props.AlertText;

  const setMultiData = (event) => {
    props.setMultiData(event);
  }


  return (
    <div>
        <TextField
            required
            onChange={setMultiData}
            value={name}
            type={fieldType}
            className="textFieldAppStyle"
          />
        <AlertComponent state={error} text={AlertText}/>
    </div>
  )
}

export default MultiInputComponent;
