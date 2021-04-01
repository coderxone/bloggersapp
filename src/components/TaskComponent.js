import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import TaskService from '../services/TaskService';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';


import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
} from "react-router-dom";



function mapStateToProps(state,ownProps) {
  return {
    count: state.count,
    email:state.email,
    password:state.password
  }
}

//const {regionsList: { data: list = [] } } = props;

const mapDispatchToProps = dispatch => ({
  increment,
  decrement,
  dispatch,
  save_email
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'transparent',
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'transparent',
  },
}));



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
        borderColor: 'red',
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
  email: yup.string().required("Required").email(),
});


const MessageComponent = (props) => {
  return (
    <div className="errorBox">
        {props.message}
    </div>
  )
}


const BlockComponent = (props) => {

  const items = props.items;

  const content = useMemo(() => {

    return items.map((item,index) =>

      <Link key={item.id} className="deleteUrlClass"
          to={{
            pathname: "/detailtask",
            data: item // your data array of objects
          }}
          >
            <div  className="MainBlock withoutScroll">
              <div  className="firstLevel">
                  <div className="firstLevelText">
                      {item.url} - {item.description}
                  </div>
              </div>
              <div className="secondLevel">
                <div className="secondLevelShare">
                  <div className="secondLevelOne">
                    <div className="shouldButton">
                        <div className="shouldButtonText">
                              limit: {item.peoplecount} infl.
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelTwo">

                  </div>
                </div>
                <div className="secondLevelShareThree">
                  <div className="secondLevelThree">
                    <div className="shouldButtonThree">
                        <div className="shouldButtonText">
                              {item.date} - {item.time}
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelThreeTwo">
                    <div className="shareButtonThree">
                        <div className="shareButtonText">
                              {item.sum} $
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Link>

      );

  },[props.items]);



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

}


const TaskComponent = (props) => {


  var checkingEmail = useMemo(() => {

      const locationData = props.location;
      if(locationData.data){
        //save in browser memory
        localStorage.setItem("checkingEmail",checkingEmail);
        //return object;
        return props.location.data.user_email;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("checkingEmail");
      }

  },[]);




  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });



  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const onSubmit = ((data) => {




  });

  const [listArray,setListArray] = useState([]);



  useEffect(() => {

    const TaskServiceUnsub = TaskService.listenUserDataTask().subscribe(data => {
      //console.log(data);

      if(data.status == "ok"){

        const newlistArray = [...listArray];

        for(var i = 0;i < data.data.length;i++){
            var found = 0;
            for(var j = 0;j < newlistArray.length;j++){
              if(newlistArray[j].id == data.data[i].id){
                found = 1;
              }
            }
            if(found == 0){
              newlistArray.push(data.data[i]);
            }

        }

        setListArray(newlistArray);

      }

    });
    //unsubscribe

    return () => {
      TaskServiceUnsub.unsubscribe();
    }

    //unsubscribe

  }, [listArray]);


  useEffect(() => {

    //initiase functions
    TaskService.getTaskData();
    config.checkUserAuthorization(1);


  }, []);





  return (

   	<div className={classes.root}>
        <Grid container >
            <GoBackAbsoluteComponent/>
            <BlockComponent items={listArray} />
          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(TaskComponent);
