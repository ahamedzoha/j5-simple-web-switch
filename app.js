const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(__dirname + '/public'));

five.Board().on('ready', () => {
  console.log(`Arduino is Ready!`);

  let led = new five.Led(13)

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
      console.log(`Client disconnected`);
    })

    socket.on('ledState', (state) => {
      if (state == true) {
        led.on()
        console.log(`Turned lights on!`);
      }
      else if (state == false) {
        led.off()
        console.log(`Turned lights off!`);
      }
    })
    
  })

})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
