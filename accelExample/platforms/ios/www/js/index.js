var app = {
/*
	location for the messageDiv, in percentage:
*/
	loc: {
		x: 10,
		y: 10
	},
/*
	Application constructor
*/
	initialize: function() {
		this.bindEvents();			// bind any UI events to listeners
		console.log("Starting Accelerometer app");
	},
/*
	bind any events that are required on startup to listeners:
*/
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('click', this.resetScreen, false);
	},

/*
	this runs when the device is ready for user interaction:
*/
	onDeviceReady: function() {
		// start watching the accelerometer:
		app.watchAcceleration();
	},

	watchAcceleration: function() {
		function success(acceleration) {
			// clear the messageDiv and add the accelerometer values:
			app.clear();
			app.display('X: ' + acceleration.x.toFixed(2));
			app.display('Y: ' + acceleration.y.toFixed(2));
			app.display('Z: ' + (acceleration.z - 9.80).toFixed(2));
			
			// set app.loc using the accelerometer values:
			app.loc.x -= acceleration.x;
			app.loc.y -= acceleration.y;
			
			// set the messageDiv style parameters using app.loc:
			//messageDiv.style.top = app.loc.y  + '%';
			//messageDiv.style.left = app.loc.x + '%';
		}
			
		function failure(error) {
			// if the accelerometer fails, display the error:
			app.display('Accelerometer error');
			app.display(error);
		}
			
		// taceh the accelerometer every 100ms:	
		var watchAccel = navigator.accelerometer.watchAcceleration(success, failure, {
			frequency: 100
		});
	},
	
	// reset the messageDiv to the center of the screen:
	resetScreen: function() {
		app.loc.x = 50;
		app.loc.y = 50;
		messageDiv.style.top = app.loc.y  + '%';
		messageDiv.style.left = app.loc.x + '%';
	},
	/*
		appends @message to the message div:
	*/
	display: function(message) {
		var label = document.createTextNode(message),
			lineBreak = document.createElement("br");
		messageDiv.appendChild(lineBreak);			// add a line break
		messageDiv.appendChild(label);				// add the text
	},
	/*
		clears the message div:
	*/
	clear: function() {
		messageDiv.innerHTML = "";
	}
};			// end of app