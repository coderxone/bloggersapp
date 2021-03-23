import generateModule from '../helpers/GenerateNumber';
import React from 'react';
import Obfuscate from 'react-obfuscate';
const deployMode = "development";//development//production
const deployPlatform = "browser";//browser//android
const routeUrl = "https://kazpoisk.kz";
//const url = 'https://echohub.io:3004';//browser https
const baseurl = 'https://localhost:3004';
//const userRole = "1"; blogger
const userRole = "2"; //business owner
//const userRole = "1"; //blogger
//localStorage.setItem("role",action.email);

const cryptKey = <Obfuscate element="cryptoGraph2020"/>;
const googleMapKey = <Obfuscate element="AIzaSyAZSEPAxXmoxpPVFbiTsFoqCvMQYPuR8Uk"/>;
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
      getBaseDomainUrl:() => {
        return baseurl;
      },

      getUserCoordinates:() => {

        var coord = localStorage.getItem("coord");

        if(coord){
          return coord;
        }else{
          return false;
        }

      },
      getUserCountry:() => {

        var country = localStorage.getItem("country");

        if(country){
          return country;
        }else{
          return false;
        }

      },
      getCategories:() => {

        var categories = localStorage.getItem("categories");

        if(categories){
          var parsedData = JSON.parse(categories);
          var array = [];
          parsedData.map((item) => {
              array.push(item.name);
          });
          return array;

        }else{
          return false;
        }

      },
      getUserCategory:() => {

        var category = localStorage.getItem("category");

        if(category){
          return category;
        }else{
          return false;
        }

      },
      getUserItemName:(name) => {

        var gettingItem = localStorage.getItem(name);

        if(gettingItem){
          return gettingItem;
        }else{
          return false;
        }

      },
      getUserSocialNetworks:() => {

        var SocialObject = {};
        var checkVariable = 0;

        var gettingItem = localStorage.getItem("Instagram");

        if(gettingItem){
          checkVariable = 1;
          SocialObject.Instagram = gettingItem;
        }

        var gettingItemF = localStorage.getItem("Facebook");

        if(gettingItemF){
          checkVariable = 1;
          SocialObject.Facebook = gettingItemF;
        }

        var gettingItemU = localStorage.getItem("Youtube");
        if(gettingItemU){
          checkVariable = 1;
          SocialObject.Youtube = gettingItemU;
        }

        var gettingItemT = localStorage.getItem("Twitter");
        if(gettingItemT){
          checkVariable = 1;
          SocialObject.Twitter = gettingItemT;
        }

        // for (const [key, value] of Object.entries(SocialObject)) {
        //   console.log(`${key}: ${value}`);
        // }

        if(checkVariable == 1){
          SocialObject.status = true;
          return SocialObject;
        }else{
          SocialObject.status = false;
          return SocialObject;
        }

      },
      getUserSSN:() => {
        //'SSN','ITIN','EIN'
        var SocialObject = {};
        var checkVariable = 0;

        var gettingItem = localStorage.getItem("SSN");

        if(gettingItem){
          checkVariable = 1;
          SocialObject.SSN = gettingItem;
        }

        var gettingItemF = localStorage.getItem("ITIN");

        if(gettingItemF){
          checkVariable = 1;
          SocialObject.ITIN = gettingItemF;
        }

        var gettingItemU = localStorage.getItem("EIN");
        if(gettingItemU){
          checkVariable = 1;
          SocialObject.EIN = gettingItemU;
        }

        // for (const [key, value] of Object.entries(SocialObject)) {
        //   console.log(`${key}: ${value}`);
        // }

        if(checkVariable == 1){
          SocialObject.status = true;
          return SocialObject;
        }else{
          SocialObject.status = false;
          return SocialObject;
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
        return cryptKey.props.element;
      },
      getGoogleMapKey:() => {
        return googleMapKey.props.element;
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
