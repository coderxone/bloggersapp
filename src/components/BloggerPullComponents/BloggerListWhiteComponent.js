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
 import { SetBusinessOrdersList } from '../../features/counter-slice'



const ListMatrix = ((props) => {


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



  useEffect(() => {

    let request = BloggerService.listengetAllDataBusinessOrders().subscribe(data => {

      let businessOrders = data.sdata;

      let oldList = [...list];

      if(oldList.length > businessOrders.length || oldList.length < businessOrders.length){
        dispatch(SetBusinessOrdersList([]));
        dispatch(SetBusinessOrdersList(businessOrders));
        console.log(businessOrders)
      }

    });

    BloggerService.setAllDataBusinessOrders();

    return () => {
      request.unsubscribe();
    }

  },[list]);


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

        <div className="gridTitle">
          <div className="fullView">
            <div className="fullViewText">
              {LocalizeComponent.fullView}
            </div>
          </div>
        </div>

        <div className="gridFrame">
            <ListMatrix list={list} />
        </div>

    </div>


  );

}



export default BloggerListWhiteComponent;
