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

  //INITIALIZE GAS SENSOR
  const mq2 = new five.Sensor("A0")

  //INITIALIZE RELAY 1 & 2 SEPARATELY
  const relay1 = new five.Relay(6)
  const relay2 = new five.Relay(5)

  //relay1.off()
  //relay2.off()
  let data

  //ESTABLISH SOCKET CONNECTION
  io.on('connection', (socket) => {
    console.log(`client ${socket.id} connected`);

    socket.on('disconnect', () => {
      console.log(`client ${socket.id} disconnected`);
    })

    //RECEIVE 'ledState -> true|false' FROM CLIENT AND CONDITIONALLY TURN LED ON OR OFF
    socket.on('blueLedState', (state) => {
      if (state.checked == true) {
        ledBlue.on()
        //relay1.on()
      }
      if (state.checked == false) {
        ledBlue.off()
        //relay1.off()
      }

      //SEND THE STATE OF LED TO THE CLIENTS SO THAT,
      //IF ONE SWITCHES THE LIGHT ON, IT SHOWS ON ALL CLIENTS
      console.log(state);
      io.emit('blueLedState', state)
    })

    socket.on('redLedState', state => {
      if (state.checked == true) {
        ledRed.on()
        //relay2.on()
      }
      if (state.checked == false) {
        ledRed.off()
        //relay2.off()
      }
      //SEND THE STATE OF LED TO THE CLIENTS SO THAT,
      //IF ONE SWITCHES THE LIGHT ON, IT SHOWS ON ALL CLIENTS
      console.log(state);
      io.emit('redLedState', state)

    })
    

    //TRANSMITTING SENSOR READINGS VIA sensordata SOCKET
    mq2.on("change", () => {
      data = mq2.scaleTo(0, 100)
      //setInterval(, 1000)
      socket.emit('sensordata', data)
      if(data > 30) {
        relay1.on()
        socket.on('redLedState', state => {
          ledRed.on()
          io.emit('redLedState', state)
        })
      }
    })

  })

})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server listening on http://localhost:${port}`);
