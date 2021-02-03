import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import ChatService from '../services/Chatservice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Logo from '../icons/logo_circle_new_circle.png';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';
import DialogComponent from '../components/DialogComponent';
import config from '../config/config.js';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  Avatar,
  TypingIndicator,
  MessageSeparator,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
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
    width:"100%"
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




const SuggestComponent = (props) => {



  const currentEmail = useMemo(() => {

      const locationData = props.location;

      if(locationData.email){
        //save in browser memory
        console.log(props.location.email);
        localStorage.setItem("currentEmail",props.location.email);
        //return object;
        return props.location.email;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("currentEmail");
      }

  },[]);

  const projectId = useMemo(() => {

      const locationData = props.location;
      if(locationData.projectId){
        //save in browser memory
        localStorage.setItem("currentProjectId",props.location.projectId);
        //return object;
        return props.location.projectId;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("currentProjectId");
      }

  },[]);

  const deviceEmail = useMemo(() => {
    return config.getUserEmail();
  },[])


  const windowHeight = window.screen.height + "px";



  const eliotIco = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";


  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });





  const [closeDialog,setCloseDialog] = useState(false);

  const onSubmit = ((data) => {




  });

  const [messagesList,setMessagesList] = useState([]);

  const incoming = (message,email,avurl,id) => {


    const M = <Message model={{
        message: message,
        sentTime: "now",
        sender: email,
        direction: "incoming",
        position: "last"
      }}>
          <Avatar src={avurl} name={email} />
      </Message>;

      var returnObj = {
        id:id,
        message:M
      }

      return returnObj;

  }


  const outgoing = (message,email,id) => {


    const M = <Message model={{
        message: message,
        sentTime: "15 mins ago",
        sender: email,
        direction: "outgoing",
        position: "last"
        }} />;

      var returnObj = {
        id:id,
        message:M
      }

      return returnObj;

  }

  const demoUrl = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";



  useEffect(() => {


    const listenMessages = ChatService.listenAllMessages().subscribe(data => {
          console.log(data);

          const newList = [...messagesList];



          for(var i = 0;i < data.length;i++){
            if(data[i].fromEmail == currentEmail){
              //friend
              var outmessage = outgoing(data[i].message,currentEmail,data[i].id);
              newList.push(outmessage);
            }else if(data[i].fromEmail == deviceEmail){
              //my messages
              //var messages = incoming(message,email,avurl,data[i].id);
              var messages = incoming(data[i].message,deviceEmail,demoUrl,data[i].date,data[i].id);
              newList.push(messages);
            }
          }



          setMessagesList(newList);
          //
          //scrollToBottom();
    });

    return () => {
      listenMessages.unsubscribe();
    }

    //unsubscribe

  }, []);


  useEffect(() => {

    var checkObj = {
      currentEmail:currentEmail,
      projectId:projectId,
    }

    console.log(checkObj);
    //initiase functions
    ChatService.checkGetAllMessages(checkObj);


  }, []);

  const [newMessage,setNewMessage] = useState("");

  const SetMessage = (message) => {
    setNewMessage(message);

    //console.log(message);
  }

  const sendEvent = () => {
    console.log("clicked");
    setNewMessage("");
  }


  return (
    <div className={classes.root}>
        <Grid container >

              <MainContainer style ={{height:windowHeight,width:"100%"}}>
                <ChatContainer>
                <MessageList typingIndicator={<TypingIndicator content="Eliot is typing" />}>

                  <MessageSeparator content="Saturday, 30 November 2019" />

                          <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "single"
                            }}>
                                            <Avatar src={eliotIco} name="Eliot" />
                                        </Message>
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "single"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "first"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "normal"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "normal"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "last"
                            }}>
                                            <Avatar src={eliotIco} name="Eliot" />
                                        </Message>
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "first"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "normal"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "normal"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "outgoing",
                              position: "last"
                            }} />

                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "first"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "last"
                            }}>
                                            <Avatar src={eliotIco} name="Eliot" />
                                        </Message>

                                        <MessageSeparator content="Saturday, 31 November 2019" />

                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "single"
                            }}>
                                            <Avatar src={eliotIco} name="Eliot" />
                                        </Message>
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "single"
                            }} />

                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "first"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "normal"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "normal"
                            }} avatarSpacer={true} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "last"
                            }}>
                                            <Avatar src={eliotIco} name="Eliot" />
                                        </Message>
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "first"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "normal"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "normal"
                            }} />
                                        <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Zoe",
                              direction: "outgoing",
                              position: "last"
                            }} />

                            <Message model={{
                              message: "Hello my friend",
                              sentTime: "15 mins ago",
                              sender: "Eliot",
                              direction: "incoming",
                              position: "first"
                            }} avatarSpacer={true} />


                    </MessageList>
                  <MessageInput onSend={sendEvent} onChange={event => SetMessage(event)} value={newMessage} placeholder="Type message here" />
                </ChatContainer>
              </MainContainer>


          </Grid>
      </div>



  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(SuggestComponent);
