import React, {useState,useEffect,useMemo} from 'react';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/detailComponent.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
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
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import List from '@material-ui/core/List';
import GoBackComponent from '../helperComponents/goBackAbsoluteComponent';
import PropTypes from 'prop-types';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';

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
    backgroundColor:'#transparent',
    color:'white',
  },
  paper: {
    padding: theme.spacing(1),
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



const ErrorDiv = (props) => {
  //console.log(props);
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

  const projectId = props.projectId;
  const classestree = useStylesthree();

  var statusArray = new Array(4);

  const [secondary, setSecondary] = React.useState(false);

  const items = props.items;

  if(!items){
    return false;
  }



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

          <SubComponent condition={item} projectId={projectId} />

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
  var projectId = props.projectId;
  var email = props.condition.user_email;

  var url = props.condition.url;

  const setBan = (id) => {

    var sendObject = {
      from:10,
      id:id
    }
    ObservableService.sendData_subject(sendObject);



    //DetailService.setBan(id);

  }

  const View = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const Suggest = (projectid,email) => {
    console.log(projectid);
    console.log(email);
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
          <Link className="centrDivCopyC deleteUrlClass"
            to={{
              pathname: "/suggest",
              projectId: projectId, // your data array of objects
              email: email, // your data array of objects
            }}
          >
          <VisibilityIcon className="leftSide"/>
          <div className="rightSide">
              Suggest
          </div>
        </Link>

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

  var blogger_email = useMemo(() => {

    if(locationData.data){
      localStorage.setItem("blogger_email",locationData.data.user_email);
      return locationData.data.user_email;
    }else{
      return localStorage.getItem("blogger_email");
    }

  },[]);

  var Project_id = useMemo(() => {

    if(locationData.data){
      localStorage.setItem("project_id",locationData.data.project_id);
      return locationData.data.project_id;
    }else{
      return localStorage.getItem("project_id");
    }

  },[]);

  var ItemData = useMemo(() => {

    if(locationData.data){
      localStorage.setItem("savedItemDataD",JSON.stringify(locationData.data));
      return locationData.data;
    }else{
      return JSON.stringify(localStorage.getItem("savedItemDataD"));
    }

  },[]);

  const [dialogStatus,setDialogStatus] = useState(false);
  const [dialogText,setDialogText] = useState("text");
  const [dialogLeft,setDialogLeft] = useState("text");
  const [dialogRight,setDialogRight] = useState("text");


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
  const [banId,setBanId] = useState(0);

  useEffect(() => {
    const listenDetailService = DetailService.listenCheckvideosByUser().subscribe(data => {

      //console.log(data);
      //console.log(historyId);
//xx


      if(data.status == "ok"){

            var modifiedArray = data.data;

            const newArray = [...listArray];


            if(modifiedArray.length > newArray.length){

                for(var b = 0;b < modifiedArray.length;b++){
                  var found = 0;

                  for(var  i = 0;i < newArray.length;i++){
                    if(newArray[i].id == modifiedArray[b].id){
                      found = 1;
                    }
                  }

                  if(found == 0){
                    newArray.push(modifiedArray[b]);
                  }

                }

                setListArray(newArray);

            }else if(modifiedArray.length < newArray.length){


              setListArray([]);

              for(var j = 0;j < modifiedArray.length;j++){
                newArray.push(modifiedArray[j]);
              }

              setListArray(newArray);
            }

      }else if(data.status == "false"){
          setListArray([]);
      }



    });

    return () => {
      listenDetailService.unsubscribe();
    }
  },[listArray])

  useEffect(() => {

    const listenBan = DetailService.listenBan().subscribe(data => {

      if(data.status == "ok"){
        setDialogStatus(false);
      }
      setInterval(function(){
        getDetailData();
      },1500)

    });



    const observable = ObservableService.getData_subject().subscribe(data => {

      var from = data.from;
      var id = data.id;

      if(from == 10){

        setBanId(id);
        setDialogText(LocalizeComponent.continue);
        setDialogLeft(LocalizeComponent.no);
        setDialogRight(LocalizeComponent.yes);
        setDialogStatus(true);
        // setInterval(function(){
        //   getDetailData();
        // },1000)

      }



    });

    const intervalObservable = ObservableService.subscribeByTimer_5_second().subscribe(data => {
      getDetailData();
    });




    //unsubscribe

    return () => {

      listenBan.unsubscribe();
      observable.unsubscribe();
      intervalObservable.unsubscribe();
    }

    //unsubscribe

  }, []);


  useEffect(() => {

    const observ = ObservableService.getData_subject().subscribe((data) => {
      if(data == "cancel"){
        //console.log("cancel");
        setDialogStatus(false);
      }else if(data == "confirm"){
//xx
          //console.log(banId);
          DetailService.setBan(banId);

      }
    });

    return () => {
      observ.unsubscribe();
    }


  }, [banId]);


  useEffect(() => {

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
          <ConfirmDialogComponent  status={dialogStatus} text={dialogText} left={dialogLeft} right={dialogRight}/>
          <GoBackComponent center={LocalizeComponent.Offers}/>
          <ListComponent items={listArray} projectId={Project_id}/>
        </Grid>
    </div>


  );
};


 export default connect(mapStateToProps,mapDispatchToProps)(DetailComponent);
