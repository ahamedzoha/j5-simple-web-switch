
var socket = io.connect(window.location.hostname + ':' + 3000)

let led = document.getElementById('shwitch')

let emitValue = () => {
    socket.emit('ledState',led.checked)
}

led.addEventListener('change', emitValue.bind())


