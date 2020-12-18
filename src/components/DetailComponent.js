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






const ListComponent = (props) => {

  const classestree = useStylesthree();

  var statusArray = new Array(4);



  const [secondary, setSecondary] = React.useState(false);

  const items = props.items;

  if(!items){
    return false;
  }

  const handleInsideComponent = (item_id,items) => {

    items[item_id].status = true;
    var sendObject = {
      id:item_id,
      items:items
    }
    ObservableService.sendData_subject(sendObject);

  }


//xx

  const content = items.map((item,index) =>

    <div key={item.id} onClick={(e) => handleInsideComponent(index,items)}>

        <ListItem>
          <ListItemText
            primary={item.url}
            secondary={secondary ? 'Secondary text' : null}
          />


          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              {item.status === false ? (
                <ExpandLessIcon />
               ) : (
                 <ExpandMoreIcon/>
               )}

            </IconButton>
          </ListItemSecondaryAction>

        </ListItem>
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

//xx
const SubComponent = (props) => {

  var status = props.condition.status;
  var url = props.condition.url;

  return (
    <div>

    {status === false ? (
       <div>

       </div>
     ) : (
       <div className="subComponentDown">

          <div className="centrDiv">
              <DoneOutlineIcon className="leftSide"/>
              <div className="rightSide">
                  Approve
              </div>
          </div>
          <div className="centrDivCopy">
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
    padding = 2;
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


  console.log(props.reduxState.reducerStore);

  const locationData = props.location;

  var checkDetailId = 0;

  if(locationData.data){
    checkDetailId = locationData.data.id;
    localStorage.setItem("savedId",checkDetailId);

  }else{
    checkDetailId = localStorage.getItem("savedId");
  }





  console.log(locationData);

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

  }





  const onSubmit = ((data) => {


      setStorageData(prevState => {
          return obj.email = data.email;
      });


  });

  const [ listArray, setListArray ] = useState([]);

  useEffect(() => {

    const listenDetailService = DetailService.listenDetailData().subscribe(data => {

      console.log(data);

      var modifiedArray = data.data;

      for(var i = 0;i < modifiedArray.length;i++){
        modifiedArray[i].status = false;
      }

      const list = listArray.concat(modifiedArray);

      setListArray(list);

    });

    const observable = ObservableService.getData_subject().subscribe(data => {

      var modify = data.items;
      var modifyId = data.id;

      for(var i = 0;i < modify.length;i++){
        if(i != modifyId){
          modify[i].status = false;
        }else{
          modify[i].status = true;
        }
      }

      const ModifArray = listArray.concat(modify);
      setListArray(ModifArray);

    });


    //unsubscribe

    return () => {
      listenDetailService.unsubscribe();
      observable.unsubscribe();
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
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
            >
            <Tab label="For Review" {...a11yProps(0)} />
            <Tab label="Approved" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ListComponent items={listArray}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            odobreno
        </TabPanel>

    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
