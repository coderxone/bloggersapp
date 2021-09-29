import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../../config/config';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import '../../../components/BloggerPullComponents/BloggerListComponent.css';
import { useSelector, useDispatch } from 'react-redux'
import { multiSave,getMultiSave } from '../../../features/counter-slice';
import { openMembershipDialog,markListItem } from '../../../features/counter-slice';
import Skeleton from '@material-ui/lab/Skeleton';

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
            <StarIcon className={"creatorsStar blueColorStatus"} />
          ) : (
            <StarBorderIcon className={"creatorsStar blueColorStatus"} />
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

    let list = props.list;

    const history = useHistory();

    const eliotIco = "no-image.png";

    const [messageCount,setMessageCount] = useState(3);
    const [online,setOnline] = useState(1);



      const membership = useSelector((state) => state.counter.membership);



    const ListConst = list.map((item,index) =>

          <div

           key={item.id} className="mainListS_W deleteUrlClass">
            <div className="pleftBlockS">
              <div className="pleftBlockOneTwo">
                  <Skeleton variant="rect" width="100%" height="100%" />
              </div>
              <div className="pleftBlockTwo">


              </div>
            </div>
            <div className="prightBlock">
              <div className="prightBlockOne" >
                <div className="prightBlockOneTwo">
                  <div className="prightBlockOneTwoTextTwo_W">
                    <Skeleton variant="text" width="100%" height="100%" />
                  </div>
                </div>
                <div className="prightBlockOneThree">
                  <div className="prightBlockOneThreeText">

                  </div>
                </div>
              </div>

              <div className="prightBlockTwo">
                <div className="prightBlockTwoOneTwo">
                  <div className="prightBlockTwoOneText_W">
                    <Skeleton variant="text" width="100%" height="100%" />
                  </div>
                  <div className="prightBlockTwoOneSecond">

                    <Skeleton variant="text" width="100%" height="100%" />

                  </div>

                </div>

                  <div className="prightBlockTwoTwoS">

                  </div>


              </div>


            </div>
        </div>

    );


    return ListConst;


  });





export default MapList;
