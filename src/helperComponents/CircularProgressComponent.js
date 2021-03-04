import React,{useState,useEffect,useMemo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Observable from '../services/Observable';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const color = "#0083ff";



const CircularDeterminate = (props) => {

  const classes = useStyles();
  const status = props.status;
  const [progress, setProgress] = React.useState(0);
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;



  return (
    <div className={classes.root}>
      <CircularProgress className="CircularProgress"  variant="determinate" value={timerCircleVariable} />

      <div className="CircleTimer">{timerVariable}</div>
    </div>
  );
}

export default CircularDeterminate;
