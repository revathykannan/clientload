const express = require('express');
var app = express();
const path = require("path");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const http = require('http');
const pid = process.pid;
const workers = Object.values(cluster.workers);

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})
let usersCount;
http.createServer((req, res) => {
  for (let i=0; i<1e7; i++); // simulate CPU work
  res.end(`Handled by process ${pid}`);
    res.end(`Users: ${usersCount}`);
}).listen(8000, () => {
  console.log(`Started process ${pid}`);
});

process.on('message', msg => {
    usersCount = msg.usersCount;
});
// Right after the fork loop within the isMaster=true block
cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log(`Worker ${worker.id} crashed. ` +
            'Starting a new worker...');
        cluster.fork();
    }
});
