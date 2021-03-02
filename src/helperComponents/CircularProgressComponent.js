import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const timerVariable = 10;

export default function CircularDeterminate() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  return (
    <div className={classes.root}>
      <CircularProgress className="CircularProgress" color="#0083ff" variant="determinate" value={100} />

      <div className="CircleTimer">{timerVariable}</div>
    </div>
  );
}
