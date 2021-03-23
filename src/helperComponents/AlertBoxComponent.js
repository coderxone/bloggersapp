import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function SimpleAlerts(props) {
  const classes = useStyles();
  const state = props.state;
  const text = props.text;
  return (
    <div>
    {state === true ? (
      <div className="alertBoxPosition">
          <div className={classes.root}>
            <Alert severity="error">{text}</Alert>
          </div>
       </div>
     ) : (
       <div></div>
     )}
     </div>



  );
}
