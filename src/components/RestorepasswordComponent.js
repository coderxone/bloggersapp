import React, {useState,useEffect} from 'react';
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
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/Logo_Echohub.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import DialogComponent from '../components/DialogComponent';
import RestoreTemplate from '../components/emailTemplates/restorePassword';
import ReactDOMServer from 'react-dom/server';

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
    padding: theme.spacing(2),
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




const RestorepasswordComponent = (props) => {



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

  const onSubmit = ((data) => {


      setStorageData(prevState => {
          return obj.email = data.email;
      });


    AuthService.sendRestorePassword(data);//find user

  });



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

          var sendingEmail = data.data.email;
          var currentPassword = data.data.password;

          var content = ReactDOMServer.renderToString(<RestoreTemplate email={sendingEmail} password={currentPassword}/>);

          var sendObject = {
            email:storageData.email,
            html:content
          }
          HomeService.sendNodeMail(sendObject);
//xx
      }
    });
    //unsubscribe

    return () => {
      sendedEmailService.unsubscribe();
      restoredPassword.unsubscribe();
    }

    //unsubscribe

  }, []);


  return (

   	<div className={classes.root}>
        <Grid container >

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <Box mt={3} >
                <img src={Logo} alt="Logo" className="MainLogo" />
              </Box>

            </Paper>
          </Grid>




          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <Box mt={6}>
              <form onSubmit={handleSubmit(onSubmit)}   className={classes.margin}>

                <CssTextField

                  inputRef={register}
                  name="email"
                  className="secondMargin"
                  id="email"
                  type="email"
                  helperText={errors.email?.message}
                  variant="outlined"
                  label="Email" />



                <div className="buttonDiv">
                      <input  className="buttonStyle" type="submit" value={LocalizeComponent.restore_button}/>
                </div>
            </form>

          </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={1} className="forgot-password">
                <Link className="appColor" to="/login">{LocalizeComponent.login}</Link>
              </Box>

            </Paper>
          </Grid>

          <Grid item xs={12} >
            <Paper  className={classes.paper}>

              <Box mt={1} className="forgot-password">
                <DialogComponent closeValue={closeDialog}/>
              </Box>

            </Paper>
          </Grid>

          </Grid>
      </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(RestorepasswordComponent);
