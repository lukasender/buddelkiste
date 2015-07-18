var stats = require('./stats');
var socket = require('socket.io');

var port = process.env.NODE_PORT || 4001;
var syncStatsThrehold = process.env.SYNC_STATS_THRESHOLD || 5;
var io = socket(port, {serveClient: false});

console.log('Mr. Robot is happily awaiting requests');
console.log('port:', port);

function postViewHandler(data) {
  var path = data.path;
  stats.updateStats(path, function(newValue) {
    io.emit('stats ' + path, {post: newValue});
  }, syncStatsThrehold);
}

io.on('connection', function(socket) {
  console.log('Aha! A client connected');
  socket.on('post view', postViewHandler);
});
