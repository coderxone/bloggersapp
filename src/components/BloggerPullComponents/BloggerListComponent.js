import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import BloggerListViewComponent from '../../components/BloggerPullComponents/BloggerListViewComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import LiveService from '../../services/LiveService';
import Observable from '../../services/Observable';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux'
import { multiSave } from '../../features/counter-slice';

import * as yup from "yup";
import TextField from '@material-ui/core/TextField';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");


 const schema = yup.object().shape({
   sum: yup.number().required().positive().integer()
 });

 const CssTextField = withStyles({
   root: {
     '& label.Mui-focused': {
       color: 'white !important',
     },
     '& label': {
       color: 'white !important',
       fontFamily:'Roboto',
     },
     '& .MuiInput-underline:after': {
       borderBottomColor: '#78D993 !important',
     },
     '& .MuiFilledInput-root': {
       '& fieldset': {
         borderColor: '#F9A3BE',
       },
       '&:hover fieldset': {
         borderColor: 'yellow',
       },
       '&.Mui-focused fieldset': {
         borderColor: '#78D993',
       },
       '& input:valid + fieldset': {
         borderColor: '#78D993',
       },
       '& input': {
         backgroundColor: '#1A48A6',
         color:'white',
         borderRadius:'5px',
       },
       '& input:invalid + fieldset': {
         borderColor: '#F9A3BE',
       },

     },
   },
 })(TextField);

 const useStyles = makeStyles((theme) => ({
   root: {
     flexGrow: 1,
     backgroundColor:'transparent',

   },
   rootx: {
     flexGrow: 1,
     backgroundColor:'transparent',
     padding:'0px 2px 0px 2px',

   },
   paper: {
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.secondary,
     backgroundColor:'transparent',
   },
 }));

const BottomFunc = (props) => {


  const [list,setList] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch()

  const checkedUsers = (item) => {

      let newList = [...list];

      let status = newList[item.index].checked;

      if(!status){
        newList[item.index].checked = true;
      }else{
        newList[item.index].checked = false;
      }


      setList(newList);

  }

  useEffect(() => {
    const listenLive = LiveService.listenUserDataTask().subscribe(data => {
      //console.log(data);
      //var bloggerList = data.results.reverse();
      var bloggerList = data.results;

      for(let i = 0;i < bloggerList.length;i++){
        bloggerList[i].checked = false;
        bloggerList[i].index = i;
      }

      setList(bloggerList);
      //LiveService
    });

    // const obs = Observable.subscribeByTimer_4_second().subscribe(data => {
    //     //LiveService.getTaskData();
    // })

    LiveService.getTaskData();

    return () => {
      listenLive.unsubscribe();
      // obs.unsubscribe();
    }
  },[]);


  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = ((data) => {

      dispatch(multiSave({name:"amount",value:data.sum}));
      dispatch(multiSave({name:"enablelogin",value:1}));

  });


  return (


        <Grid container className="mainListCore">
           <div className="titleFrame">
              <div className="titleFrameText">
                  {LocalizeComponent.chooseBlogger}
              </div>
              <BloggerListViewComponent className="listFrame" checkedUsers={item => checkedUsers(item)} list={list}/>

                <div className="centerElements">

                      <div className="creatorBox">

                          <form onSubmit={handleSubmit(onSubmit)}   className={classes.root}>

                            <CssTextField

                              inputRef={register}

                              name="sum"
                              className="secondMargin"
                              id="sum"
                              type="text"
                              min="1"
                              required
                              pattern="[0-9]{1,30}"
                              helperText={errors.sum?.message}
                              variant="filled"
                              label={LocalizeComponent.budget} />


                            <div className="BoxbuttonDiv">
                                  <input  className="CreatorsButtonStyle" type="submit" value={LocalizeComponent.startCompaign}/>
                            </div>
                        </form>

                      </div>
                </div>
           </div>

        </Grid>





  );

}



export default BottomFunc;
