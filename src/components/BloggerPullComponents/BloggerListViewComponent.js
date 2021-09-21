import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import '../../components/BloggerPullComponents/BloggerListComponent.css';
import { useSelector, useDispatch } from 'react-redux'
import { multiSave,getMultiSave } from '../../features/counter-slice';
import { openMembershipDialog } from '../../features/counter-slice';



import {
  Link,useHistory
} from "react-router-dom";

 //LocalizeComponent.setLanguage("ru");

 const useStyles = makeStyles({
   root: {
     '&:hover': {
       backgroundColor: 'transparent',
     },
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
     backgroundColor: '#1A48A6',
     backgroundImage: '#1A48A6',
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
       backgroundColor: '#1A48A6',
     },
   },
   checkedIcon0: {
     backgroundColor: '#ff8f28',
     backgroundImage: '#ff8f28',
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
       backgroundColor: '#FFA24D',
     },
   },
   checkedIcon1: {
     backgroundColor: '#78D993',
     backgroundImage: '#78D993',
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
       backgroundColor: '#78D993',
     },
   },
   checkedIcon2: {
     backgroundColor: '#F9A3BE',
     backgroundImage: '#F9A3BE',
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
       backgroundColor: '#F9A3BE',
     },
   },
 });



const StarBuilder = (props) => {

    let starRate = props.rate;

    const starCount = new Array(5).fill(0);

    const rateList = starCount.map((item,index) =>

        <div key={index}>
        {
          index < starRate ? (
            <StarIcon className={"creatorsStar yellowColorStatus"} />
          ) : (
            <StarBorderIcon className={"creatorsStar yellowColorStatus"} />
          )
        }
        </div>


    )


    return (
      <div className="creatorStarDiv">

          {rateList}

      </div>
    )

}


const MapList = ((props) => {




  const dispatch = useDispatch()

    const classes = useStyles();

    const list = props.list;

    const history = useHistory();

    const handleChange = (event,item,index) => {

      let checked = event.target.checked;
      item.index = index;
      const {checkedusers} = props;
      checkedusers(item);
      //console.log(checked,item.id);
    }
    //console.log(list)

    const eliotIco = "no-image.png";

    const [messageCount,setMessageCount] = useState(3);
    const [online,setOnline] = useState(1);
    var contactObj = {
      name:"testName",
      date:"someDate",
      message:"newMessage",
      count:3

    }
    const [contact,setContact] = useState(contactObj);

    let colorIndex = 0;
    let colorArray = ["#FFA24D","#78D993","#F9A3BE"];
    let colorCheckboxClasses = [classes.checkedIcon0,classes.checkedIcon1,classes.checkedIcon2,classes.checkedIcondefault];

    const colorTracker = () => {
        if(colorIndex > 2){
          colorIndex = 0;
        }

        let item = colorArray[colorIndex];
        colorIndex++;
        return item;
    }

    let classColorIndex = 0;
    const colorClassTracker = (imageUrl) => {

      if(imageUrl.indexOf('graph') >= 0){

        return colorCheckboxClasses[3];

      }else{
        if(imageUrl == 0 || imageUrl == "no-image.png"){

            let returnClass = colorCheckboxClasses[classColorIndex];
            classColorIndex++;
            if(classColorIndex > 2){
              classColorIndex = 0;
            }
            return returnClass;

        }else{
          return colorCheckboxClasses[3];
        }

      }



    }

    const checkImage = (imageUrl) => {

      if(imageUrl.indexOf('graph') >= 0){

        let str = "url(" + imageUrl + ") no-repeat center/cover";
        return str;
      }else{
        if(imageUrl == 0 || imageUrl == "no-image.png"){
            let str = colorTracker();
            return str;
        }else{
          let str = "url(" + config.getServerImagePath() + imageUrl + ") no-repeat center/cover";
          return str;
        }

      }
    }

    const checkCountry = (country) => {
      if(country != 0){
        return country;
      }else{
        return "US";
      }
    }

    const checkName = (name) => {

      if(name != 0){
        return name;
      }else{
        return "new blogger";
      }
    }

      const membership = useSelector((state) => state.counter.membership);



      const checkProfile = ((item,membership) => {

          let page = {
            name:'page',
            value:'explore_profile'
          }

          dispatch(multiSave(page));

          let check = config.CheckIfAuthorized();

          if(check !== false){

              if(membership === true){
                goToProfile(item,membership);
              }else if(membership === false){
                //request membership
                dispatch(openMembershipDialog());

              }

          }else{
            goToLogin();
          }

      });

      const goToProfile = useCallback((item,membership) => {

          return history.push({pathname: '/explore_profile',data:item}), [history];

      });
      const goToLogin = useCallback(() => {

          return history.push({pathname: '/login'}), [history];

      });





    const ListConst = list.map((item,index) =>

          <div

           key={item.id} className="mainListS deleteUrlClass">
            <div className="pleftBlockS">
              <div style = {{ backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: checkImage(item.image_url) }  } className="pleftBlockOneTwo"></div>
              <div className="pleftBlockTwo">
              {item.online == 1 ? (
                    <FiberManualRecordIcon className="mysizes "/>
               ) : (
                    <FiberManualRecordIcon className="mysize-offlines"/>
               )}

              </div>
            </div>
            <div className="prightBlock">
              <div className="prightBlockOne" >
                <div className="prightBlockOneTwo" onClick={event => checkProfile(item,membership)}>
                  <div className="prightBlockOneTwoTextTwo">
                    {checkName(item.firstName)}
                  </div>
                </div>
                <div className="prightBlockOneThree">
                  <div className="prightBlockOneThreeText">

                  </div>
                </div>
              </div>

              <div className="prightBlockTwo">
                <div className="prightBlockTwoOneTwo">
                  <div className="prightBlockTwoOneText">
                    {checkCountry(item.country)}
                  </div>
                  <div className="prightBlockTwoOneSecond">

                    <StarBuilder rate={item.raiting_stars} />

                  </div>

                </div>

                  <div className="prightBlockTwoTwoS">
                    <Checkbox
                        className={classes.root}
                        disableRipple
                        checked={item.checked}
                        onChange={event => handleChange(event,item,index)}
                        color="default"
                        checkedIcon={<span className={clsx(classes.icon, colorClassTracker(item.image_url))} />}
                        icon={<span className={classes.icon} />}
                        inputProps={{ 'aria-label': 'decorative checkbox' }}
                        {...props}
                      />
                  </div>


              </div>


            </div>
        </div>

    );


    return ListConst;



  });





export default MapList;
