import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();

const selectRoleService = {

          setRole:(comingData) => {


            var data = {
              "deviceid":config.getdeviceid(),
              "email":config.getUserEmail(),
              "data": comingData,
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("setRole",encryptedData);
          },

          listenRole:() => {
            socket.on("setRole",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default selectRoleService;
