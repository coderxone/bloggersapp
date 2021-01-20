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
  return (
    <div>
    {state === true ? (
      <div className="alertPosition">
          <div className={classes.root}>
            <Alert severity="success">Success action Thanks!</Alert>
          </div>
       </div>
     ) : (
       <div></div>
     )}
     </div>



  );
}
