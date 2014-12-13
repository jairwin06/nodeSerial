var serialport = require('serialport'),
SerialPort = serialport.SerialPort,
portName = process.argv[2];

var servi = require('servi');

var app = new servi(false);  //servi instance
app.port(8080);

var latestData = 0;

app.serveFiles("public");  //serve static HTML from public folder
app.route('/data', sendData);  //route requests for /data to sendData
//now that everything is configured, start the server:
app.start();

var myPort = new SerialPort(portName, {
	baudRate: 9600,
	//look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n")
});

myPort.on('open', showPortOpen);
myPort.on('data', saveLatestData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen() {
	console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function saveLatestData(data) {
	console.log(data);
	latestData = data;
}

function showPortClose() {
	console.log('port closed.');
}

function showError(error) {
	console.log('Serial port error: ' + error);
}

function sendData(request) {
	console.log("sending data to client");
	request.respond(latestData);
}