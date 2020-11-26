import generateModule from '../helpers/GenerateNumber';
import React from 'react';

const cryptKey = "cryptoGraph2020";
const routeUrl = "https://kazpoisk.kz";
const userRole = "1";

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

      getdeviceid:() => {
        return localStorage.getItem("deviceid");
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
          return userRole;
      },

      getBaseUrl:() => {
        return routeUrl + "/assets/entry/uploads/";
      },

      getCryptKey:() => {
        return cryptKey;
      }

}





export default newmodule;
