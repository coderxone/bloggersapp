import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject2 = new Subject();
const observ_subject3 = new Subject();
const observ_subject4 = new Subject();
const observ_subject5 = new Subject();
const observ_subject6 = new Subject();
const observ_subject7 = new Subject();
const observ_subjectfive46 = new Subject();
const observ_subjectDecline = new Subject();

const DetailTaskService = {

          generateUrl:(id) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: id,
              status:"set" //set
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("makeHref",encryptedData);
          },
          checkGenerateUrl:(id) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: id,
              status:"check" //set
            }

      //      console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("makeHref",encryptedData);
          },

          listenGenerateUrl:() => {
            socket.on("makeHref",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },


          setUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              videotype:obj.videotype,
              url:obj.url,
              status:obj.set //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setvideo",encryptedData);
          },

          listenSetUrl:() => {
            socket.on("setvideo",(data) => {
                //console.log(data);
                observ_subject2.next(cryptLibrary.decrypt(data));
            });

            return observ_subject2;
          },

          checkCurrentStatus:(project_id) => {
            var datas = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "project_id":project_id,
            }

            var encryptedData = cryptLibrary.encrypt(datas);

            socket.emit("checkcurrentStatus",encryptedData);
          },

          listenCurrentStatus:() => {
            socket.on("checkcurrentStatus",(data) => {
                //console.log(data);
                observ_subjectfive46.next(cryptLibrary.decrypt(data));
            });

            return observ_subjectfive46;
          },

          EditUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              videotype:obj.videotype,
              url:obj.url,
              status:obj.set //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("editvideo",encryptedData);
          },

          listenEditUrl:() => {
            socket.on("editvideo",(data) => {
                //console.log(data);
                observ_subject5.next(cryptLibrary.decrypt(data));
            });

            return observ_subject5;
          },

          ReplaceUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              videotype:obj.videotype,
              url:obj.url,
              status:obj.set //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("replacevideo",encryptedData);
          },

          listenReplaceUrl:() => {
            socket.on("replacevideo",(data) => {
                //console.log(data);
                observ_subject7.next(cryptLibrary.decrypt(data));
            });

            return observ_subject7;
          },

//xx
          checkUrl:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              status:obj.status //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("checkvideo",encryptedData);
          },

          listenCheckUrl:() => {
            socket.on("checkvideo",(data) => {
                //console.log(data);
                observ_subject3.next(cryptLibrary.decrypt(data));
            });

            return observ_subject3;
          },

          checkReadyVideo:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              status:obj.status //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("checkApprovedByUservideo",encryptedData);
          },

          listenReadyVideo:() => {
            socket.on("checkApprovedByUservideo",(data) => {
                //console.log(data);
                observ_subject3.next(cryptLibrary.decrypt(data));
            });

            return observ_subject3;
          },


          checkBannedVideo:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              status:obj.status //check
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("checkBannedvideo",encryptedData);
          },

          listencheckBannedVideo:() => {
            socket.on("checkBannedvideo",(data) => {
                //console.log(data);
                observ_subject6.next(cryptLibrary.decrypt(data));
            });

            return observ_subject6;
          },


          submitOrder:(obj) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              id: obj.id,
              approvetask:obj.approvetask
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);
            //emit("closeorders",data);
            socket.emit("closeorders",encryptedData);
          },

          listenSubmittedOrder:() => {
            socket.on("closeorders",(data) => {
                //console.log(data);
                observ_subject4.next(cryptLibrary.decrypt(data));
            });

            return observ_subject4;
          },

          DeclineOrder:(text,project_id) => {

            var data = {
              deviceid:config.getdeviceid(),
              email:config.getUserEmail(),
              text:text,
              project_id:project_id,
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);
            //emit("closeorders",data);
            socket.emit("declineorder",encryptedData);
          },

          listenDeclineOrder:() => {
            socket.on("declineorder",(data) => {
                //console.log(data);
                observ_subjectDecline.next(cryptLibrary.decrypt(data));
            });

            return observ_subjectDecline;
          },



      }


export default DetailTaskService;
