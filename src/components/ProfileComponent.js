import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import '../css/profileComponent.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import GoBackWithCenterComponent from '../helperComponents/goBackAbsoluteComponent';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import ProfileService from '../services/ProfileService.js'
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
    color:'#ffffff',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor:'#161730',
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



const ErrorDiv = (props) => {
  console.log(props);
  const errorMessage = props.message;

  if(errorMessage != undefined){
    return <MessageComponent message={errorMessage}/>
  }else{
    return <div></div>
  }

}



const ProfileComponent = (props) => {

  var checkingEmail = useMemo(() => {
    const locationData = props.location;
    if(locationData.data){
      localStorage.setItem("checkingEmail",props.location.data.user_email);
      return props.location.data.user_email;
    }else{
      return localStorage.getItem("checkingEmail");
    }
  },[]);


//  console.log(checkingEmail);






  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });
  var obj = {
    email:""
  };


  const [storageData,setStorageData] = useState(obj);

  const [cancelDoubleEvent,setCancelDoubleEvent] = useState(0);

  const [closeDialog,setCloseDialog] = useState(false);

  var backgroundImageUrl = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";

  const onSubmit = ((data) => {

    const newValue = {...storageData};
    newValue.email = data.email;
    setStorageData(newValue);

    AuthService.sendRestorePassword(data);//find user

  });

  const object = {
    id:0,
    email:"",
    image_url:"",
    name:"",
    raiting_stars:5,
    subscribers_count:300,
    number_of_task:0
  }

  const [dataObject,setDataObject] = useState(object);



  useEffect(() => {

    const sendedEmailService = HomeService.listenSendMail().subscribe(data => {

      if(data.status == "sended"){
        setCloseDialog(true);
      }
    });

    const restoredPassword = AuthService.getRestorePassword().subscribe(data => {

      if(data.status == "usernotfound"){
        setError("email", {
              type: "manual",
              message: LocalizeComponent.user_not_found
            });
      }else{
          //user found send email to him with login and password
          var sendObject = {
            email:storageData.email
          }
          HomeService.sendNodeMail(sendObject);

      }
    });

    const listenUserData = ProfileService.listenUserDataG().subscribe(data => {
        //console.log(data);
        if(data.result){
          const newEmail = {
            id:data.result.id,
            email:data.result.email,
            image_url:data.result.image_url,
            name:data.result.name,
            raiting_stars:data.result.raiting_stars,
            subscribers_count:data.result.subscribers_count,
            number_of_task:data.result.number_of_task
          }

          setDataObject(newEmail);
        }



        // setDataObject(prevState => {
        //   prevState.email = data.result.email;
        // })
    });
    //unsubscribe

    return () => {
      sendedEmailService.unsubscribe();
      restoredPassword.unsubscribe();
      listenUserData.unsubscribe();
    }

    //unsubscribe

  }, []);




  useEffect(() => {

    //initiase functions

    ProfileService.getUserData(checkingEmail);



  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >
          <GoBackWithCenterComponent center={LocalizeComponent.profileInformation}/>


          <div className="BloggerMainBlock">
            <div className="leftSideMainBlock">
                <div className="AvatarCircle" style ={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url("+backgroundImageUrl+") no-repeat center/cover" }  }  >

                </div>

            </div>

            <div className="rightSideMainBlock">
                <div className="NameBlock">
                  {dataObject.email}
                </div>
            </div>

          </div>

          <div className="TasksBox">
              <div className="STasksBox">
                <div className="lTasksBox">
                  {LocalizeComponent.number_of_c_tasks}
                </div>
                <div className="rTasksBox">
                  {dataObject.number_of_task}
                </div>
              </div>

              <div className="STasksBox">
                <div className="lTasksBox">
                  {LocalizeComponent.rating}
                </div>
                <div className="rTasksBox">
                  {dataObject.raiting_stars} / 5
                </div>
              </div>

              <div className="STasksBox">
                <div className="lTasksBox">
                  {LocalizeComponent.subscribers_p}
                </div>
                <div className="rTasksBox">
                  {dataObject.subscribers_count}
                </div>
              </div>

              <div className="SbuttonDiv">
                <Link
                  className="removeUrlStyles"
                  to={{
                    pathname: "/rate",
                    data: dataObject.id// your data array of objects
                  }}
                >
                <div className="RbuttonStyle">
                  <div className="RbuttonText">

                      {LocalizeComponent.rate}

                  </div>
                </div>
                </Link>
                <div></div>

              </div>



          </div>


          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(ProfileComponent);
