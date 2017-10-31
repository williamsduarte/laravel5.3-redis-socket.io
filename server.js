/**
 * Created by amitavroy on 26/02/17.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(3000);
io.on('connection', function (socket) {
  console.log('Client connected');
  var redisClient = redis.createClient();

  redisClient.subscribe('globalNotificationChannel');

  redisClient.on("message", function (channel, message) {
    message = JSON.parse(message);
    socket.emit(channel + ':user-'+ message.user_id, message);
  });

  redisClient.on('disconnect', function () {
    redisClient.quit();
  });

});