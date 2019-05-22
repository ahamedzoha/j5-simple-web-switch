//CLIENT SIDE JS
// IT'S SOLE PURPOSE IS TO CAPTURE THE INPUT FROM BROWSER AND EMIT THEM VIA "ledState"

var socket = io.connect(window.location.hostname + ':' + 3000)

let ledBlue = document.getElementById('shwitch')
let ledRed = document.getElementById('shwitch2')

//FUNCTION THAT WILL EMIT THE STATE OF THE SWITCH IN THE BROWSER 

let emitValueBlue = (ledColor, checked) => {
    socket.emit('blueLedState', {
        ledColor: ledColor,
        checked: ledBlue.checked
    })
}

let emitValueRed = (ledColor, checked) => {
    socket.emit('redLedState', {
        ledColor: ledColor,
        checked: ledRed.checked
    })
}

//RECEIVE THE LED STATE FROM SERVER AND SET THE PAGE SWITCH STATE
socket.on('blueLedState', state => {
    ledBlue.checked = state.checked
    console.log(`Received checked state ${state.checked}`);
    console.log(`socket State ${state.ledColor}`);
})

socket.on('redLedState', state => {
    ledRed.checked = state.checked
    console.log(`Received checked state ${state.checked}`);
    console.log(`socket State ${state.ledColor}`);
})




//EVENT LISTENER TO ACTIVATE emitValue() FUNCTION IF 
//THERE IS ANY CHANGES TO THE STATE OF THE BROWSER SWITCH
ledBlue.addEventListener('change', emitValueBlue.bind(null, 'blue', this.checked))
ledRed.addEventListener('change', emitValueRed.bind(null, 'red', this.checked))



