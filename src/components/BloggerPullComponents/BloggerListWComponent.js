import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import BloggerListViewComponent from '../../components/BloggerPullComponents/BloggerListViewComponent';
import BloggerListViewWhiteComponent from '../../components/BloggerPullComponents/BloggerListViewWhiteComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import LiveService from '../../services/LiveService';
import Observable from '../../services/Observable';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import ConfirmReduxUniversalComponent from '../../helperComponents/ConfirmReduxUniversalComponent';
import { useSelector, useDispatch } from 'react-redux'
import { setList } from '../../features/counter-slice';

import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import HomeService from '../../services/Homeservice';
import { multiSave,openSystemDialog,turnOnCreatorsFormCheckbox,turnOffCreatorsFormCheckbox,redirectToPayment,markListItem } from '../../features/counter-slice';
import MembershipComponent from '../../helperComponents/MembershipComponent';
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
       fontFamily:'Roboto',
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
         fontFamily:'RobotoLight',
       },
       '& input:valid + fieldset': {
         borderColor: '#78D993',
       },
       '& input': {
         backgroundColor: '#2d69f6',
         color:'white',
         borderRadius:'5px',
         fontFamily:'Roboto',
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
   icon: {
     borderRadius: 3,
     width: 20,
     height: 20,
     boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
     backgroundColor: '#f5f8fa',
     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
     '$root.Mui-focusVisible &': {
       outline: '2px auto rgba(19,124,189,.6)',
       outlineOffset: 2,
     },
     'input:hover ~ &': {
       backgroundColor: '#ebf1f5',
     },
     'input:disabled ~ &': {
       boxShadow: 'none',
       background: 'rgba(206,217,224,.5)',
     },
   },
   checkedIcondefault: {
     backgroundColor: '#2d69f6',
     backgroundImage: '#2d69f6',
     '&:before': {
       display: 'block',
       width: 20,
       height: 20,
       backgroundImage:
         "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
         " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
         "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
       content: '""',
     },
     'input:hover ~ &': {
       backgroundColor: '#2d69f6',
     },
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


  const list = useSelector(state => state.counter.bloggerList);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const listenLive = LiveService.listenUserDataTask().subscribe(data => {

      var bloggerList = data.results;

      let oldList = [...list];

      if(bloggerList.length > oldList.length || bloggerList.length < oldList.length){

        for(let i = 0;i < bloggerList.length;i++){

          bloggerList[i].index = i;
          bloggerList[i].checked = false;

          for(let j = 0;j < oldList.length;j++){

            if(oldList[j].checked && oldList[j].id == bloggerList[i].id && j == i){
              bloggerList[i].checked = true;
            }

          }
        }

        dispatch(setList([]));
        dispatch(setList(bloggerList));
      }


    });

    // const obs = Observable.subscribeByTimer_4_second().subscribe(data => {
    //     //LiveService.getTaskData();
    // })



    return () => {
      listenLive.unsubscribe();
      // obs.unsubscribe();
    }
  },[list]);

  useEffect(() => {

    LiveService.getTaskData();

  },[]);


  const { register, handleSubmit, errors,setError } = useForm({
    resolver: yupResolver(schema)
  });

  const getBloggerList = () => {
    let newlist = [...list];
    let array = [];
    for(let i = 0;i < newlist.length;i++){
      if(newlist[i].checked === true){
        array.push(newlist[i]);
      }
    }

    if(array.length > 0){
      return array;
    }else{
      return false;
    }

  }

  const redirect = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.command.redirect);
  const creatorsFromCheckbox = useSelector((state) => state.counter.ConfirmReduxUniversalComponent.command.creatorsFromCheckbox);

  const goToPayment = useCallback(() => {

    return history.push('/payment'), [history]

  });
  const goToLogin = useCallback(() => {

    return history.push('/login'), [history]

  });

  useMemo(() => {
    if(redirect === true){
        if(config.CheckIfAuthorized()){
          goToPayment();
        }else{
          goToLogin();
        }
    }
  },[redirect])
  const onSubmit = ((data) => {

      let creators = getBloggerList();

      let creatorsObj = {
        creators:[],
        automatic:creatorsFromCheckbox
      }

      if(creators != false){
          creatorsObj.creators = creators;
      }else{
        //message user
        if(!creatorsFromCheckbox){
          dispatch(openSystemDialog(1));
          return false;
        }

      }


      dispatch(multiSave({name:"creators",value:JSON.stringify(creatorsObj)}));
      dispatch(multiSave({name:"amount",value:data.sum}));
      dispatch(multiSave({name:"enablelogin",value:1}));
      dispatch(multiSave({name:"promotion",value:1}));



      const FinalLogic = async function(){
         try {

           var finalObject = {
             coord:config.getUserCoordinates(),
             amount:data.sum,//get current system amount
             subscribers:config.getUserItemName("subscribers"),//get current all system subscribers
             url:config.getUserItemName("companyUrl"),
             description:config.getUserItemName("description"),
             companyName:config.getUserItemName("companyName"),
             videourl:config.getUserItemName("video"),
             creators:creators,
             automatic:creatorsFromCheckbox,
             type:3,
           }

           return finalObject;
         }catch (e){
             //handle errors as needed
         }
      };

      FinalLogic().then(response => {
        //console.log(response);
        HomeService.sendApplyData(response);
      })

  });

  const handleChange = (event) => {

    const checked = event.target.checked;
    if(checked){
      dispatch(turnOnCreatorsFormCheckbox());
    }else{
      dispatch(turnOffCreatorsFormCheckbox());
    }

  }

  useEffect(() => {
    //xx
    const firstListener = HomeService.listenApplyData().subscribe(data => {

        if(data.status === "ok"){
            //data.insertId
            console.log(data)
            localStorage.setItem("insertId",data.insertId);
            dispatch(redirectToPayment());

        }
    });
  },[]);


  return (


        <Grid container className="mainListCore_W">

           <div className="titleFrame_W">

              <div className="listFrame">
                  <BloggerListViewWhiteComponent  list={list} />
              </div>


                <div className="centerElements">

                      <div className="creatorBox">

                        <div className="creatorCheckboxFrame">
                          <div className="creatorCheckboxFrameOne">
                            <Checkbox
                                className={classes.root}
                                disableRipple
                                checked={creatorsFromCheckbox}
                                onChange={event => handleChange(event)}
                                color="default"
                                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcondefault)} />}
                                icon={<span className={classes.icon} />}
                                inputProps={{ 'aria-label': 'decorative checkbox' }}
                                {...props}
                              />
                          </div>

                          <div className="creatorCheckboxFrameTwo">
                              <div className="creatorCheckboxFrameTwoText_W">
                                  {LocalizeComponent.dialogDefaultTextCheckbox}
                              </div>
                          </div>

                        </div>


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

           <ConfirmReduxUniversalComponent />
           <MembershipComponent/>

        </Grid>





  );

}



export default BottomFunc;
