import React, {useState,useEffect,useMemo,useCallback} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/detailComponent.scss';
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
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import ObservableService from '../services/Observable';
import DetailService from '../services/DetailService';
import config from '../config/config.js';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import GoBackAbsoluteComponent from '../helperComponents/goBackAbsoluteComponent';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import HomeService from '../services/Homeservice';
import BusinesService from '../services/BusinessService';
import DoneIcon from '@material-ui/icons/Done';
import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,useHistory,
} from "react-router-dom";



function mapStateToProps(state,ownProps) {
  return {
    reduxState: state,
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
    color:'#0083ff',
  },
  paper: {
    padding: theme.spacing(1),
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


const useStylesthree = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    // backgroundColor: "black",
  },
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));


var historyId = 9900;







const View = (url) => {
  var win = window.open(url, '_blank');
  win.focus();
}



const SubComponent = (props) => {

  var status = props.condition.status;
  var id = props.condition.id;

  var url = props.condition.url;

  const Approve = (id) => {

    var sendObject = {
      from:10
    }
    ObservableService.sendData_subject(sendObject);
    DetailService.setApprove(id);

  }



  if(status === true){
      //$(".dynamicClass" + id).css("height","6em");
  }else if(status === false){
    //$(".dynamicClass" + id).css("height","3.7em");
  }

  return (
    <div>

    {status === false ? (
       <div>

       </div>
     ) : (
       <div className="subComponentDown">

          <div className="centrDiv" onClick={(e) => Approve(id)}>
              <DoneOutlineIcon className="leftSide"/>
              <div className="rightSide">
                  Approve
              </div>
          </div>
          <div className="centrDivCopy" onClick={(e) => View(url)}>
              <VisibilityIcon className="leftSide"/>
              <div className="rightSide">
                  View
              </div>
          </div>


       </div>
     )}

    </div>
  );
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  var padding = 0;

  if(value == 1){
    padding = 0;
  }else{
    padding = 0;
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={padding}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStylesh = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

//BlogList Component

const navigateToDetail = (item,e) => {

}

const SubDetail = (item,e) => {

}



//xx
const BlogListComponent = (props) => {

  const items = props.items;

  //console.log(items);

  const ConfirmTask = (user_email) => {

      var sendObject = {
        from:2,
        user_email:user_email
      }
      ObservableService.sendData_subject(sendObject);
  }

  const content = items.map((item) =>

      <div key={item.id} onClick={(e) => navigateToDetail(item, e)} className="blogger_block_main">
  {item.complete === 1 ? (
          <div className="blogger_block_two">
              <div className="circle_image" style ={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url("+item.image_url+") no-repeat center/cover" }  }>
              </div>
              <div className="bl_name_center">
                  <div className="bl_email_text_two">{item.user_email}</div>
                  <div className="buttons_block_two">
                    <div className="left_button">
                      <div className="left_button_one">
                        <div className="left_button_one_name">
                          <Link
                            className="removeUrlStyles"
                            to={{
                              pathname: "/profile",
                              data: item // your data array of objects
                            }}
                          >
                            <div  className="left_button_one_name">
                               {LocalizeComponent.profile}
                            </div>
                        </Link>
                        </div>
                      </div>
                      <div className="left_button_two">
                        <div className="left_button_one_name">
                        <Link className="removeUrlStyles"
                          to={{
                            pathname: "/subdetail",
                            data: item // your data array of objects
                          }}
                        >
                         {LocalizeComponent.detail}
                       </Link>
                        </div>
                      </div>
                      <div className="left_button_three">
                        {item.complete === 1 ? (
                          <div className="done_button_one_name">
                            <DoneIcon className="done_button_one_name_size" />
                          </div>
                         ) : (
                           <div className="left_button_one_name">
                             {item.CountTasks}/{item.taskList.length}
                           </div>
                         )}

                      </div>
                    </div>
                  </div>

                  <div className="buttons_block_three">
                    {item.status === 2 ? (
                      <div className="left_button_confirm">
                        <div className="left_button_one_name">

                          <div  className="left_button_one_name_confirm" onClick={event => ConfirmTask(item.user_email)}>
                             {LocalizeComponent.Confirm_task}
                          </div>


                        </div>
                      </div>
                     ) : (
                       <div className="left_button_confirmed">
                         <div className="left_button_one_name">

                           <div  className="left_button_one_name_confirmed" >
                              <DoneIcon className="done_button_one_name_size_two" /><div className="confirmed_text">{LocalizeComponent.Confirmed_task}</div>
                           </div>


                         </div>
                       </div>

                     )}

                  </div>
              </div>
          </div>
       ) : (
         <div className="blogger_block">
               <div className="circle_image" style ={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url("+item.image_url+") no-repeat center/cover" }  }>
               </div>
               <div className="bl_name_center">
                   <div className="bl_email_text">{item.user_email}</div>
                   <div className="buttons_block">
                     <div className="left_button">
                       <div className="left_button_one">
                         <div className="left_button_one_name">
                           <Link
                             className="removeUrlStyles"
                             to={{
                               pathname: "/profile",
                               data: item // your data array of objects
                             }}
                           >
                             <div  className="left_button_one_name">
                                {LocalizeComponent.profile}
                             </div>
                         </Link>
                         </div>
                       </div>
                       <div className="left_button_two">
                         <div className="left_button_one_name">
                         <Link className="removeUrlStyles"
                           to={{
                             pathname: "/subdetail",
                             data: item // your data array of objects
                           }}
                         >
                          {LocalizeComponent.detail}
                        </Link>
                         </div>
                       </div>
                       <div className="left_button_three">
                         {item.complete === 1 ? (
                           <div className="done_button_one_name">
                             <DoneIcon className="done_button_one_name_size" />
                           </div>
                          ) : (
                            <div className="left_button_one_name">
                              {item.CountTasks}/{item.taskList.length}
                            </div>
                          )}

                       </div>
                     </div>
                   </div>

               </div>
           </div>
       )}
       </div>

  );

  return (

    <div className="blogger_block_margin">
      {content}
    </div>

  );
}
//BlogList Component

const SocialNetworkComponent = (props) => {

  var list = props.list;

  const readyList = list.map((item) =>

        <div key={item.id}>
          &middot; {item.name}
        </div>

  );

  return (
    <div className="line4">
        {readyList}
    </div>
  );

}


const DetailComponent = (props) => {


  //console.log(props.reduxState.reducerStore);

  const locationData = props.location;

  const checkDetailId = useMemo(function(){
    if(locationData.data){

      localStorage.setItem("savedId",locationData.data.id);
      return locationData.data.id;

    }else{
      return localStorage.getItem("savedId");
    }
  },[]);


  const ItemData = useMemo(function(){
    if(locationData.data){
      localStorage.setItem("savedItemID",JSON.stringify(locationData.data));
      return locationData.data;

    }else{
      return JSON.parse(localStorage.getItem("savedItemID"));
    }
  },[]);


  const SocialNetworkList = useMemo(function(){

      return JSON.parse(localStorage.getItem("soc"));

  },[]);

  //console.log(ItemData);



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

  const getDetailData = () => {



    var senddata = {
      "project_id":checkDetailId,
      "email":config.getUserEmail()
    }


    DetailService.getDetailData(senddata);
    DetailService.getDetailApprovedData(senddata);
    DetailService.getviews(senddata);

  }


  const onSubmit = ((data) => {

      setStorageData(prevState => {
          return obj.email = data.email;
      });

  });

  const [ listArray, setListArray ] = useState([]);
  const [ listArrayApprove, setListApproveArray ] = useState([]);
  const [ viewsCount,setViewsCount ] = useState(0);

  const SendConfirmTask = (user_email) => {
      DetailService.getSendTaskDone(user_email,checkDetailId);
  }

  const [progressBarValue,SetprogressBarValue] = useState(10);

  var widthValueFirst = progressBarValue + "%";
  var widthValueSecond = 70 + "%";

  const CountPercentFunction = (data) => {
    //console.log(data);
    //SetprogressBarValue
    //ItemData.peoplecount
    var completeTasks = 0;
    for(var i = 0;i < data.length;i++){
      if(data[i].complete == 1){
        completeTasks++;
      }
    }
    var result = Math.round((completeTasks / ItemData.peoplecount) * 100);

    if(result > progressBarValue){
      SetprogressBarValue(result);
    }

  }

  useEffect(() => {

    const listenDetailService = DetailService.listenDetailData().subscribe(data => {

      //console.log(data);
      if(data.status != "false"){

        var modifiedArray = data.data;

        CountPercentFunction(modifiedArray);

        const list = listArray.concat(modifiedArray);

        setListArray(list);
      }

    });



    // const listenApprove = DetailService.listenApprove().subscribe(data => {
    //
    //   console.log(data);
    //
    // });



    const observable = ObservableService.getData_subject().subscribe(data => {

      var from = data.from;
      var modify = data.items;
      var modifyId = data.id;
      //
      // if(from == 1){
      //   for(var i = 0;i < modify.length;i++){
      //     if(i != modifyId){
      //       modify[i].status = false;
      //     }else{
      //       modify[i].status = true;
      //     }
      //   }
      //
      //   const ModifArray = listArray.concat(modify);
      //   setListArray(ModifArray);
      if(from == 1){
      }else if(from == 2){
          SendConfirmTask(data.user_email);
      }else if(from == 10){

        setInterval(function(){
          getDetailData();
        },1000)

      }

    });

    const intervalObservable = ObservableService.subscribeByTimer_10_second().subscribe(data => {
      getDetailData();
    });

    const intervalObservableThory = ObservableService.subscribeByTimer_30_second().subscribe(data => {
      BusinesService.RequestCheckTasks();
    });

    const listenViews = DetailService.listenViews().subscribe(data => {
      //console.log(data);
      setViewsCount(data.count);
    });

    const listenSendTaskDone = DetailService.listenSendTaskDone().subscribe(data => {
        //console.log(data);
        getDetailData();
    });


    //unsubscribe

    return () => {
      listenDetailService.unsubscribe();
      observable.unsubscribe();
      intervalObservable.unsubscribe();
      intervalObservableThory.unsubscribe();
      listenViews.unsubscribe();
      listenSendTaskDone.unsubscribe();
    }

    //unsubscribe

  }, []);

//init functionns
useEffect(() => {
  getDetailData();
  BusinesService.RequestCheckTasks();
  config.checkUserAuthorization(2);
},[])



  const classesh = useStylesh();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



 //notification part
 const history = useHistory();
 const goToContacts = useCallback((Contacts) => {

     return history.push({pathname: '/contactlist'}), [history];

 });

 const [dialogAction,SetDialogAction] = useState(0);

 useEffect(() => {
   const DialogNotif = Observable.getData_subject().subscribe(data => {
     if(data == "confirm"){
        if(dialogAction == 0){
          goToContacts();
        }else if(dialogAction == 1){
          setDialogStatus(false);
        }

       //go to page with id
     }else if(data == "cancel"){
       setDialogStatus(false);
     }

   });

   return () => {
     DialogNotif.unsubscribe();
   }

 },[dialogAction]);

 const OneTimeNotification = (data) => {

       var task_id = data.result[0].task_id;
       var count = 0;

       var StorageId = localStorage.getItem("taskId");
       var taskId = parseInt(localStorage.getItem("taskId"));
       var taskCount = parseInt(localStorage.getItem("taskCount"));


       if(taskId !== task_id){
         localStorage.setItem("taskCount",0);
         taskCount = 0;
       }

         if((taskCount < 1) && (StorageId)){
           taskCount++;
           count = taskCount;

           setLeftbutton(LocalizeComponent.cancel);
           setRightbutton(LocalizeComponent.check);
           setDialogText(LocalizeComponent.UncorfimedTask);
           setDetailMessage(data.PleaseCheckThisTask);
           SetDialogAction(1);
           setDialogStatus(true);
           HomeService.notificationVoice();

           localStorage.setItem("taskCount",count);

         }

         localStorage.setItem("taskId",task_id);

 }

 useEffect(() => {




   const DialogExecute = Observable.getData_subjectDialog().subscribe(data => {
     if(data.alert == "opendialog"){
       //console.log(data);
       setLeftbutton(LocalizeComponent.cancel);
       setRightbutton(LocalizeComponent.check);
       setDialogText(LocalizeComponent.dialogCheckMessage);
       setDetailProjectId(data.projectId);
       setDetailMessage(data.message);
       SetDialogAction(0);
       setDialogStatus(true);
       HomeService.notificationVoice();

       //go to page with id
     }

   });


//xx
   //done tasks from each enfluencer
   const ListenCheckTasks = BusinesService.ListenCheckTasks().subscribe(data => {
     if(data.status == "ok"){

       OneTimeNotification(data);

     }else{
       localStorage.setItem("taskCount",0);
     }




   });

   return () => {
     DialogExecute.unsubscribe();
     ListenCheckTasks.unsubscribe();
   }
 },[])



 const [dialogStatus,setDialogStatus] = useState(false);
 const [leftbutton,setLeftbutton] = useState('');
 const [rightbutton,setRightbutton] = useState('');
 const [dialogText,setDialogText] = useState('');
 const [detailProjectId,setDetailProjectId] = useState(0);
 const [detailMessage,setDetailMessage] = useState("");

  return (

    <div className={classes.root}>
        <Grid container >

          <GoBackAbsoluteComponent/>

          <div className="project_title">
              {ItemData.url}
          </div>

          <div className="TitleDivider"></div>

          <div className="project_description">

              {ItemData.description}

          </div>

          <div className="BlockDivider"></div>

          <div className="project_double">
              <div className="line1">
                {LocalizeComponent.paid}
              </div>
              <div className="line2">
                {ItemData.sum}$
              </div>
          </div>

          <div className="project_double">
              <div className="line3">
                {LocalizeComponent.approximate_reach}
              </div>
              <div className="line2">
                {ItemData.subscribers}
              </div>
          </div>

          <div className="project_double">
              <div className="line3">
                {LocalizeComponent.involved_bloggers}
              </div>
              <div className="line2">
                {ItemData.peoplecount}
              </div>
          </div>

          <div className="project_double_l">
              <div className="line3">
                {LocalizeComponent.platforms_in_use}
              </div>
              <SocialNetworkComponent list={SocialNetworkList} />
          </div>

          <div className="BlockDivider"></div>

          <div className="list_of_bloggers">
                {LocalizeComponent.list_of_bloggers}
          </div>

          <BlogListComponent items={listArray}/>

        <div className="BlockDivider"></div>

          <div className="completitionBlock">
              <div className="left_childCompletitionBlock">
                {LocalizeComponent.completition}
              </div>
              <div className="right_childCompletitionBlock">
                  <div className="progressButton">
                      <div style={{width : widthValueFirst}} className="leftprogressButton"></div>
                      <div style={{width : widthValueSecond}} className="rightprogressButton"></div>
                  </div>

                  <div className="completition_percent">
                      <div className="completition_percent_text">
                        {widthValueFirst}
                      </div>
                  </div>

              </div>
          </div>

          <div className="BlockDivider"></div>

          <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
        </Grid>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
