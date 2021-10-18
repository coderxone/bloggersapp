import React, {useState,useEffect,useMemo,useCallback} from 'react';
import '../css/detailComponent.scss';

import "../assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "../assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "../assets/demo/demo.css";

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
import config from '../config/config';
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
import { useSelector, useDispatch } from 'react-redux'
import { SetManagementList } from '../features/counter-slice';

import {
  Link,useHistory,
} from "react-router-dom";


import UsIcon from '../assets/img/US.png';
import DeIcon from '../assets/img/DE.png';
import AUIcon from '../assets/img/AU.png';
import GBIcon from '../assets/img/GB.png';
import ROIcon from '../assets/img/RO.png';
import BRIcon from '../assets/img/BR.png';

import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Progress,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/charts.js";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};




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
    backgroundColor:'#1e1e2f',
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



//xxx
//new blogger Management component

const countPercent = (userExecuteDay) => {

  if(userExecuteDay == 0){
    userExecuteDay = 1;
  }
  let executeDay = parseInt(config.getUserItemName("execute_day"));//100%

  let getPercent = (userExecuteDay / executeDay) * 100;

  return parseInt(getPercent);

}

const ManageTable = (props) => {

  const list = props.list;

  console.log(list)

  const ConfirmTask = (user_email) => {

    var sendObject = {
      from:2,
      user_email:user_email
    }
    ObservableService.sendData_subject(sendObject);
}

  const renderList = list.map((item) =>

          <tr key={item.id} onClick={(e) => navigateToDetail(item, e)} >
            <td className="text-center">
              <div className="photo"
                style = {{
                          backgroundPosition: "center",
                          backgroundRepeat:"no-repeat",
                          backgroundSize:"cover",
                          background: config.getGeneratedImagePath(item.image_url)
                        }}
                >

              </div>
            </td>
            <td style={{color:'white'}} >{item.user_email}</td>

            <td className="text-center">

              <div className="progress-container progress-sm">
                <span className="progress-value  whiteColor">{countPercent(item.verifiedDays)} %</span>
                <Progress multi>
                  <Progress bar max="100" value={countPercent(item.verifiedDays)} />
                </Progress>
              </div>
            </td>

            <td className="text-right">
              <Button
                className="btn-link btn-icon btn-neutral"
                color="success"
                id="tooltip618296632"
                size="sm"
                title="Refresh"
                type="button"
              >
              <Link
                className="removeUrlStyles"
                to={{
                  pathname: "/explore_profile",
                  data: item // your data array of objects
                }}
              >
                <i className="tim-icons icon-single-02 BlueColor" />
            </Link>

              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip618296632"
              >
                {LocalizeComponent.profile}
              </UncontrolledTooltip>
              <Button
                className="btn-link btn-icon btn-neutral"
                color="danger"
                id="tooltip707467505"
                size="sm"
                title="Delete"
                type="button"
              >
              <Link className="removeUrlStyles"
                to={{
                  pathname: "/subdetail",
                  data: item // your data array of objects
                }}
              >
               <i className="tim-icons icon-settings PurpleColor" />
             </Link>

              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip707467505"
              >
                {LocalizeComponent.detail}
              </UncontrolledTooltip>


              {
                //need to confirm
                item.uniquenames_status === 2 && (
                  <>
                    <Button
                      className="btn-link btn-icon btn-neutral"
                      color="danger"
                      id="tooltip707467505"
                      size="sm"
                      title="Delete"
                      type="button"
                      onClick={ConfirmTask(item.user_email)}
                    >
                      <i className="tim-icons icon-alert-circle-exc blink_me orangeColor" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip707467505"
                    >
                      {LocalizeComponent.Confirm_task}
                    </UncontrolledTooltip>
                  </>
                )
              }

              {
                //bloger changing video
                item.status === 3 && (
                  <>
                    <Button
                      className="btn-link btn-icon btn-neutral"
                      color="danger"
                      id="tooltip707467505"
                      size="sm"
                      title="Delete"
                      type="button"
                    >
                      <i className="tim-icons icon-alert-circle-exc blink_me RedColor" />
                    </Button>
                    <UncontrolledTooltip
                      delay={0}
                      target="tooltip707467505"
                    >
                      {LocalizeComponent.action_required}
                    </UncontrolledTooltip>
                  </>
                  
                )
              }

                  {
                    item.uniquenames_status !== 2 && (
                      <>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip707467505"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i  onClick={event => ConfirmTask(item.user_email)} className="tim-icons icon-check-2 done_button_one_name" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip707467505"
                        >
                          {
                            config.getCurrentStatus(item.uniquenames_status)
                          }
                        </UncontrolledTooltip>
                      </>
                    ) 
                  }
                  
                
              



            </td>
          </tr>


  );

  const content = (
    <div className="dashboardWrapper">
      <div className="content">
        <Row>
          <Col lg="7" xl="11" sm="12">
            <Card>
              <CardHeader>

                <CardTitle tag="h5">{LocalizeComponent.list_of_bloggers}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr className="whiteColor">
                      <th className="text-center">#</th>
                      <th>{ LocalizeComponent.email_Translate }</th>

                      <th>{ LocalizeComponent.email_Milestone }</th>

                      <th className="text-right">{ LocalizeComponent.email_Actions } </th>
                    </tr>
                  </thead>
                  <tbody>

                    {renderList}

                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );

  return content;

}
//new blogger Management component
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

  //console.log(checkDetailId)


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

  const dispatch = useDispatch();

  const listArray = useSelector(state => state.counter.managementList);

  const [ listArrayApprove, setListApproveArray ] = useState([]);
  const [ viewsCount,setViewsCount ] = useState(0);

  const SendConfirmTask = (user_email) => {
      DetailService.getSendTaskDone(user_email,checkDetailId);
  }

  const [progressBarValue,SetprogressBarValue] = useState(10);

  let widthValueFirst = progressBarValue + "%";
  let widthValueSecond = 70 + "%";

  const CountPercentFunction = (data) => {
    //SetprogressBarValue
    //ItemData.peoplecount
    var completeTasks = 0;
    for(var i = 0;i < data.length;i++){
      if(data[i].complete == 1){
        completeTasks++;
      }
    }

    let bloggerCount = localStorage.getItem("bloggerCount");
    // console.log(bloggerCount)

    var result = Math.round((completeTasks / parseInt(bloggerCount)) * 100);

    if(result > progressBarValue){
      SetprogressBarValue(result);
    }

  }
