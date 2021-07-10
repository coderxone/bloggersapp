import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subject1 = new Subject();
const observ_subject2 = new Subject();

const profileService = {

          getUserData:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "checkEmail": comingData,
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getUserData",encryptedData);
          },


          listenUserDataG:() => {
            socket.on("getUserData",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },

          getOwnData:() => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "checkEmail": config.getUserEmail(),
            }


            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getUserData",encryptedData);
          },


          updateUsersData:(data) => {

            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "data":data
            }


            var encryptedData = cryptLibrary.encrypt(data);
            socket.emit("updateUserDataField",encryptedData);

          },

          listenUpdateUsersData:() => {
            socket.on("updateUserDataField",(data) => {
                //console.log(data);
                observ_subject1.next(cryptLibrary.decrypt(data));
            });
            return observ_subject1;
          },



      }


export default profileService;
