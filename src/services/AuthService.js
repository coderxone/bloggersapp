import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';

const observ_subject = new Subject();
const observ_subjecttwo = new Subject();

const authService = {

      getDataAds:() => {

        socket.on('homeStart', (data) => {
           observ_subject.next(data);
        });

        const deviceid = config.getdeviceid();
        socket.emit('homeStart', {deviceid:deviceid});

        return observ_subject;

      },

      sendAuthData: senddata => {
          //console.log(senddata);
          var datas = {
            "deviceid":config.getdeviceid(),
            "email":senddata.email,
            "password":senddata.password,
            "picture":senddata.picture,
            "name":senddata.name,
            "social":senddata.social,
            "facebookToken":senddata.facebookToken,
            "googleToken":senddata.googleToken,
          }

          var encryptedData = cryptLibrary.encrypt(datas);

          socket.emit("setRegistration",encryptedData);

      },

      getAuthData:() => {

        socket.on("setRegistration",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
      },

      sendRestorePassword:(data) => {
        var datas = {
          "deviceid":config.getdeviceid(),
          "email":data.email
        }

        var encryptedData = cryptLibrary.encrypt(datas);

        socket.emit("setRestorePassword",encryptedData);
      },

      getRestorePassword:() => {
        socket.on("setRestorePassword",(data) => {
            //console.log(data);
            observ_subject.next(cryptLibrary.decrypt(data));
        });

        return observ_subject;
      },



      }


export default authService;
