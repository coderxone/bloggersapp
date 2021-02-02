import io from 'socket.io-client'


//const url = 'https://kazpoisk.kz:3001';
//const url = 'https://localhost:3002';
const url = 'http://localhost:3004';
//const url = 'https://echohub.io:3004';
//private url = 'http://18.218.27.49:3002';
//private url = 'http://kazpoisk.kz:3002';
//const socket = io(url);
const socket = io.connect(url,{
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
