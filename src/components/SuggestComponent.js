import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/mainStyles.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import ChatService from '../services/Chatservice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
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
import Observable from '../services/Observable';
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

const windowHeight = (window.screen.height - 20)  + "px";

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    height:windowHeight,
  }
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
//xx

const MessageListComponent = ((props) => {
    const list = props.list;

    //console.log(list);
    const [typeIndicator,setTypeIndicator] = useState(false);

    const Mtype = 'typingIndicator={<TypingIndicator content="Eliot is typing" />}';

    const returnList = list.map(item =>

        <div key={item.id}>
          {item.message}
        </div>

    );

    const [newMessage,setNewMessage] = useState("");

    const SetMessage = (message) => {
      setNewMessage(message);
    }

    const sendMessage = (() => {
        //<br>
        const newCleanString = newMessage.replace('<br>','');
        Observable.sendData_subject_M(newCleanString);
        console.log(newCleanString);
        setNewMessage("");
    });

    return (
      <ChatContainer>
      <MessageList >
          {returnList}
      </MessageList>
      <MessageInput class="chatstyles" onChange={event => SetMessage(event)}  onSend={event => sendMessage()} placeholder="Type message here" />
      </ChatContainer>


    )
})



const SuggestComponent = (props) => {



  const currentEmail = useMemo(() => {

      const locationData = props.location;

      if(locationData.email){
        //save in browser memory
        //console.log(props.location.email);
        localStorage.setItem("currentEmail",props.location.email);
        //return object;
        return props.location.email;
        // localStorage.setItem("checkingItemData",JSON.stringify(ItemData));
      }else{
        return localStorage.getItem("currentEmail");
      }

  },[]);

  //console.log(currentEmail);

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

  //console.log(projectId);

  const deviceEmail = useMemo(() => {
    return config.getUserEmail();
  },[])






  const eliotIco = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";


  const classes = useStyles();
  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });





  const [closeDialog,setCloseDialog] = useState(false);

  const onSubmit = ((data) => {




  });

  const [messagesList,setMessagesList] = useState([]);

  const outgoing = (message,email,avurl,id) => {


    const M = <Message model={{
        message: message,
        sentTime: "now",
        sender: email,
        direction: "incoming",
        position: "normal"
      }}>
          <Avatar src={avurl} name={email} />
      </Message>;

      var returnObj = {
        id:id,
        message:M
      }

      return returnObj;

  }


  const incoming = (message,email,id) => {


    const M = <Message model={{
        message: message,
        sentTime: "now",
        sender: email,
        direction: "outgoing",
        position: "normal"
        }} />;

      var returnObj = {
        id:id,
        message:M
      }

      return returnObj;

  }

  const demoUrl = "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg";

  const [lastMessageId,setLastMessageId] = useState(0);


  useEffect(() => {


    const listenMessages = ChatService.listenAllMessages().subscribe(data => {
          //console.log(data.data);

          var existlist = data.data;

          if(existlist.length < 1){
            return false;
          }
          const newList = [...messagesList];
          var lastMid = 0;

          for(var i = 0;i < data.data.length;i++){
            if(data.data[i].fromEmail == currentEmail){
              //friend
              var outmessage = outgoing(data.data[i].message,currentEmail,demoUrl,data.data[i].date,data.data[i].id);
              newList.push(outmessage);
              lastMid = data.data[i].id;

            }else if(data.data[i].fromEmail == deviceEmail){
              //my messages
              //var messages = incoming(message,email,avurl,data[i].id);
              var messages = incoming(data.data[i].message,deviceEmail,data.data[i].id);
              newList.push(messages);
              lastMid = data.data[i].id;
            }
          }


          setLastMessageId(lastMid);//set last message id
          setMessagesList(newList);

          //
          //scrollToBottom();
    });




    const listenReadMessage = ChatService.listenReadMessage().subscribe(data => {
      console.log(data);
    });

    return () => {
      listenMessages.unsubscribe();
      listenReadMessage.unsubscribe();
    }

    //unsubscribe

  }, []);

  const requestToCheckMessages = (() => {
    var checkObj = {
      currentEmail:currentEmail,
      projectId:projectId,
    }
    //initiase functions
    ChatService.checkGetAllMessages(checkObj);
  });

  const initMessageService = (() => {
    var sendObj = {
      message:"init",
      currentEmail:currentEmail,
      projectId:projectId,
    }
    ChatService.sendMessage(sendObj);
  });


  useEffect(() => {
    const obs = Observable.getData_subject_M().subscribe(message => {

        if(message.length > 0){
          const lastMid = lastMessageId + 1;
          const newList = [...messagesList];
          var newmessage = incoming(message,deviceEmail,lastMid);
          newList.push(newmessage);
          setLastMessageId(lastMid);
          setMessagesList(newList);
          var sendObj = {
            message:message,
            projectId:projectId,
            currentEmail:currentEmail,
          }

          console.log(sendObj);
          ChatService.sendMessage(sendObj);

        }

    });

    return () => {
      obs.unsubscribe();
    }

  },[messagesList,lastMessageId]);


  useEffect(() => {

    const listenSendM = ChatService.listengetMessage().subscribe(data => {
      //xx
      console.log(data);

      if(data.message.length > 0){
        const lastMid = lastMessageId + 1;
        const newList = [...messagesList];
        var newmessage = outgoing(data.message,data.fromEmail,demoUrl,data.date,lastMid);

        var found = 0;
        for(var i = 0;i < newList.length;i++){
          if(newList[i].id == newmessage.id){
            found = 1;
          }
        }
        if(found == 0){
          newList.push(newmessage);
          setLastMessageId(lastMid);
          setMessagesList(newList);
          ChatService.readMessage(data);
          HomeService.notificationVoice();
        }


      }

    });


    return () => {
      listenSendM.unsubscribe();
    }

  },[messagesList,lastMessageId])


  useEffect(() => {

    initMessageService();
    initMessageService();
    requestToCheckMessages();


  }, []);




  return (

        <Grid container className={classes.root}>
              <GoBackAbsoluteComponent/>
              <MainContainer  style ={{heigth:"100%",width:"100%"}}>
                <MessageListComponent list={messagesList}/>
              </MainContainer>
        </Grid>

  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(SuggestComponent);
