import React, {useState,useEffect,useConstructor,useLayoutEffect} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/detailComponent.css';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
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
import ObservableService from '../services/Observable';
import DialogComponent from '../components/DialogComponent';
import DetailService from '../services/DetailService';
import config from '../config/config.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import $ from "jquery";

import { increment, decrement,save_email } from '../actions/actions';
import {
  Link,
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
    backgroundColor:'#161730',
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

const ListComponent = (props) => {

  const classestree = useStylesthree();

  var statusArray = new Array(4);

  const [secondary, setSecondary] = React.useState(false);

  const items = props.items;

  if(!items){
    return false;
  }


  const handleInsideComponent = (item_id,items) => {


    // items[item_id].status = true;
    // historyId = items[item_id].id;
    // var sendObject = {
    //   id:item_id,
    //   items:items,
    //   from:1
    // }
    // ObservableService.sendData_subject(sendObject);

  }



  const content = items.map((item,index) =>

    <div key={item.id} className={'FullList dynamicClass' + item.id} >

          <div className="centralList">
              <div className="leftSideList" onClick={(e) => handleInsideComponent(index,items)}>
                {item.user_email}
              </div>
              <div className="rightSideList">
                {item.status === false ? (
                  <ExpandLessIcon />
                 ) : (
                   <ExpandMoreIcon/>
                 )}
              </div>
          </div>
          <SubComponent condition={item}/>

    </div>
  );

     return (
          <Grid item xs={12} md={6}>
            <div className={classestree.demo}>
              <List >
                  {content}
              </List>
            </div>
          </Grid>

     );

}





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
      $(".dynamicClass" + id).css("height","6em");
  }else if(status === false){
    $(".dynamicClass" + id).css("height","3.7em");
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

  const content = items.map((item) =>

          <div key={item.id} onClick={(e) => navigateToDetail(item, e)} className="blogger_block">
                <div className="circle_image">
                </div>
                <div className="bl_name_center">
                    <div className="bl_email_text">{item.user_email}</div>
                    <div className="buttons_block">
                      <div className="left_button">
                        <div className="left_button_one">
                          <div className="left_button_one_name">
                             10%
                          </div>
                        </div>
                        <div className="left_button_two">
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
                        <div className="left_button_three">
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
                      </div>
                    </div>
                </div>
            </div>
  );

  return (

    <div className="blogger_block_margin">
      {content}
    </div>

  );
}
//BlogList Component


const DetailComponent = (props) => {


  //console.log(props.reduxState.reducerStore);

  const locationData = props.location;
  var ItemData = null;

  var checkDetailId = 0;

  if(locationData.data){
    checkDetailId = locationData.data.id;
    ItemData = locationData.data;
    localStorage.setItem("savedId",checkDetailId);
    localStorage.setItem("savedItemID",JSON.stringify(ItemData));

  }else{
    checkDetailId = localStorage.getItem("savedId");
    ItemData = JSON.parse(localStorage.getItem("savedItemID"));
  }

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

  useEffect(() => {

    const listenDetailService = DetailService.listenDetailData().subscribe(data => {

      if(data.status != "false"){

        var modifiedArray = data.data;
        
        for(var i = 0;i < modifiedArray.length;i++){
          if(modifiedArray[i].id == historyId){
            modifiedArray[i].status = true;
          }else{
            modifiedArray[i].status = false;
          }

        }

        const list = listArray.concat(modifiedArray);

        setListArray(list);
      }



      //console.log(listArray);
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

      if(from == 1){
        for(var i = 0;i < modify.length;i++){
          if(i != modifyId){
            modify[i].status = false;
          }else{
            modify[i].status = true;
          }
        }

        const ModifArray = listArray.concat(modify);
        setListArray(ModifArray);
      }else if(from == 2){

      }else if(from == 10){

        setInterval(function(){
          getDetailData();
        },1000)

      }



    });

    const intervalObservable = ObservableService.subscribeByTimer_10_second().subscribe(data => {
      getDetailData();
    });

    const listenViews = DetailService.listenViews().subscribe(data => {
      console.log(data);
      setViewsCount(data.count);
    });


    //unsubscribe

    return () => {
      listenDetailService.unsubscribe();
      // listenApprove.unsubscribe();
      observable.unsubscribe();
      intervalObservable.unsubscribe();
    }

    //unsubscribe

  }, []);


  useLayoutEffect(() => {
    //initiase functions
    getDetailData();

  }, []);


  const classesh = useStylesh();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 var widthValueFirst = 30 + "%";
 var widthValueSecond = 70 + "%";



  return (

    <div className={classes.root}>
        <Grid container >

          <div className="project_title">
              {LocalizeComponent.request}{ItemData.id}
          </div>

          <div className="project_description">

              {ItemData.description}

          </div>

          <div className="project_double">
              <div className="line1">
                {LocalizeComponent.paid}
              </div>
              <div className="line2">
                {ItemData.sum}
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
              <div className="line4">
                <div>
                  &middot; {LocalizeComponent.tiktok}
                </div>
                <div>
                  &middot; {LocalizeComponent.instagramm}
                </div>
                <div>
                  &middot; {LocalizeComponent.facebook}
                </div>
                <div>
                  &middot; {LocalizeComponent.twitter}
                </div>
              </div>
          </div>

          <div className="list_of_bloggers">
                {LocalizeComponent.list_of_bloggers}
          </div>

          <BlogListComponent items={listArray}/>

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

        </Grid>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
