//THIS IS ESSENTIALLY THE SERVER
//IT'S MAIN PURPOSE IS TO GET THE DATA FROM THE CLIENT AND SEND IT TO THE BOARD
//IT ALSO HANDLES ROUTES CREATED BY EXPRESS TO SERVE THE MAIN WEBPAGE

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let ledState

//SERVE STATIC FILES FROM '/PUBLIC' DIRECTORY (CLIENT -> HTML, CSS & JS)
app.use(express.static(__dirname + '/public'));

//INITIALIZE JOHNNY FIVE BOARD
five.Board().on('ready', () => {
  console.log(`Arduino is Ready!`);

  //INITIALIZE AN LED ON PIN 13 OF AN UNO BOARD
  let led = new five.Led(13)

  //ESTABLISH SOCKET CONNECTION
  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`);

    socket.on('disconnect', () => {
      console.log(`client ${socket.id} disconnected`);
    })

    //RECEIVE 'ledState -> true|false' FROM CLIENT AND CONDITIONALLY TURN LED ON OR OFF
    socket.on('ledState', (state) => {
      if (state == true) {
        led.on()
        console.log(`Turned lights on!`);
      }
      else if (state == false) {
        led.off()
        console.log(`Turned lights off!`);
      }
      io.emit('ledState', state)
    })

  })

})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
