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

//CHART

let ctx = document.getElementById('sensorGraph')

let sensorChart = new Chart(ctx, {
    type: 'line',
    data: {
        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Combustible gas',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            showLines: false
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 60
                }
            }]
        },
        elements: {
            line: {
                tension: 0
            }
        },
        animation: {
            duration: 0
        },
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0
    }
})

console.log(moment().format("h:mm:ss a"));

let addData = (chart, label, data) => {
    chart.data.labels.push(label)
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data)
    });
    chart.update();
}


let removeData = (chart) => {
    console.log(`Grapha array length: ${chart.data.datasets[0].data.length}`);
    if (chart.data.datasets[0].data.length > 100) {
        chart.data.labels.shift()
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift()
        });
        chart.update()
    }
}

let timex = moment().seconds()

//RECEIVE SENSORDATA
socket.on('sensordata', data => {
    addData(sensorChart, timex, data)
    removeData(sensorChart)
})


