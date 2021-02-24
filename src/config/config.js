import generateModule from '../helpers/GenerateNumber';
import React from 'react';

const deployMode = "production";
const deployPlatform = "android";
const cryptKey = "cryptoGraph2020";
const routeUrl = "https://kazpoisk.kz";
//const userRole = "1"; blogger
const userRole = "2"; //business owner
//const userRole = "1"; //blogger
//localStorage.setItem("role",action.email);

const newmodule = {

       setDeviceid: () => {


        var checkdeviceid = localStorage.getItem("deviceid");

        var fixdevicememory = 0;
        //if device id is in memory is not empty
        if(checkdeviceid){
            localStorage.setItem("deviceid",checkdeviceid);
            fixdevicememory = 1;
        }

        //console.log(phoneid);

        //if((phoneid == null) && (fixdevicememory == 0)){
        if(fixdevicememory == 0){

          console.log("checked1");

          var generatevalue = generateModule.generateRandomNumber(1,5555555555555);

          localStorage.setItem("deviceid",generatevalue);

          //console.log("2222");

        }

        // else if(phoneid != null){
        //   localStorage.setItem("deviceid",phoneid);
        //   //console.log("333");
        // }


      },

      getSavedTitle:() => {
        var savedTitle = localStorage.getItem("saved_title");
        if(savedTitle){
          return savedTitle;
        }else{
          return "";
        }
      },

      getdeviceid:() => {
        return localStorage.getItem("deviceid");
      },

      getUserCoordinates:() => {

        var coord = localStorage.getItem("coord");

        if(coord){
          return coord;
        }else{
          return false;
        }

      },

      getUserEmail:() => {
        var email = localStorage.getItem("email");
        if(email){
          return email;
        }else{
          return false;
        }
      },

      getUserRole:() => {
          return localStorage.getItem("role");
      },

      getBaseUrl:() => {
        return routeUrl + "/assets/entry/uploads/";
      },

      getCryptKey:() => {
        return cryptKey;
      },

      TurnOnNotification:() => {
        localStorage.setItem("notification","1");
      },

      turnOffNotification:() => {
        localStorage.setItem("notification","0");
      },

      getNotificationStatus:() => {

        var notStatus = localStorage.getItem("notification");
        if(notStatus){
          if(notStatus == 1){
            return true;
          }else{
            return false;
          }
        }

      },

      saveNotificationCount:(count) => {
        localStorage.setItem("notificationcount",count);
      },

      getNotificationCount:() => {
        return localStorage.getItem("notificationcount");
      }
      ,
      getDeployData:() => {
        return {
          deployMode:deployMode,
          deployPlatform:deployPlatform
        };
      }


}





export default newmodule;
