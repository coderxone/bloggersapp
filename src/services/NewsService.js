import { Subject } from 'rxjs';
import socket from '../config/socket.js';
import config from '../config/config.js';
import cryptLibrary from '../helpers/CryptLibrary';
const observ_subject = new Subject();
const observ_subjectSecondEmitter = new Subject();

const BloggerService = {

          addNews:async () => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
            }

            //console.log(data);

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("addNews",encryptedData);
          },

          listenAddNews:() => {
            socket.on("addNews",(data) => {
                //console.log(data);
                observ_subject.next(cryptLibrary.decrypt(data));
            });

            return observ_subject;
          },

          updateNewsData:async (obj) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              obj:obj
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("updateNewsData",encryptedData);
          },

          requestNewsData:async (id) => {

            var data = {
              deviceId:config.getdeviceid(),
              email:config.getUserEmail(),
              role:config.getUserRole(),
              id:id
            }

            var encryptedData = cryptLibrary.encrypt(data);

            socket.emit("requestNewsData",encryptedData);
          },

          listenRequestNewsData:() => {
            socket.on("requestNewsData",(data) => {
                //console.log(data);
                observ_subjectSecondEmitter.next(cryptLibrary.decrypt(data));
            });

            return observ_subjectSecondEmitter;
          },

          
      }


export default BloggerService;
