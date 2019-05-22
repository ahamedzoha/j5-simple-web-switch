//THIS IS ESSENTIALLY THE SERVER
//IT'S MAIN PURPOSE IS TO GET THE DATA FROM THE CLIENT AND SEND IT TO THE BOARD
//IT ALSO HANDLES ROUTES CREATED BY EXPRESS TO SERVE THE MAIN WEBPAGE

const five = require('johnny-five');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let ledState

let board = new five.Board({
  //port:"COM3" //SPECIFY PORT ON WINDOWS, LEAVE COMMENTED ON MAC or LINUX
})

//SERVE STATIC FILES FROM '/PUBLIC' DIRECTORY (CLIENT -> HTML, CSS & JS)
app.use(express.static(__dirname + '/public'));

//INITIALIZE JOHNNY FIVE BOARD
board.on('ready', () => {
  console.log(`Arduino is Ready!`);

  //INITIALIZE AN LED ON PIN 13 OF AN UNO BOARD
  const ledBlue = new five.Led(13)
  const ledRed = new five.Led(12)

  //ESTABLISH SOCKET CONNECTION
  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`);

    socket.on('disconnect', () => {
      console.log(`client ${socket.id} disconnected`);
    })

    //RECEIVE 'ledState -> true|false' FROM CLIENT AND CONDITIONALLY TURN LED ON OR OFF
    socket.on('ledState', (state) => {
      if (state.blue == true) {
        ledBlue.on()
        console.log(`Turned blue lights on!`);
      }
      else if (state.blue == false) {
        ledBlue.off()
        console.log(`Turned blue lights off!`);
      }
      else if (state.red == true) {
        ledRed.on()
        console.log(`Turned red lights on!`);
      }
      else if (state.red == false) {
        ledRed.off()
        console.log(`Turned red lights off!`);
      }

      //SEND THE STATE OF LED TO THE CLIENTS SO THAT,
      //IF ONE SWITCHES THE LIGHT ON, IT SHOWS ON ALL CLIENTS
      console.log(state);
      
      io.emit('ledState', state)
    })

  })

})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
