import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();

const rateService = {

          setRate:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "data": comingData,
            }

            console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setRate",encryptedData);
          },

          listenRate:() => {
            socket.on("setRate",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default rateService;