//xxx

  useEffect(() => {

    const listenDetailService = DetailService.listenDetailData().subscribe(data => {

      //console.log(data);
      if(data.status != "false"){

        var modifiedArray = data.data;

        let oldArray = [...listArray];

        //console.log(oldArray)

        if(oldArray.length > modifiedArray.length || oldArray.length < modifiedArray.length){
          CountPercentFunction(modifiedArray);

          dispatch(SetManagementList([]));
          dispatch(SetManagementList(modifiedArray));

        }

      }else{
        dispatch(SetManagementList([]));
      }

    });

    return () => {
      listenDetailService.unsubscribe();
    }

  },[listArray]);


  useEffect(() => {


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


 const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };


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

            <ManageTable list={listArray} />
            
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

            <div className="dashboardWrapper">
              <div className="content">
                <Row>

                  <Col xs="12">
                    <Card className="card-chart">
                      <CardHeader>
                        <Row>
                          <Col className="text-left" sm="6">
                            <h5 className="card-category">{ LocalizeComponent.posts_efficiency }</h5>
                            <CardTitle tag="h2">{ LocalizeComponent.performance }</CardTitle>
                          </Col>
                          <Col sm="6">
                            <ButtonGroup
                              className="btn-group-toggle float-right"
                              data-toggle="buttons"
                            >
                              <Button
                                color="info"
                                id="0"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: bigChartData === "data1",
                                })}
                                onClick={() => setBgChartData("data1")}
                              >
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                  { LocalizeComponent.Accounts }
                                </span>
                                <span className="d-block d-sm-none">
                                  <i className="tim-icons icon-single-02" />
                                </span>
                              </Button>
                              <Button
                                color="info"
                                id="1"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: bigChartData === "data2",
                                })}
                                onClick={() => setBgChartData("data2")}
                              >
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                  { LocalizeComponent.conversion }
                                </span>
                                <span className="d-block d-sm-none">
                                  <i className="tim-icons icon-gift-2" />
                                </span>
                              </Button>
                              <Button
                                color="info"
                                id="2"
                                size="sm"
                                tag="label"
                                className={classNames("btn-simple", {
                                  active: bigChartData === "data3",
                                })}
                                onClick={() => setBgChartData("data3")}
                              >
                                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                { LocalizeComponent.efficiency_views }
                                </span>
                                <span className="d-block d-sm-none">
                                  <i className="tim-icons icon-tap-02" />
                                </span>
                              </Button>
                            </ButtonGroup>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-area">
                          <Line
                            data={chartExample1[bigChartData]}
                            options={chartExample1.options}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="3" md="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col xs="5">
                            <div className="info-icon text-center icon-warning">
                              <i className="tim-icons icon-chat-33" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category">{ LocalizeComponent.incomingConversion }</p>
                              <CardTitle tag="h3">150GB</CardTitle>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <hr />
                        <div className="stats">
                          <i className="tim-icons icon-refresh-01" /> Update Now
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="3" md="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col xs="5">
                            <div className="info-icon text-center icon-primary">
                              <i className="tim-icons icon-shape-star" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category">{ LocalizeComponent.newFollowers }</p>
                              <CardTitle tag="h3">+45k</CardTitle>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <hr />
                        <div className="stats">
                          <i className="tim-icons icon-sound-wave" /> Last Research
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="3" md="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col xs="5">
                            <div className="info-icon text-center icon-success">
                              <i className="tim-icons icon-single-02" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category">{ LocalizeComponent.visited_users }</p>
                              <CardTitle tag="h3">150,000</CardTitle>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <hr />
                        <div className="stats">
                          <i className="tim-icons icon-trophy" /> { LocalizeComponent.Customers_feedback }
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="3" md="6">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <Col xs="5">
                            <div className="info-icon text-center icon-danger">
                              <i className="tim-icons icon-molecule-40" />
                            </div>
                          </Col>
                          <Col xs="7">
                            <div className="numbers">
                              <p className="card-category">{ LocalizeComponent.errors }</p>
                              <CardTitle tag="h3">12</CardTitle>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <hr />
                        <div className="stats">
                          <i className="tim-icons icon-watch-time" /> { LocalizeComponent.last_hour }
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-chart">
                      <CardHeader>
                        <h5 className="card-category">{ LocalizeComponent.TotalPosts }</h5>
                        <CardTitle tag="h3">
                          <i className="tim-icons icon-bell-55 text-primary" /> 763,215
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-area">
                          <Line
                            data={chartExample2.data}
                            options={chartExample2.options}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-chart">
                      <CardHeader>
                        <h5 className="card-category">{ LocalizeComponent.projected_income }</h5>
                        <CardTitle tag="h3">
                          <i className="tim-icons icon-delivery-fast text-info" />{" "}
                          3,500$
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-area">
                          <Bar
                            data={chartExample3.data}
                            options={chartExample3.options}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="4">
                    <Card className="card-chart">
                      <CardHeader>
                        <h5 className="card-category">{ LocalizeComponent.completedTasks }</h5>
                        <CardTitle tag="h3">
                          <i className="tim-icons icon-send text-success" /> 12,100K
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div className="chart-area">
                          <Line
                            data={chartExample4.data}
                            options={chartExample4.options}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12">
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">{ LocalizeComponent.global_posts_by_locations }</CardTitle>
                        <p className="card-category">{ LocalizeComponent.all_posts_where_posted }</p>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col md="6">
                            <Table responsive>
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="US"
                                        src={UsIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>USA</td>
                                  <td className="text-right">2.920</td>
                                  <td className="text-right">53.23%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="..."
                                        src={DeIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>Germany</td>
                                  <td className="text-right">1.300</td>
                                  <td className="text-right">20.43%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="..."
                                        src={AUIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>Australia</td>
                                  <td className="text-right">760</td>
                                  <td className="text-right">10.35%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="..."
                                        src={GBIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>United Kingdom</td>
                                  <td className="text-right">690</td>
                                  <td className="text-right">7.87%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="..."
                                        src={ROIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>Romania</td>
                                  <td className="text-right">600</td>
                                  <td className="text-right">5.94%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="flag">
                                      <img
                                        alt="..."
                                        src={BRIcon}
                                      />
                                    </div>
                                  </td>
                                  <td>Brasil</td>
                                  <td className="text-right">550</td>
                                  <td className="text-right">4.34%</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                          <Col className="ml-auto mr-auto" md="6">
                            <VectorMap
                              map={"world_mill"}
                              backgroundColor="transparent"
                              zoomOnScroll={false}
                              containerStyle={{
                                width: "100%",
                                height: "300px",
                              }}
                              regionStyle={{
                                initial: {
                                  fill: "#e4e4e4",
                                  "fill-opacity": 0.9,
                                  stroke: "none",
                                  "stroke-width": 0,
                                  "stroke-opacity": 0,
                                },
                              }}
                              series={{
                                regions: [
                                  {
                                    values: mapData,
                                    scale: ["#AAAAAA", "#444444"],
                                    normalizeFunction: "polynomial",
                                  },
                                ],
                              }}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>

          <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
        </Grid>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
