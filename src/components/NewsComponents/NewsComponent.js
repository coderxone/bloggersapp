import React, { useCallback,useEffect,useState,useMemo } from 'react';
import MenuComponent from '../../components/MenuComponents/MenuComponent';
import LocalizeComponent from '../../localize/LocalizeComponent';
import Grid from '@material-ui/core/Grid';
import config from '../../config/config';
import '../../components/profileComponents/userProfileComponent.scss';
import './NewsComponent.scss';
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Link,useHistory
} from "react-router-dom";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import NewsUploadImageComponent from './NewsUploadImageComponent';
import { useSelector, useDispatch } from 'react-redux'
import { EnableBackButton,SetNewsEditMode,SetNewsBackgroundImage,setAlertState,setAdminMode,multiSave } from '../../features/counter-slice';
import background from '../../images/background.jpeg';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import TextField from '@mui/material/TextField';
import NewsService from '../../services/NewsService';
import AlertSuccessComponent from '../../helperComponents/AlertSuccessComponent';

const NewsComponent = (props) => {

  const dispatch = useDispatch();

  var id = useMemo(() => {

      let reg = /^\d+$/;
      let hashId = props.match.params.id;
      let check = reg.test(hashId)
      if(check){

        let saveObj = {
          name:"id",
          value:hashId
        }

        dispatch(multiSave(saveObj));
        return hashId;
      }
      return false;

  },[]);

  
  const BACKGROUND_IMAGE_DATA = useSelector((state) => state.counter.newsBackgroundImage);
  const newsEditMode = useSelector((state) => state.counter.newsEditMode);
  const alertState = useSelector((state) => state.counter.alertState);
  const alertText = useSelector((state) => state.counter.alertText);
  const editClass = newsEditMode === 0 ? "editNewsPanel" : "readyNewsPanel";
  const history = useHistory();
  const adminMode = useSelector((state) => state.counter.adminMode);

  const goToNewsList = useCallback(() => {

    return history.push('/latest-news'), [history]

  });

  const theme = createTheme({
    palette: {
      white: {
        main: '#ffffff'
      },
    },
  });


  const EditMode = (command) => {
    dispatch(SetNewsEditMode(command));
  }


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

    let listenPublishNews = NewsService.listenPublishNews().subscribe(data => {

        if(data.status === "ok"){
          dispatch(setAlertState({status:true,text: LocalizeComponent.successAction }))

          setTimeout(function(){
            //redirect to
            goToNewsList();
          },3000)
        }
    });

    // props.reduxStorage.getState(res => {
    //   console.log(res);
    // })
    NewsService.requestNewsData(id);
    dispatch(SetNewsBackgroundImage(config.getServerNewsImagePath() + "background.jpeg"));

    //set admin mode
    const checkAdminPermit = config.checkAdminAuthorization(3);
    if(checkAdminPermit){
        dispatch(setAdminMode(true));
    }
    //set admin mode


    return () => {
        listenRequestNewsData.unsubscribe();
        listenPublishNews.unsubscribe();
        dispatch(EnableBackButton(false));
    }
  },[id]);

  const hibrydClass = newsEditMode === 1 ? "GilroyBlackFont whiteColor editFrame" : "GilroyBlackFont whiteColor newsFrame";
  const [category,SetCategory] = useState("Sport");
  const [title,SetTitle] = useState("Example Title");
  const [description,SetDescription] = useState("example description");
  const [date,SetDate] = useState("4 hours ago");
  const [author,SetAuthor] = useState("John Agger");
  const [views,SetViews] = useState(0);

  const changeItem = (itemName,value) => {

    
      switch (itemName) {
        case 'category':
          SetCategory(value);
        break;
        
        case 'title':
          SetTitle(value);
        break;

        case 'description':
          SetDescription(value);
        break;
      }
    
      
  }

  useMemo(() => {

    let obj = {
      category:category,
      title:title,
      description:description,
      id:id
    }

    if(category.length > 2 && title.length > 2 && description.length > 2){
      
      if(title.indexOf("Example") < 0){
        NewsService.updateNewsData(obj);
      }
      
    }

  },[category,title,description,id]);


  const publish = (id,title,description) => {

    if(title.length > 0 && description.length > 0){
      NewsService.publishNews(id,title,description);
    }
    
  }

  

  return (

    <div id="opacityControl">
      <MenuComponent />

      <Grid container className="projectContainer"  >

        
            <div className="news_u_background" style={ { backgroundPosition: "center",backgroundRepeat:"no-repeat",backgroundSize:"cover",background: "url(" + BACKGROUND_IMAGE_DATA + ") no-repeat center/cover" }}>
              <div className={hibrydClass}>

              {
                adminMode === true && (
                  <div className={editClass}>
                  {
                    newsEditMode === 0 ? (
                      
                      <EditIcon className="editNewsIcon" onClick={event => EditMode(1)}/>
                      
                    ) : (
                      <>
                        <DoneAllIcon className="doneNewsIcon" onClick={event => EditMode(0)}/>
                        <ThemeProvider theme={theme}>
                          <Button onClick={event => publish(id,title,description)} variant="outlined" size="small"  color="white" endIcon={<SendIcon />}>
                            Publish
                          </Button>
                        </ThemeProvider>
                        <NewsUploadImageComponent/>
                      </>
                      
                    )
                  }
                </div>
                )
              }
              

                {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground">
                      <TextField
                        label="Category"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        value={category}
                        onChange={event => changeItem('category',event.target.value)}
                      />
                    </div>
                    
                  ):(
                    <div >{category}</div>
                  )
                }
                
                <div className="textOpacity">{date}</div>

                {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground">
                      <TextField
                        label="Title"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        onChange={event => changeItem('title',event.target.value)}
                        value={title}
                      />
                    </div>
                    
                  ):(
                    <h2 className="whiteOpacity">
                      {
                        title
                      }
                    </h2>
                  )
                }

                
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

              

                {
                  newsEditMode === 1 ? (
                    
                    <div className="editInputBackground newsDescription">
                      <TextField
                        label="Decription"
                        variant="standard"
                        multiline
                        className="fullSelect"
                        onChange={event => changeItem('description',event.target.value)}
                        value={description}
                      />
                    </div>
                    
                  ):(
                    <div className="GilroyRegularFont smallFontSize newsDescription">
                      {
                        description
                      }
                    </div>
                  )
                }


                <AlertSuccessComponent state={alertState} text={alertText} />

                

              




            </div>
        </div>













    </Grid>




  </div>




  );

}


 export default NewsComponent;
