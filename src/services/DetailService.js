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
const observ_subjectfive45 = new Subject();
const observ_subjectfive46 = new Subject();
const observ_subjectfive47 = new Subject();

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

      getSendTaskDone:(user_email,checkDetailId) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "user_email":user_email,
          "task_id":checkDetailId,
          "status":1,
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("setTasks",encryptedData);
      },

      listenSendTaskDone:() => {
        socket.on("setTasks",(data) => {
            //console.log(data);
            observ_subjectfive45.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfive45;
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

      checkUserVerifiedDays:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "data":data
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("checkVerifiedDays",encryptedData);
      },

      listenCheckUserVerifiedDays:() => {
        socket.on("checkVerifiedDays",(data) => {
            //console.log(data);
            observ_subjectfive47.next(cryptLibrary.decrypt(data));
        });

        return observ_subjectfive47;
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

      setBan:(id,Project_id) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":config.getUserEmail(),
          "role":config.getUserRole(),
          "id":id,
          "projectId":Project_id
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
