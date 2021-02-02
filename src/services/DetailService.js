import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();
const observ_subjecttwo = new Subject();
const observ_subjectthree = new Subject();
const observ_subjectfour = new Subject();
const observ_subjectfive = new Subject();
const observ_subjectfive44 = new Subject();

const detailservice = {

      getDetailData:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkvideoByProject",encryptedData);
      },

      listenDetailData:() => {
        socket.on("checkvideoByProject",(data) => {
            //console.log(data);
            observ_subjectfive44.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfive44;
      },


      getCheckvideosByUser:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkvideosByUser",encryptedData);
      },

      listenCheckvideosByUser:() => {
        socket.on("checkvideosByUser",(data) => {
            //console.log(data);
            observ_subjectfive.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfive;
      },


      getDetailApprovedData:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkvideoApproved",encryptedData);
      },

      listenDetailApprovedData:() => {
        socket.on("checkvideoApproved",(data) => {
            //console.log(data);
            observ_subjectthree.next(cryptLibrary.decrypt(data));
        });
        return observ_subjectthree;
      },

      setBan:(id) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "id":id
        }

        var encryptedData = cryptLibrary.encrypt(datas);


        socket.emit("setBan",encryptedData);
      },

      listenBan:() => {
        socket.on("setBan",(data) => {
            //console.log(data);
            observ_subjecttwo.next(cryptLibrary.decrypt(data));
        });

        return observ_subjecttwo;
      },

      getviews:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "project_id":data.project_id
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkviews",encryptedData);
      },

      listenViews:() => {
        socket.on("checkviews",(data) => {
            //console.log(data);
            observ_subjectfour.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfour;
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


export default detailservice;
