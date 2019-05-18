# Johnny Five, SocketIO, Express
##### A very simple browser switch for an arduino LED

In this project, 
I created a front-end (using HTML, CSS & JS) and back-end (using Express, SocketIO & Johnny Five) to have a simple web switch that switches an LED connected to an Arduino UNO to turn on and off. 

This is relatively straightforward if you understand the concept of web sockets and arduino which I didn't during this project.

This is meant to be a starter for anyone who seems to be interested in IOT and wants to get their hands dirty.

## What will you need for this project
- Arduino board (preferably UNO)
- 1 LED
- 1 220 Ohm resistor
- Necessary jumper wires
- Breadboard (recommended) 
- A computer

<img src="https://imgur.com/07SiAko">

## Instructions
1. Clone the repository in your desired directory location.
2. Connect board to computer.
2. Download Arduino IDE and upload StandartFirmata from Examples. [See how to](https://www.instructables.com/id/Arduino-Installing-Standard-Firmata/)
4. Disconnect the board from computer.
3. Create the circuit as shown in the diagram.
4. Open the cloned code directory and run `npm install`, this will download and install the necessary dependencies.
5. Re-connect the board to computer.
6. Run `npm run dev` to initiate the code. This will setup the webpage and the server.
7. Now head over to http://localhost:3000. If everything went accordingly, you should see no errors in console and the webpage.
8. Have fun switching the LED on/off!



