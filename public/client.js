//CLIENT SIDE JS
// IT'S SOLE PURPOSE IS TO CAPTURE THE INPUT FROM BROWSER AND EMIT THEM VIA "ledState"

var socket = io.connect(window.location.hostname + ':' + 3000)

let ledBlue = document.getElementById('shwitch')
let ledRed = document.getElementById('shwitch2')

//FUNCTION THAT WILL EMIT THE STATE OF THE SWITCH IN THE BROWSER 

let stateC = {
    blue: ledBlue.checked,
    red: ledRed.checked
}

let emitValue = () => {
    socket.emit('ledState', stateC)
}
//RECEIVE THE LED STATE FROM SERVER AND SET THE PAGE SWITCH STATE
// socket.on('ledState', stateC => {
//     ledBlue.checked = stateC.blue
//     ledRed.checked = stateC.red
// })

//EVENT LISTENER TO ACTIVATE emitValue() FUNCTION IF 
//THERE IS ANY CHANGES TO THE STATE OF THE BROWSER SWITCH
ledBlue.addEventListener('change', emitValue.bind())
ledRed.addEventListener('change', emitValue.bind())



