import generateModule from '../helpers/GenerateNumber';
import React from 'react';
import Obfuscate from 'react-obfuscate';
import LocalizeComponent from '../localize/LocalizeComponent';
const deployMode = "development";//development//production
const deployPlatform = "browser";//browser//android
const routeUrl = "https://echohub.io";
const serverNewImages = "https://echohub.io/newimages/";
const serverImagePath = "https://echohub.io/profileImages/";
const serverImageBackgroundPath = "https://echohub.io/backgroundImages/";
const serverNewsPath = "https://echohub.io/newsImages/";
const serverVideoPath = "https://echohub.io/videoUploads/";


//const baseurl = 'https://echohub.io:3004';//browser https
const baseurl = 'https://localhost:3004';

//const redirectUrl = "https://echohub.io/main"; //android
const redirectUrl = "http://localhost:8080/main";
//const userRole = "1"; blogger
//const userRole = "2"; //business owner
//newBusiness@gmail.com
//testblogger@gmail.com
//const userRole = "1"; //blogger
//facebook production
//280512703859870
//app secret production
//cbf8311cd273f6a10121ec7924352471
//facebook test

//generated Color Index
let colorIndex = 0;
//generated Color Index


//localStorage.setItem("role",action.email);



const cryptKey = <Obfuscate element="cryptoGraph2020"/>;
const googleMapKey = <Obfuscate element="AIzaSyDw81pPsmAQXFZ0hHye4UI6Ax9DwlOc__I"/>;
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

         // console.log("checked1");

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
      getServerNewFolderPath:() => {
        return serverNewImages;
      },
      getServerImagePath:() => {
        return serverImagePath;
      },
      getServerVideoPath:() => {
        return serverVideoPath;
      },
      getServerImageBackgroundPath:() => {
        return serverImageBackgroundPath;
      },
      getServerNewsImagePath:() => {
        return serverNewsPath;
      },

      getGeneratedImagePath:(urlPath) => {

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
                let str = "url(" + newmodule.getServerImagePath() + imageUrl + ") no-repeat center/cover";
                return str;
              }

            }
          }

          return checkImage(urlPath);
      },

      getCurrentUrl:() => {
        let currentUrl = window.location.pathname;
        currentUrl = currentUrl.replace('/','');
        return currentUrl;
      },
      getRedirectExeption:() => {


        let exceptionUrlPaths = ['main','userprofile','businessintro','creator','blogger','business'];

        return exceptionUrlPaths;

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
      getBusinessCategories:() => {

        var categories = localStorage.getItem("businessCategories");

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
      getbusinessGoals:() => {

        var categories = localStorage.getItem("businessGoals");

        if(categories){
          var parsedData = JSON.parse(categories);
          var array = [];
          parsedData.map((item) => {
              var string = item.name.split(':');
              var newString = "'" + string[0] + "':" + string[1];
              array.push(newString);
          });
          return array;

        }else{
          return false;
        }

      },
      getbusinessCategory:() => {

        var category = localStorage.getItem("businessCategory");

        if(category){
          return JSON.parse(category);
        }else{
          return false;
        }

      },
      getUserCategory:() => {

        var category = localStorage.getItem("category");

        if(category){
          return JSON.parse(category);
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
      getUserItemNameByToken:(name) => {

        var gettingItem = localStorage.getItem(name);

        if(gettingItem){
          return gettingItem;
        }else{
          return 0;
        }

      },
      deleteUserItemName:(name) => {

        localStorage.removeItem(name);

      },
      getJSONFromMemory:(name) => {

        var gettingItem = localStorage.getItem(name);

        if(gettingItem){
          return JSON.parse(gettingItem);
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
      CheckIfAuthorized:() => {
        var email = localStorage.getItem("email");
        if(email){
          return true;
        }else{
          return false;
        }
      },
      LogoutUser:() => {
        localStorage.clear();
        setTimeout(function(){
          window.location.reload();
        },3000);
      },

      getUserRole:() => {
          return localStorage.getItem("role");
      },
//xx
      checkUserAuthorization:(pageRole) => {
          var role = localStorage.getItem("role");

          if(role){
            if(parseInt(role) === pageRole){

            }else if(parseInt(role) === 0){

            }else{
              window.location.href = redirectUrl;
            }
          }else{
            window.location.href = redirectUrl;
          }

      },

      checkAdminAuthorization:(pageRole) => {
          var role = localStorage.getItem("role");

          if(role){
            if(parseInt(role) === pageRole){
                return true;
            }else{
              return false;
            }
          }else{
            return false;
          }

      },

      getUserAutorization:() => {
          var additionalData = localStorage.getItem("additionalData");
          var role = localStorage.getItem("role");
          if(role){
            return {
              role:role,
              additionalData:additionalData
            };
          }else{
            return false;
          }
      },

      getBaseUrl:() => {
        return routeUrl + "/assets/entry/uploads/";
      },
      getUploadUrl:() => {
        return routeUrl;
      },
      getVideoUrl:() => {
        return routeUrl + "/videoUploads/";
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
      },
      //xxx
      getCurrentStatus: (status) => {

          var rData = newmodule.getJSONFromMemory("appstatus");
      
          let number = status;
          number = number - 1;
       
            if(rData[number].text == "open task"){
              rData[number].text = LocalizeComponent.open_task;
            }
            if(rData[number].text == "under consideration by business"){
              rData[number].text = LocalizeComponent.under_consideration;
            }
            if(rData[number].text == "approved by business"){
              rData[number].text = LocalizeComponent.approved_b;
            }
            if(rData[number].text == "waiting system approval"){
              rData[number].text = LocalizeComponent.waiting_system_appr;
            }
            if(rData[number].text == "ready for withdrawal"){
              rData[number].text = LocalizeComponent.statuswithdrawal;
            }
          
          return rData[number].text;
        
      },

      getHeaderFetchPattern:() => {
        const fetchPostHeader = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

        return fetchPostHeader;
      },
      convertTitlesToURL:(data) => {
        for(let i = 0;i < data.length;i++){
          let str = data[i].title;
          data[i].url = str.replace(/\s/g,"-").toLowerCase();
        }

        return data;
      }

}





export default newmodule;
