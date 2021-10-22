import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

import '../../css/BloggerListWhiteComponent.scss';
import BloggerService from '../../services/BloggersService';
 //LocalizeComponent.setLanguage("ru");

 import { useSelector, useDispatch } from 'react-redux'
 import { SetBusinessOrdersList,SwitchBusinessOrdersSkeletonStatus,multiSave,openMembershipDialog } from '../../features/counter-slice'
 import Observable from '../../services/Observable';
 import Skeleton from '@material-ui/lab/Skeleton';

import MembershipComponent from '../../helperComponents/MembershipComponent';



const ListSkeletonMatrix = ((props) => {


  let colorIndex = 0;
  let colorArray = ["#FFA24D","#78D993","#F9A3BE"];

  const colorTracker = () => {
      if(colorIndex > 2){
        colorIndex = 0;
      }

      let item = colorArray[colorIndex];
      colorIndex++;
      return item;
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


  const list = props.list;

  const iterList = list.map((item,index) =>

      <div key={index} className="gridItem">
            <div className="gridSubItem leftRadius" >
                    <Skeleton variant="rect" width="100%" height="100%" />
            </div>
            <div className="gridSubItem rightRadius">
                  <Skeleton variant="text" width="100%" height="100%" />
            </div>
      </div>

  );


  return (
    <div className="gridMatrix">
        {iterList}
    </div>
  );




});


const ListMatrix = ((props) => {


  let colorIndex = 0;
  let colorArray = ["#FFA24D","#78D993","#F9A3BE"];
  const dispatch = useDispatch();
  const history = useHistory();

  const colorTracker = () => {
      if(colorIndex > 2){
        colorIndex = 0;
      }

      let item = colorArray[colorIndex];
      colorIndex++;
      return item;
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


  const goToLogin = useCallback(() => {

      return history.push({pathname: '/login'}), [history];

  });

  const GoToDetailM1 = useCallback((item) => {
      return history.push({pathname: '/mdetail',data:item}), [history];
  });
  const GoToDetailM2 = useCallback((item) => {
      return history.push({pathname: '/detail',data:item}), [history];
  });

  const membership = useSelector((state) => state.counter.membership);

  const checkProfile = ((item) => {

      let page = {
        name:'page',
        value:'bloggerDashboard'
      }

      dispatch(multiSave(page));

      let check = config.CheckIfAuthorized();

      if(check !== false){

              if(membership === true){
                //console.log(item)
                if(item.type === 1){
                  GoToDetailM1(item);
                }else if(item.type === 2){
                  GoToDetailM2(item);
                }
                //goToBusinessDetail(item);
                //go to business detail page
              }else if(membership === false){
                //request membership
                dispatch(openMembershipDialog());

              }

      }else{
        goToLogin();
      }

  });


  const list = props.list;

  const iterList = list.map((item,index) =>

      <div key={index} className="gridItem" onClick={event => checkProfile(item) }>
            <div className="gridSubItem leftRadius"
            style = {{
                      backgroundPosition: "center",
                      backgroundRepeat:"no-repeat",
                      backgroundSize:"cover",
                      background: checkImage(item.image_url)
                    }}>
            </div>
            <div className="gridSubItem rightRadius">
                  <div className="gridSubItemBlockText">{item.companyName}</div>
            </div>
      </div>

  );


  return (
    <div className="gridMatrix">
        {iterList}
    </div>
  );




});


const BloggerListWhiteComponent = (props) => {

  const list = useSelector((state) => state.counter.businessOrders);
  const dispatch = useDispatch();

  //if current url is main page
  const currentUrl = useMemo(() => {

      let url = window.location.href;
      if(url.indexOf('main') >= 0){
        return true;
      }else{
        return false;
      }

  },[]);


  const businessOrdersSkeletonStatus = useSelector(state => state.counter.businessOrdersSkeletonStatus);


  useEffect(() => {

    let request = BloggerService.listengetAllDataBusinessOrders().subscribe(data => {

      let businessOrders = data.sdata;

      if(currentUrl){
        businessOrders = businessOrders.slice(0,5);
      }

      let oldList = [...list];
      dispatch(SwitchBusinessOrdersSkeletonStatus(false));

      if(oldList.length > businessOrders.length || oldList.length < businessOrders.length){
        dispatch(SetBusinessOrdersList([]));
        dispatch(SetBusinessOrdersList(businessOrders));
      }

    });

    BloggerService.setAllDataBusinessOrders();

    return () => {
      request.unsubscribe();
    }

  },[list]);


  useEffect(() => {


    const obs = Observable.subscribeByTimer_30_second().subscribe(data => {
        BloggerService.setAllDataBusinessOrders();
        dispatch(SwitchBusinessOrdersSkeletonStatus(true));
    });

    return () => {
      obs.unsubscribe();
    }

  },[]);


  return (

    <div className="BusinessTemplate ">

        <div className="gridTitle">
          <div className="gridTitleText">
            {LocalizeComponent.lastBusinessPost}
          </div>
        </div>

        <div className="gridTitle">
          <div className="gridSmallText">
            {LocalizeComponent.postearnMoney}
          </div>
        </div>

        {
          currentUrl === true && (
            <Link className="gridTitle deleteUrlClass"
              to={{
                pathname: "/business-orders-for-bloggers"
              }}
              >
              <div className="fullView">
                <div className="fullViewText">
                  {LocalizeComponent.fullView}
                </div>
              </div>
            </Link>
            
          )
        }

        <div className="gridFrame">
          {
            businessOrdersSkeletonStatus === false ? (
              <ListMatrix list={list} />
            ) : (
              <ListSkeletonMatrix list={list} />
            )
          }

        </div>

        {
          businessOrdersSkeletonStatus
        }

        {
          currentUrl === false && (
            <MembershipComponent/>
          )
        }


    </div>


  );

}



export default BloggerListWhiteComponent;
