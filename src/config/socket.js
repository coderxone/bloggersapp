import io from 'socket.io-client'
import config from '../config/config';


// if((config.getDeployData().deployMode == "production") && (config.getDeployData().deployPlatform == "android")){
//   url = 'http://145.249.246.3:3002';//android
// }else if((config.getDeployData().deployMode == "development") && (config.getDeployData().deployPlatform == "android")){
//   url = 'http://localhost:3002';//android
// }else if((config.getDeployData().deployMode == "development") && (config.getDeployData().deployPlatform == "browser")){
//   url = 'https://localhost:3004';
// }


//url = 'https://localhost:3004';

//private url = 'http://kazpoisk.kz:3002';
//const socket = io(url);
//browser
// const socket = io.connect(config.getBaseDomainUrl(),{
//                   reconnection: true,
//                   reconnectionDelay: 1000,
//                   reconnectionDelayMax : 5000,
//                   reconnectionAttempts: Infinity,
//                   //rememberUpgrade:true,
//                     transports: ['websocket'],
//                   //  rejectUnauthorized: false
//                 });
//browser https
const socket = io.connect(config.getBaseDomainUrl(),{
                  reconnection: true,
                  reconnectionDelay: 1000,
                  reconnectionDelayMax : 5000,
                  reconnectionAttempts: Infinity,
                  rememberUpgrade:true,
                  transports: ['websocket'],
                  secure:true,
                  rejectUnauthorized: false
                });;



export default socket;
