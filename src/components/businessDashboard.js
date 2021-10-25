import React, {useState,useEffect,useMemo,useCallback} from 'react';
import MenuComponent from '../components/MenuComponents/MenuComponent';
// import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider } from '@ionic/react';
import '../css/businessDashboard.scss';
import LocalizeComponent from '../localize/LocalizeComponent';
import BusinesService from '../services/BusinessService';
import Observable from '../services/Observable';
import ConfirmDialogComponent from '../helperComponents/ConfirmDialogComponent';
import {
  makeStyles,
} from '@material-ui/core/styles';

import { connect } from 'react-redux';
import AuthService from '../services/AuthService';
import HomeService from '../services/Homeservice';




import config from '../config/config.js';

import {
  Link,useHistory,
} from "react-router-dom";

import { useDispatch } from 'react-redux'
import {activateBusinessMenu} from '../features/counter-slice';




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




const BlockComponent = (props) => {

  const items = props.items;

  //console.log(items)

  const routePath = (item) => {
    if(item.type === 1){
      return "/mdetail";
    }else{
      return "/detail";
    }
  }

  const content = useMemo(() => {

    return items.map((item,index) =>

      <Link key={item.id} className="deleteUrlClass"
          to={{
            pathname: routePath(item),
            data: item // your data array of objects
          }}
          >
            <div  className="MainBlock withoutScroll">
              <div  className="firstLevelG">
                  <div className="firstLevelText">
                      {item.url} - {item.description}
                  </div>
              </div>
              <div className="BlockDividerTinLine"></div>
              <div className="secondLevelG">
                <div className="secondLevelShare">
                  <div className="secondLevelOne">
                    <div className="shouldButtonG">
                        <div className="shouldButtonTextG">
                              limit: {item.peoplecount} infl.
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelTwo">

                  </div>
                </div>
                <div className="secondLevelShareThree">
                  <div className="secondLevelThree">
                    <div className="shouldButtonThreeG">
                        <div className="shouldButtonTextG">
                              {item.date} - {item.time}
                        </div>
                    </div>
                  </div>
                  <div className="secondLevelThreeTwo">
                    <div className="shareButtonThree">
                        <div className="shareButtonText">
                              {item.sum} $
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </Link>

      );

  },[props.items]);



  return (
    <div className="fullWidth withoutScroll" >
      {content}
    </div>
  );

}




const BusinessDashboard = (props) => {

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);


  var obj = {
    email:""
  };


  const [storageData,setStorageData] = useState(obj);



  const [ listArray, setListArray ] = useState([]);

  useEffect(() => {

    const businessConst = BusinesService.listenBusinessCore().subscribe(data => {


      const NewlistArrays = listArray.slice();

      if(data.sdata.length > NewlistArrays.length){

        for(var i = 0;i < data.sdata.length;i++){
            var f = 0;
            for(var j = 0;j < NewlistArrays.length;j++){
              if(NewlistArrays[j].id == data.sdata[i].id){
                f = 1;
              }
            }

            if(f == 0){

              NewlistArrays.push(data.sdata[i]);
            }

        }
      }else if(NewlistArrays > data.sdata){
        setListArray([]);
        setListArray(data.sdata);
      }



      setListArray(NewlistArrays);


    });


    return () => {
      businessConst.unsubscribe();
    }

    //unsubscribe

  }, [listArray]);

  useEffect(() => {
    BusinesService.getBusinessData();
    BusinesService.RequestCheckTasks();
    config.checkUserAuthorization(2);
  },[])


  const history = useHistory();


  //notification part

  const goToContacts = useCallback((Contacts) => {

      return history.push({pathname: '/contactlist'}), [history];

  });
//xx
  const goToTaskIdPage = useCallback(() => {

      var findItem = {};
      var newList = [...listArray];
      for(var i = 0;i < newList.length;i++){
        if(newList[i].id == detailProjectId){
          //console.log(newList[i]);
          findItem = newList[i];
        }
      }
      //return false;
      return history.push({pathname: '/detail',data: findItem}), [history];

  });



const [dialogSwitcher,SetdialogSwitcher] = useState(0);

  useEffect(() => {
    const DialogNotif = Observable.getData_subject().subscribe(data => {

      if(dialogSwitcher == 0){
        if(data == "confirm"){
          goToContacts();
          //go to page with id
        }else if(data == "cancel"){
          setDialogStatus(false);
        }
      }else if(dialogSwitcher == 1){
        if(data == "confirm"){
//xx
          goToTaskIdPage();
          //go to page with id
        }else if(data == "cancel"){
          setDialogStatus(false);
        }
      }


    });

    return () => {
      DialogNotif.unsubscribe();
    }
  },[dialogSwitcher]);

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
            setDetailProjectId(data.result[0].task_id);
            SetdialogSwitcher(1);
            setDetailMessage(data.PleaseCheckThisTask);
            setDialogStatus(true);
            HomeService.notificationVoice();

            localStorage.setItem("taskCount",count);

          }

          localStorage.setItem("taskId",task_id);

  }

  useEffect(() => {

    const DialogExecute = Observable.getData_subjectDialog().subscribe(data => {
      if(data.alert == "opendialog"){
      //  console.log(data);
        setLeftbutton(LocalizeComponent.cancel);
        setRightbutton(LocalizeComponent.check);
        setDialogText(LocalizeComponent.dialogCheckMessage);
        setDetailProjectId(data.projectId);
        SetdialogSwitcher(2);
        setDetailMessage(data.message);
        setDialogStatus(true);
        HomeService.notificationVoice();
        //go to page with id
      }

    });

    //done tasks from each enfluencer
    const ListenCheckTasks = BusinesService.ListenCheckTasks().subscribe(data => {

      //console.log(data);
      if(data.status == "ok"){

        OneTimeNotification(data);


      }else{
        localStorage.setItem("taskCount",0);
      }

    });

    const timer10s = Observable.subscribeByTimer_10_second().subscribe(data => {
      BusinesService.RequestCheckTasks();
    });

    dispatch(activateBusinessMenu());

    return () => {
      ListenCheckTasks.unsubscribe();
      DialogExecute.unsubscribe();
      timer10s.unsubscribe();
    }
  },[])



  const [dialogStatus,setDialogStatus] = useState(false);
  const [leftbutton,setLeftbutton] = useState('');
  const [rightbutton,setRightbutton] = useState('');
  const [dialogText,setDialogText] = useState('');
  const [detailProjectId,setDetailProjectId] = useState(0);

  const [detailMessage,setDetailMessage] = useState("");



  return (

    <div id="opacityControl">
      <MenuComponent />

        <div className="projectContainer">
          <BlockComponent items={listArray}/>
          <ConfirmDialogComponent status={dialogStatus} left={leftbutton} right={rightbutton} text={dialogText}/>
        </div>

    </div>


  );
};


 export default connect()(BusinessDashboard);
