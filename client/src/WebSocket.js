const io = require('socket.io-client');

const socket = io('http://localhost:4000');
export default socket;