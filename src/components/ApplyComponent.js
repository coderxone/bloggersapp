import React, {useState,useEffect,useConstructor} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import ApplyService from '../services/ApplyService';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { connect } from 'react-redux';
import HomeService from '../services/Homeservice';

import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';
import ReactGeoCodeComponent from './GeocodeComponent';
import config from '../config/config.js';
import {
  Link,
} from "react-router-dom";



//const {regionsList: { data: list = [] } } = props;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#161730',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#161730',
  },
  icon:{
    color:'#8936f4',
    htmlColor:'#8936f4',
    headerColor:'#8936f4',
  }
}));

const PrettoSlider = withStyles({
  root: {
    color: '#8936f4',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },

})(Slider);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#8936f4',
    },
    '& label': {
      color: '#8936f4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#8936f4',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#8936f4',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8936f4',
      },
      '& input:valid + fieldset': {
        borderColor: '#8936f4',
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
      },

    },
  },
})(TextField);

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  date: yup.string().required("Required"),
  time: yup.string().required("Required"),
});


const MessageComponent = (props) => {
  return (
    <div className="errorBox">
        {props.message}
    </div>
  )
}



const ErrorDiv = (props) => {
  console.log(props);
  const errorMessage = props.message;

  if(errorMessage != undefined){
    return <MessageComponent message={errorMessage}/>
  }else{
    return <div></div>
  }

}


const ApplyComponent = () => {

  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [maxdefaultSliderValue,setMaxdefaultSliderValue] = useState(5000);
  const [mindefaultSliderValue,setMindefaultSliderValue] = useState(200);
  const [defaultSliderValue,setDefaultSliderValue] = useState(200);
  var databasedefaultSliderValue = 200;
  const [peopleCount,setPeopleCount] = useState(6);
  const [subscribers,setSubscribers] = useState(500);


  const [address,setAddress] = useState("");

  const handleChange = ((address) => {

  });

  const handleChangeSlider = (event,newValue) => {
    //console.log(newValue);
//xx
    var obj = {
      amount:newValue
    }
    ApplyService.checkSubscriberCore(obj);

    setDefaultSliderValue(newValue);
  }

  const onSubmit = ((data) => {

      var coord = config.getUserCoordinates();
      //getUserCoordinates

      if(coord == false){
        setError("password", {
              type: "manual",
              message: LocalizeComponent.location_error
            });
      }else{
        data.coord = coord;
        data.amount = defaultSliderValue;
        data.peopleCount = peopleCount;
        data.subscribers = subscribers;
      }

      console.log(data);

      HomeService.sendApplyData(data);

  });

  function getSliderValue(value) {
    //console.log(value);
    return `${value}°C`;
  }


  useEffect(() => {

      const firstListener = HomeService.listenApplyData().subscribe(data => {
          console.log(data);
      });

      const listenSubscriberCore = ApplyService.listenSubscriberCore().subscribe(data => {
          //console.log(data);
          setPeopleCount(data.countOfBloggers);
          setSubscribers(data.subscribersResult);
      });


      return () => {
        firstListener.unsubscribe();
        listenSubscriberCore.unsubscribe();
      }

  },[]);

  const handleSelect = ((address) => {

  });

  return (

   	<div className={classes.root}>
        <Grid container >



          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <Box mt={2}>
              <form onSubmit={handleSubmit(onSubmit)}   className={classes.margin}>

                <CssTextField

                  inputRef={register}
                  name="title"
                  className="secondMargin"
                  id="title"
                  type="text"
                  helperText={errors.title?.message}
                  variant="outlined"
                  label={LocalizeComponent.title_name} />
                <CssTextField
                  inputRef={register}
                  name="description"
                  className="textArea"
                  id="description"
                  type="text"
                  multiline
                  helperText={errors.description?.message}
                  variant="outlined"
                  placeholder={LocalizeComponent.description_placeholder}
                  label={LocalizeComponent.description_name} />


                <Box mt={1} width={1}>
                    <ReactGeoCodeComponent/>
                  </Box>


              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    inputRef={register}
                    label={LocalizeComponent.date_name}
                    className="datepickerColor"
                    name="date"
                    inputRef={register}
                    helperText={errors.date?.message}
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    keyboardIcon={<CalendarTodayIcon style={{color:"#8936f4"}} />}
                  />

                  <KeyboardTimePicker
                    inputRef={register}
                    margin="normal"
                    id="time-picker"
                    name="time"
                    label={LocalizeComponent.time_name}
                    value={selectedDate}
                    className="secondMargin"
                    helperText={errors.time?.message}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                    keyboardIcon={<AlarmIcon style={{color:"#8936f4"}} />}
                  />
                </MuiPickersUtilsProvider>


                <Typography align="left" className="appColor" gutterBottom>{LocalizeComponent.amount_name + " - " + "$" + defaultSliderValue}</Typography>
                <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={databasedefaultSliderValue}
                max={maxdefaultSliderValue}
                min={mindefaultSliderValue}
                onChange={handleChangeSlider}
                />

                <Box>
                  <div className="showText">{LocalizeComponent.count_of_bloggers} - {peopleCount} </div>
                  <div className="showText">{LocalizeComponent.count_of_subscribers } - {subscribers}</div>
                </Box>

                <div className="buttonDiv">
                      <input  className="buttonStyle" type="submit" value={LocalizeComponent.continue_button}/>
                </div>
            </form>

          </Box>

            </Paper>
          </Grid>


          </Grid>
      </div>


  );
};

 export default connect()(ApplyComponent);
