import React, {useState,useEffect,useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import config from '../../config/config.js';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import adminService from '../../services/adminService';
import Observable from '../../services/Observable';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import { increment, decrement,save_email } from '../../actions/actions';
import {
  Link,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


const SocialNetworksRender = (props) => {

  const objM = props.m;
  //console.log(objM);
  delete objM['status'];

  const objectKeys = Object.keys(objM);

  const MapList = objectKeys.map((item,index) =>
      <div key={index} className="appContainerDescribtion">
          <div className="appContainerDescribtionOne">
            {item}
          </div>

          {
            item === "Instagram" && (
              <a href={objM[item]} className="appContainerDescribtionTwo">
                  {objM[item]}
              </a>
            )
          }

          {
            item !== "Instagram" && (
              <div className="appContainerDescribtionTwo">
                  {objM[item]}
              </div>
            )
          }

      </div>
  )


  //console.log(fullObject);

  return (
    <div className="appPage">
      {MapList}
    </div>

  );





}

const UserRender = (props) => {

  var users = props.users;
  const classes = useStyles();

  const ApproveUser = (item) => {
      adminService.ApproveUser(item.id,1);//approve
      console.log("click");
  }
  const BlockUser = (item) => {
      adminService.ApproveUser(item.id,3);//approve
      console.log("click 2");
  }

  const list = users.map((item,index) =>

    <Accordion key={item.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={"panel" + index + "a-content"}
        id={"panel" + index + "a-header"}
      >

        <div className="accordeonTitle">
            <div className="accordeonTitleOne">
                <Typography className={classes.heading}>{item.email}</Typography>
            </div>
            {
              item.verified === 1 && (
                <div className="accordeonTitleTwoApproved">
                    Approved
                </div>
              )
            }

            {
              item.verified === 0 && (
                <div className="accordeonTitleTwoNot">
                    not approved
                </div>
              )
            }
            {
              item.verified === 3 && (
                <div className="accordeonTitleTwoBlocked">
                    blocked
                </div>
              )
            }


        </div>


      </AccordionSummary>
      <AccordionDetails className="accordionStyle">

              <div className="appProfile">Profile Info</div>

              <div className="appContainerOne">
                  <div className="approveButtonGroup">
                    <div className="approveButtonGroupOne">
                      Action
                    </div>
                    <div className="approveButtonGroupTwo">
                      <Button variant="contained" color="primary"  onClick={event => ApproveUser(item)}>
                          Approve
                      </Button>
                    </div>
                    <div className="approveButtonGroupThree">
                      <Button variant="contained" color="secondary" className="ButtonTextWhite"  onClick={event => BlockUser(item)}>
                          Block
                      </Button>
                    </div>

                  </div>

              </div>



              <div className="descriptionMargin">

                {
                  item.ssn !== 0 &&
                  item.ssn  && (
                    <SocialNetworksRender m={item.ssn} />
                  )
                }


                  <div className="appContainerDescribtion">
                      <div className="appContainerDescribtionOne">
                        First Name
                      </div>
                      <div className="appContainerDescribtionTwo">
                      {item.firstName}
                      </div>
                  </div>
                  <div className="appContainerDescribtion">
                      <div className="appContainerDescribtionOne">
                        Last Name
                      </div>
                      <div className="appContainerDescribtionTwo">
                      {item.lastName}
                      </div>
                  </div>
                  <div className="appContainerDescribtion">
                      <div className="appContainerDescribtionOne">
                        age
                      </div>
                      <div className="appContainerDescribtionTwo">
                      {item.age}
                      </div>
                  </div>
                  <div className="appContainerDescribtion">
                      <div className="appContainerDescribtionOne">
                        country
                      </div>
                      <div className="appContainerDescribtionTwo">
                      {item.country}
                      </div>
                  </div>
                  <div className="appContainerDescribtion">
                      <div className="appContainerDescribtionOne">
                        count of subscribers
                      </div>
                      <div className="appContainerDescribtionTwo">
                      {item.subscribers_count}
                      </div>
                  </div>

                  {
                    item.socialNetworks !== 0 && (
                      <SocialNetworksRender m={item.socialNetworks} />
                    )
                  }



              </div>


      </AccordionDetails>
    </Accordion>

  );

  return (
    <div className="appPage">
        {list}
    </div>
  );

}


const AdminComponent = (props) => {

  const classes = useStyles();

  const [tabvalue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [userList,SetUserList] = useState([]);

  const InsertUsers = (users) => {
      SetUserList([]);
      SetUserList(users);
  }


  useEffect(() => {

    const serviceL = adminService.listenAdminData().subscribe(data => {
        //console.log(data);
        var usersLength = data.users.length;
        if(usersLength > 0){
            //if(userList.length < usersLength){
              InsertUsers(data.users);
          //  }
        }
    });

    return () => {
      serviceL.unsubscribe();
    }

  },[]);



  useEffect(() => {

    const serviceApproveUser = adminService.listenApproveUser().subscribe(data => {
        console.log(data);
        adminService.getAdminData();
    });

    return () => {
      serviceApproveUser.unsubscribe();
    }

  },[]);




  useEffect(() => {

    adminService.getAdminData();
    config.checkUserAuthorization(0);

  },[]);


  const FindPerson = (event) => {

      var list = [...userList];

      var InputValue = event.target.value;

      var SearchArray = [];

      //find with 100% priority
      for(var i = 0;i < list.length;i++){

        var searchString = list[i].email;

        var Position = [];
        var FullSearchString = "";
        var Priority = 0;


        for(var b = 0;b < searchString.length;b++){

          FullSearchString += searchString[b];

          if(FullSearchString == InputValue){

            var findedObj = 0;
            for(var j = 0;j < Position.length;j++){
              if((Position[j].position == b) && (Position[j].string == FullSearchString)){
                findedObj = 1;
              }
            }

            if(findedObj == 0){
              var findObjectData = {
                position:b,
                string:FullSearchString,
                selectString:searchString,
                priority:Priority++,
                mainPosition:i
              }

              Position.push(findObjectData);
            }
          }
        }
        //find with 100% priority

        SearchArray.push(Position);

      }

      for(var n = 0;n < SearchArray.length;n++){
        var currentArray = SearchArray[n];
        for(var m = 0;m < currentArray.length;m++){
            var copyElement = list[currentArray[m].mainPosition];
            list.splice(currentArray[m].mainPosition, 1);
            list.unshift(copyElement);
        }
      }

      //console.log(list);
      SetUserList([]);
      SetUserList(list);


  }



  return (

    <div className="appPage">
    <Paper square>
      <Tabs
        value={tabvalue}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        variant="fullWidth"
      >
        <Tab label="Users" />
        <Tab label="Tasks" />

      </Tabs>
    </Paper>

    {
      tabvalue === 0 &&
      (
        <div className={classes.root}>

          <div className="adminSearchField">
              <TextField onChange={FindPerson} width="100%" label="Search User" className="fullSelect" />
          </div>


          <div className="appContainer">

            <UserRender users={userList}/>

          </div>



        </div>
      )
    }

    </div>

  );
};


 export default connect()(AdminComponent);
