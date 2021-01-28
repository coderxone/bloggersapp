import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();

const business = {

      getBusinessData:() => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("getAllData",encryptedData);
      },

      listenBusinessCore:() => {
        socket.on("getAllData",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
      },

      async_function: async function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },

      without_async: function(){ //a function that returns a promise

          return new Promise(function(resolve,reject){
            resolve("async");
          })


        },

      }


export default business;
