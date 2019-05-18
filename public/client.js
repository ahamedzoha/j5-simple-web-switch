//CLIENT SIDE JS
// IT'S SOLE PURPOSE IS TO CAPTURE THE INPUT FROM BROWSER AND EMIT THEM VIA "ledState"

var socket = io.connect(window.location.hostname + ':' + 3000)

let led = document.getElementById('shwitch')

//FUNCTION THAT WILL EMIT THE STATE OF THE SWITCH IN THE BROWSER 
let emitValue = () => {
    socket.emit('ledState',led.checked)
}

//EVENT LISTENER TO ACTIVATE emitValue() FUNCTION IF 
//THERE IS ANY CHANGES TO THE STATE OF THE BROWSER SWITCH
led.addEventListener('change', emitValue.bind())


