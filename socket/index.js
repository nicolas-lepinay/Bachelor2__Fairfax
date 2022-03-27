const messenger = require('./messenger');
const notifications = require('./notifications');

const port = 9000;
const URL = 'http://45.9.191.110:3000';

const io = require('socket.io')(port, { cors: { origin: "*" }}); // Remplacer "*" par URL ?

messenger.start(io);
notifications.start(io);