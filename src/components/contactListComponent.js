import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/contactListComponent.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Observable from '../services/Observable';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import ContactListService from '../services/ContactListService';
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
    backgroundColor:'#161730',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#161730',
  },
}));


const MapList = ((props) => {

  const list = props.list;

  const eliotIco = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";

  const [messageCount,setMessageCount] = useState(3);
  const [online,setOnline] = useState(1);
  var contactObj = {
    name:"testName",
    date:"someDate",
    message:"newMessage",
    count:3

  }
  const [contact,setContact] = useState(contactObj);

  const checkingEmail = ((email,emailtwo) => {

    if(email == config.getUserEmail()){
      return emailtwo;
    }else{
      return email;
    }

  });

  const checkProjectId = (projectId) => {


    if((projectId == null) || (projectId == undefined)){
      return 11;
    }else{
      return projectId;
    }
  }

  const ListConst = list.map((item) =>

        <Link
          to={{
            pathname: "/suggest",
            projectId: checkProjectId(item.projectId),
            email:checkingEmail(item.fromEmail,item.toEmail)
          }}

         key={item.id} className="mainList deleteUrlClass">
          <div className="pleftBlock">
            <div style ={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url("+eliotIco+") no-repeat center/cover" }  } className="pleftBlockOne"></div>
            <div className="pleftBlockTwo">
            {item.online == 1 ? (
                  <FiberManualRecordIcon className="mysize "/>
             ) : (
                  <FiberManualRecordIcon className="mysize-offline"/>
             )}

            </div>
          </div>
          <div className="prightBlock">
            <div className="prightBlockOne">
              <div className="prightBlockOneTwo">
                <div className="prightBlockOneTwoText">
                  {checkingEmail(item.fromEmail,item.toEmail)}
                </div>
              </div>
              <div className="prightBlockOneThree">
                <div className="prightBlockOneThreeText">
                  {item.date}
                </div>
              </div>
            </div>

            <div className="prightBlockTwo">
              <div className="prightBlockTwoOne">
                <div className="prightBlockTwoOneText">
                  {item.message}
                </div>

              </div>
              {item.count > 0 ? (
                <div className="prightBlockTwoTwo">
                      <div className="prightBlockTwoTwoNumber">
                          {item.count}
                      </div>
                </div>
               ) : (
                 <div></div>
               )}

            </div>


          </div>
      </Link>

  );


  return ListConst;



});


const ContactListComponent = (props) => {


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


  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  const [contactList,setContactList] = useState([]);



  useEffect(() => {

    const contactsub = ContactListService.listenContactData().subscribe(data => {
      setContactList(data.data);
    });
    //unsubscribe

    return () => {
      contactsub.unsubscribe();
    }

    //unsubscribe

  }, []);


  useEffect(() => {

    const chekBytime = Observable.subscribeByTimer_5_second().subscribe(data => {
        ContactListService.getContactData();
    });

    //initiase functions
    ContactListService.getContactData();

    return () => {
      chekBytime.unsubscribe();
    }


  }, []);



  return (

   	  <div className={classes.root}>
        <GoBackAbsoluteComponent />
        <Grid container >

          <MapList list={contactList} />


        </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(ContactListComponent);
