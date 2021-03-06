var mongoose = require('mongoose');
var readline = require('readline');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/cloudfan';

if (process.env.NODE_ENV === 'production') {
  // dbURI = process.env.MONGOLAB_URI;
  dbURI = 'mongodb://heroku_ll06nff8:55ahvscsb9699ugq06jrjket9q@ds133368.mlab.com:33368/heroku_ll06nff8';
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// For Windows termination
if (process.platform === 'wind32') {
  var rl = readline.createInterface({
    input: process.stdin,
    output: precess.stdout
  });
  rl.on('SIGINT', function (){
    process.emit('SIGINT');
  });
}

require('./index_api.model');
require('./menu_api.model');
