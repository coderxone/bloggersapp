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


//xx
  const content = items.map((item,index) =>

    <div key={item.id} className={'FullList ' + item.id} >

          <div className="ItemMainBlock">
            <div className="item_url_name">
              {item.user_email}
            </div>
            <div className="itemType">
              {item.type}
            </div>
          </div>

          <SubComponent condition={item} />

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



//xx
const SubComponent = (props) => {

  var status = props.condition.status;
  var id = props.condition.id;

  var url = props.condition.url;

  const setBan = (id) => {

    var sendObject = {
      from:10
    }
    ObservableService.sendData_subject(sendObject);
    DetailService.setBan(id);

  }

  const View = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }


  return (
    <div className="itemButtons">

       <div className="subComponentDownC">

          <div className="centrDivone" onClick={(e) => setBan(id)}>
              <DoneOutlineIcon className="leftSide"/>
              <div className="rightSide">
                  Ban {LocalizeComponent.ban}
              </div>
          </div>
          <div className="centrDivCopyC" onClick={(e) => View(url)}>
              <VisibilityIcon className="leftSide"/>
              <div className="rightSide">
                  Suggest
              </div>
          </div>
          <div className="centrDivCopyCtree" onClick={(e) => View(url)}>
              <VisibilityIcon className="leftSide"/>
              <div className="rightSide">
                  View
              </div>
          </div>


       </div>

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

//initialize function



//initialize function


const DetailComponent = (props) => {


  //console.log(props.reduxState.reducerStore);

  const locationData = props.location;
  var Project_id = 9999;

  console.log(locationData);

  var blogger_email = "";
  var ItemData = null;


  if(locationData.data){
    blogger_email = locationData.data.user_email;
    Project_id = locationData.data.project_id;
    ItemData = locationData.data;
    localStorage.setItem("blogger_email",blogger_email);
    localStorage.setItem("project_id",Project_id);
    localStorage.setItem("savedItemDataD",JSON.stringify(ItemData));

  }else{
    blogger_email = localStorage.getItem("blogger_email");
    Project_id = localStorage.getItem("project_id");
    ItemData = JSON.stringify(localStorage.getItem("savedItemDataD"));
  }

  console.log(ItemData);


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
      "project_id":Project_id,
      "blogger_email":blogger_email
    }

    //console.log(senddata);

    DetailService.getCheckvideosByUser(senddata);

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

    const listenDetailService = DetailService.listenCheckvideosByUser().subscribe(data => {

      console.log(data);
      //console.log(historyId);
//xx
      if(data.status == "ok"){
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

        // console.log(listArray);
      }



    });

    const listenBan = DetailService.listenBan().subscribe(data => {
      console.log(data);
    });



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
        for(var i = 0;i < modify.length;i++){
          if(i != modifyId){
            modify[i].status = false;
          }else{
            modify[i].status = true;
          }
        }

        const ModifArray = listArrayApprove.concat(modify);
        setListApproveArray(ModifArray);
      }else if(from == 10){

        setInterval(function(){
          getDetailData();
        },1000)

      }



    });

    const intervalObservable = ObservableService.subscribeByTimer_10_second().subscribe(data => {
      getDetailData();
    });




    //unsubscribe

    return () => {
      listenDetailService.unsubscribe();
      listenBan.unsubscribe();
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


  return (

    <div className={classes.root}>
        <Grid container >
          <ListComponent items={listArray}/>
        </Grid>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
