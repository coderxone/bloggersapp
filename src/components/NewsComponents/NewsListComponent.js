import React, { useCallback,useEffect,useMemo } from 'react';
import LocalizeComponent from '../../localize/LocalizeComponent';
import config from '../../config/config';
import {
  Link,useHistory
} from "react-router-dom";

import '../../css/lastCreatorsPostsComponent.scss';

import Observable from '../../services/Observable';
import { useSelector, useDispatch } from 'react-redux'
import { setNewsList,setNewsSkeletonStatus,multiSave,setAdminMode } from '../../features/counter-slice';
import Skeleton from '@material-ui/lab/Skeleton';
import background from '../../images/background.jpeg';
import NewsService from '../../services/NewsService';


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
        let str = "url(" + config.getServerNewsImagePath() + imageUrl + ") no-repeat center/cover";
        return str;
      }

    }
  }


const RenderList = (props) => {

  const list = props.list;
  const adminMode = useSelector((state) => state.counter.adminMode);
  const dispatch = useDispatch();
  const history = useHistory();
  
const goToNewsPage = useCallback((item) => {

    let page = {
      name:'page',
      value:'last-news'
    }

    dispatch(multiSave(page));

    return history.push({pathname: '/' + item.url + '/' + item.id}), [history];

});

  const finalList = list.map((item) => 

        <Link key={item.id} className="gridItem"  onClick={event => goToNewsPage(item)}
          to={{
            pathname: '/' + item.url + '/' + item.id
          }}
        >
          <div className="gridSubItem leftRadius"
          style = {{
                    backgroundPosition: "center",
                    backgroundRepeat:"no-repeat",
                    backgroundSize:"cover",
                    background: checkImage(item.image)
                  }}>
          </div>
          <div className="gridSubItemDoubleRow rightRadius">
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">{item.title}</div>
                <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">{LocalizeComponent.b_posted} {item.postedTime} {LocalizeComponent.b_hours}</div>
          </div>
        </Link>

  )


  const createNewAds = () => {
    NewsService.addNews();
  }





  return (
            <div className="gridMatrix">

              {
                  adminMode && (
                    <div className="gridItem"  onClick={event => createNewAds()}>
                    <div className="gridSubItem leftRadius"
                    style = {{
                              backgroundPosition: "center",
                              backgroundRepeat:"no-repeat",
                              backgroundSize:"cover",
                              background: "url(" + background + ") no-repeat center/cover"
                            }}>
                    </div>
                    <div className="gridSubItemDoubleRow rightRadius">
                          <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextEndAlign">Add Article</div>
                          <div className="gridSubItemDoubleRowText gridSubItemDoubleRowTextStartAlign">now</div>
                    </div>
                  </div>
                  )
              }

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
  const history = useHistory();
  const latestNews = useSelector((state) => state.counter.latestNews);
  const latestNewsStatus = useSelector((state) => state.counter.latestNewsStatus);

 


    //if current url is main page
    const currentUrl = useMemo(() => {

        let url = window.location.href;
        if(url.indexOf('main') >= 0){
          return true;
        }else{
          return false;
        }

    },[]);



  const goNewAds = useCallback((id) => {

        return history.push({pathname: '/create-news/' + id}), [history];

    });

  


  useEffect(() => {

    const listenBloggersData = NewsService.listenGetNews().subscribe(data => {

        let lastNews = data.data;

        if(currentUrl){
          lastNews = lastNews.slice(0,5);
        }

        let oldList = [...latestNews];
        dispatch(setNewsSkeletonStatus(false));

        if(oldList.length > lastNews.length || oldList.length < lastNews.length){

          lastNews = config.convertTitlesToURL(lastNews);
          dispatch(setNewsList([]));
          dispatch(setNewsList(lastNews));
        }
    });

    return () => {
      listenBloggersData.unsubscribe();
    }

  },[latestNews]);


  useEffect(() => {
    NewsService.getNews();

    //set admin mode
    const checkAdminPermit = config.checkAdminAuthorization(3);
    if(checkAdminPermit){
        dispatch(setAdminMode(true));
    }
    //set admin mode

    //listen new ads
    let newsUnsub = NewsService.listenAddNews().subscribe(data => {
        if(data.status === "ok"){
            goNewAds(data.id);
        }
    })
    //listen new ads
    return () => {
        newsUnsub.unsubscribe();
    }
  },[])

  useEffect(() => {

    const obs = Observable.subscribeByTimer_30_second().subscribe(data => {
        NewsService.getNews();
        dispatch(setNewsSkeletonStatus(true));
    });

    return () => {
      obs.unsubscribe();
    }

  },[]);


  return (

    <div className="BusinessTemplate">

        <div className="gridTitle">
          <div className="gridTitleText">
            {LocalizeComponent.latestNews}
          </div>
        </div>

        {
          currentUrl === true && (
            <Link className="gridTitle deleteUrlClass"
              to={{
                pathname: "/latest-news"
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
            latestNewsStatus === false ? (
              <RenderList list={latestNews} />
            ) : (
              <RenderSkeletonList list={latestNews} />
            )
          }

          
            
        </div>


    </div>


  );

}



export default LastCreatorsPostsComponent;
