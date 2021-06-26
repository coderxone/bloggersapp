import React, {useState,useEffect,useMemo,useRef,useLayoutEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import BusinessPoster from '../../images/businessPoster.png';
import TaskPushModelOne from '../../components/BloggerDashboardComponents/TaskPushModelOne';
import { multiSave } from '../../actions/actions';
import {
  Link,
} from "react-router-dom";


const mapStateToProps = (state) => {
  return {
      somethingFromStore: state.somethingFromStore
  }
}

const VideoComponent = (props) => {




  const stateFromprops = props.somethingFromStore;
  const item = props.item;
  const status = props.status;
  const [containerStyle,SetContainerStyle] = useState({width: '100%',height: '90vh'});
  const playVideo = useRef(null);
  const [playState,SetPlayState] = useState(0);
  const timerVariable = props.timerVariable;
  const timerCircleVariable = props.timerCircleVariable;


  const Start = () => {
    if(playState === 0){
      playVideo.current.play();
      SetPlayState(1);
    }else{
      SetPlayState(0);
      playVideo.current.pause();
    }
  }

  useMemo(() => {
    if(status === false){
      const newContainerStyletwo = {...containerStyle};
      newContainerStyletwo.height = '95vh';
      SetContainerStyle(newContainerStyletwo);
    }else if(status === true){
      const newContainerStyleOne = {...containerStyle};
      var height = window.innerHeight;
      if((height >= 920) && (height < 1000)){
        newContainerStyleOne.height = '58vh';
      }else if((height >= 892) && (height < 920)){
        newContainerStyleOne.height = '58vh';
      }else if((height >= 850) && (height < 892)){
        newContainerStyleOne.height = '55vh';
      }else if((height >= 830) && (height < 850)){
        newContainerStyleOne.height = '55vh';
      }else if((height >= 800) && (height < 830)){
        newContainerStyleOne.height = '55vh';
      }else{
        newContainerStyleOne.height = '45vh';
      }
      //console.log(window.innerHeight);//892

      SetContainerStyle(newContainerStyleOne);
    }
  },[status]);





  return (


      <div className="model1PushRoot" id="automaticScroll">

        <div className="PushVideoStyles" onClick={Start}>
          <video width="100%" ref={playVideo} src="https://echohub.io/videos/EchohubForbusiness.mp4"  poster={BusinessPoster} type="video/mp4"/>
        </div>
        <TaskPushModelOne item={item}  status={status} timerVariable={timerVariable} timerCircleVariable={timerCircleVariable} />

    
      </div>

  );
};


 export default connect(mapStateToProps)(VideoComponent);
