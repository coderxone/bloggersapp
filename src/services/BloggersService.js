import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();

const BloggerService = {

          setAllData:async (lat,long,gps) => {

            var data = {
              lat:lat,
              long:long,
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              gps:gps,
              message:"1"
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("getAllDataE",encryptedData);
          },

          listenUserDataG:() => {
            socket.on("getAllDataE",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },



      }


export default BloggerService;
