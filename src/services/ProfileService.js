import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();

const profileService = {

          getUserData:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "checkEmail": comingData,
            }

            console.log(data);

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



      }


export default profileService;
