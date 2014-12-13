var serialport = require("serialport");  //include the library
var SerialPort = serialport.SerialPort;  //make a local directory of it

//list serial ports
serialport.list(function (err, ports) {
	ports.forEach(function(port) {
		console.log(port.comName);
	});
});