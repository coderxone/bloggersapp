import React, { useCallback,useEffect,useState,useMemo,useRef } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

import '../../css/lastCreatorsPostsComponent.scss';

import Observable from '../../services/Observable';
import BloggerService from '../../services/BloggersService';
import { useSelector, useDispatch } from 'react-redux'
import { SetLastPosts,SetbloggerLastPostsListSkeletonStatus,openMembershipDialog,multiSave } from '../../features/counter-slice';
import Skeleton from '@material-ui/lab/Skeleton';
import MembershipComponent from '../../helperComponents/MembershipComponent';


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

  const checkName = (name) => {

    if(name != 0){
      return name;
    }else{
      return "new blogger";
    }
  }

const RenderList = (props) => {

  const list = props.list;
  const membership = useSelector((state) => state.counter.membership);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkProfile = ((item,membership) => {

    let page = {
      name:'page',
      value:'last-bloggers-posts'
    }

    dispatch(multiSave(page));

    let check = config.CheckIfAuthorized();

    if(check !== false){

        if(membership === true){
          goToProfile(item);
        }else if(membership === false){
          //request membership
          dispatch(openMembershipDialog());

        }

    }else{
      goToLogin();
    }

});

const goToProfile = useCallback((item) => {

    return history.push({pathname: '/explore_profile',data:item}), [history];

});
const goToLogin = useCallback(() => {

    return history.push({pathname: '/login'}), [history];

});

  const finalList = list.map((item) => 

        <div key={item.id} className="gridItem"  onClick={event => checkProfile(item,membership)}>
          <div className="gridSubItem leftRadius"
          style = {{
                    backgroundPosition: "center",
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"cover",
                    background: checkImage(item.image_url)
                  }}>
          </div>
          <div className="gridSubItemDoubleRow rightRadius">
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">{checkName(item.firstName)}</div>
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">{LocalizeComponent.b_posted} {item.postedTime} {LocalizeComponent.b_hours}</div>
          </div>
        </div>

  )


  return (
            <div className="gridMatrix">

              {finalList}

            </div>
  );
}

const RenderSkeletonList = (props) => {

  const list = props.list;

  const finalList = list.map((item) => 

        <div key={item.id} className="gridItem">
          <div className="gridSubItem leftRadius">
              <Skeleton variant="rect" width="100%" height="100%" />
          </div>
          <div className="gridSubItemDoubleRow rightRadius">
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign"><Skeleton variant="text" width="100%" height="100%" /></div>
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign"><Skeleton variant="text" width="100%" height="100%" /></div>
          </div>
        </div>

  )


  return (
            <div className="gridMatrix">

              {finalList}

            </div>
  );
}


const LastCreatorsPostsComponent = (props) => {

  const dispatch = useDispatch();

  const bloggerLastPostsList = useSelector((state) => state.counter.bloggerLastPostsList);
  const bloggerLastPostsListSkeletonStatus = useSelector((state) => state.counter.bloggerLastPostsListSkeletonStatus);

 


    //if current url is main page
    const currentUrl = useMemo(() => {

      let url = window.location.href;
      if(url.indexOf('main') >= 0){
        return true;
      }else{
        return false;
      }

  },[]);

  


  useEffect(() => {

    const listenBloggersData = BloggerService.listencheckLastBloggersPosts().subscribe(data => {

        let lastPorsts = data.data;

        if(currentUrl){
          lastPorsts = lastPorsts.slice(0,5);
        }

        let oldList = [...bloggerLastPostsList];
        dispatch(SetbloggerLastPostsListSkeletonStatus(false));

        if(oldList.length > lastPorsts.length || oldList.length < lastPorsts.length){
          dispatch(SetLastPosts([]));
          dispatch(SetLastPosts(lastPorsts));
        }
    });

    return () => {
      listenBloggersData.unsubscribe();
    }

  },[bloggerLastPostsList]);


  useEffect(() => {
    BloggerService.checkLastBloggersPosts();
  },[])

  useEffect(() => {

    const obs = Observable.subscribeByTimer_30_second().subscribe(data => {
        BloggerService.checkLastBloggersPosts();
        dispatch(SetbloggerLastPostsListSkeletonStatus(true));
    });

    return () => {
      obs.unsubscribe();
    }

  },[]);


  return (

    <div className="BusinessTemplate">

        <div className="gridTitle">
          <div className="gridTitleText">
            {LocalizeComponent.lastCreatorPosts}
          </div>
        </div>

        {
          currentUrl === true && (
            <Link className="gridTitle deleteUrlClass"
              to={{
                pathname: "/last-bloggers-posts"
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
            bloggerLastPostsListSkeletonStatus === false ? (
              <RenderList list={bloggerLastPostsList} />
            ) : (
              <RenderSkeletonList list={bloggerLastPostsList} />
            )
          }

          {
            currentUrl === false && (
              <MembershipComponent/>
            )
          }
          


            

            
        </div>


    </div>


  );

}



export default LastCreatorsPostsComponent;
