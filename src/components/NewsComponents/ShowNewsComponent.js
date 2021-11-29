import React, { useEffect,useState,useMemo } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import '../../components/profileComponents/userProfileComponent.scss';
import './NewsComponent.scss';
import { useSelector, useDispatch } from 'react-redux'
import { EnableBackButton,SetNewsBackgroundImage } from '../../features/counter-slice';
import background from '../../images/background.jpeg';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import NewsService from '../../services/NewsService';

const NewsComponent = (props) => {

  var id = useMemo(() => {

      let reg = /^\d+$/;
      let hashId = props.match.params.id;
      let check = reg.test(hashId)
      if(check){
        return hashId;
      }
      return false;

  },[]);

  const dispatch = useDispatch();
  const BACKGROUND_IMAGE_DATA = useSelector((state) => state.counter.newsBackgroundImage);
  const newsEditMode = useSelector((state) => state.counter.newsEditMode);


  useEffect(() => {
    //enable backButton
    dispatch(EnableBackButton(true));
    

    let listenRequestNewsData = NewsService.listenRequestNewsData().subscribe(data => {
      if(data.status === "ok"){
          SetTitle(data.results[0].title);
          SetDescription(data.results[0].description);
          SetCategory(data.results[0].category);
          SetDate(data.results[0].date + " hours ago");
          SetAuthor(data.results[0].email);
          SetViews(data.results[0].views);
          dispatch(SetNewsBackgroundImage(config.getServerNewsImagePath() + data.results[0].image));
      }
    });

    // props.reduxStorage.getState(res => {
    //   console.log(res);
    // })
    NewsService.requestNewsData(id);
    dispatch(SetNewsBackgroundImage(config.getServerNewsImagePath() + "background.jpeg"));


    return () => {
        listenRequestNewsData.unsubscribe();
        dispatch(EnableBackButton(false));
    }
  },[id]);

  const hibrydClass = newsEditMode === 1 ? "GilroyBlackFont whiteColor editFrame" : "GilroyBlackFont whiteColor newsFrame";
  const [category,SetCategory] = useState("");
  const [title,SetTitle] = useState("");
  const [description,SetDescription] = useState("");
  const [date,SetDate] = useState("");
  const [author,SetAuthor] = useState("");
  const [views,SetViews] = useState(0);




  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >

        
            <div className="news_u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + BACKGROUND_IMAGE_DATA + ") no-repeat center/cover" }}>
              <div className={hibrydClass}>

                <div >{category}</div>
                
                <div className="textOpacity">{date}</div>

                <h2 className="whiteOpacity">
                      {
                        title
                      }
                    </h2>

                
              </div>
            </div>
          
        

        <style>{`
            .menuContainer{
                position: absolute;
            }
            .backabsolute{
                left:5px;
                background-color:rgba(29,32,46,0.2);
            }
            
        `}</style>


        <div className="newsInfoPanelCover">
            <div className="newsInfoPanel robotoFont blackColor">

              <div className="newsGridContainer GilroyRegularFont">
                <div className="newsGridItems">
                  <div className="subGridItems">
                      <div className="author_image" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + background + ") no-repeat center/cover" }}>
                      </div>
                  </div>
                  <div className="subGridItems">
                      <div className="author_text">{ author }</div>
                  </div>
                </div>
                <div className="newsGridItemsTwo">
                  <div className="subGridItems">
                      <AccessTimeIcon className="newsClock"/>
                  </div>
                  <div className="subGridItems">
                    <div className="author_text">2 min</div>
                  </div>
                </div>
                <div className="newsGridItems">
                  <div className="subGridItems">
                      <RemoveRedEyeIcon className="newsClock" />
                  </div>
                  <div className="subGridItems">
                    <div className="author_text">{views} views</div>
                  </div>
                </div>
              </div>

              <div className="GilroyRegularFont smallFontSize newsDescription">
                      {
                        description
                      }
                    </div>

            </div>
        </div>


    </Grid>




  </div>




  );

}


 export default NewsComponent;
