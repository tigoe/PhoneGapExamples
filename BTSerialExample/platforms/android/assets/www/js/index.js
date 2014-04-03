/*
    SimpleSerial index.js
    Created 7 May 2013
    Modified 12 Mar 2014
    by Tom Igoe and Robyn Overstreet
*/


var app = {
    macAddress: "",  // get your mac address from bluetoothSerial.listPorts()
    chars: "",
  
/*
    Application constructor
 */
    initialize: function() {
        this.bindEvents();
        console.log("Starting BT Serial app");
    },
/*
    bind any events that are required on startup to listeners:
*/
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        connectButton.addEventListener('touchend', app.manageConnection, false);
        latchButton.addEventListener('touchend', app.moveLatch, false);
        selectDevice.addEventListener('change',app.PickDevice, false);
    },

/*
    this runs when the device is ready for user interaction:
*/
    onDeviceReady: function() {
        // check to see if Bluetooth is turned on.         
         var address;
     
        console.log('device ready!');
 
        //if isEnabled(), below, returns success:
        var listPorts = function() {
        		app.clear();
        		app.display("Searching for BT Serial devices...");
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    app.display(JSON.stringify(results));
                    app.display(results);
   
   					// result is an array of JSON objects. 
   					// iterate over it and pull out relevant elements.
   					// on iOS, address is called uuid. On Android it's called address:                  
                    for (i=0; i<results.length; i++) {
                    		if (results[i].uuid) {
	                    		address = results[i].uuid;
                    		}
                    if (results[i].address) {
	                    		address = results[i].address;
                    		}
                    selectDevice.innerHTML += '<option value="' +
                        address + '">' +
                        results[i].name +
                        ' </option>';  
                    }
                    if (results.length == 0) {
	                    app.display("No BT Serial devices found");
                    }
                    // use the first item from the list as your address:
                    app.macAddress = selectDevice.options[selectDevice.selectedIndex].value;
                    app.display(selectDevice.options[selectDevice.selectedIndex].value);                
                },
                function(error) {
                    app.display(JSON.stringify(error));
                }
            );       
        };

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            app.display("Bluetooth is not enabled.");
        };

         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    },
/*
    Connects if not connected, and disconnects if connected:
*/
    manageConnection: function() {
        // connect() will get called only if isConnected() (below)
        // returns failure. In other words, if not connected, then connect:
        var connect = function () {
            // if not connected, do this:
            // clear the screen and display an attempt to connect
            console.log("Attempting to connect...");

            app.clear();
            app.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            bluetoothSerial.connect(
                app.macAddress,  // device to connect to
                app.openPort,    // start listening if you succeed
                app.showError    // show the error if you fail
            );
        };

        // disconnect() will get called only if isConnected() (below)
        // returns success  In other words, if  connected, then disconnect:
        var disconnect = function () {
            app.display("attempting to disconnect");
            // if connected, do this:
            bluetoothSerial.disconnect(
                app.closePort,     // stop listening to the port
                app.showError      // show the error if you fail
            );
        };

        // here's the real action of the manageConnection function:
        bluetoothSerial.isConnected(disconnect, connect);
    },
/*
    subscribes to a Bluetooth serial listener for newline
    and changes the button:
*/
    openPort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Connected to: " + app.macAddress);
        // change the button's name:
        connectButton.innerHTML = "Disconnect";
        // set up a listener to listen for newlines
        // and display any new data that's come in since
        // the last newline:
        bluetoothSerial.subscribe('\r\n', function (data) {
               app.clear();
               app.display(data);          
        });
    },

/*
    unsubscribes from any Bluetooth serial listener and changes the button:
*/
    closePort: function() {
        // if you get a good Bluetooth serial connection:
        app.display("Disconnected from: " + app.macAddress);
        // change the button's name:
        connectButton.innerHTML = "Connect";
        // unsubscribe from listening:
        bluetoothSerial.unsubscribe(
                function (data) {
                    app.display(data);
                },
                app.showError
        );
    },
    
    // send an x to move the latch:
    moveLatch: function() {
       bluetoothSerial.write('x', function() {
            app.clear();
            app.display("Fired the latch");           
        });
    },
    
    pickDevice: function(){
      app.display('pick device fired');
       app.macAddress = selectDevice.options[selectDevice.selectedIndex].value;
       app.display(selectDevice.options[selectDevice.selectedIndex].value);
    },
/*
    appends @error to the message div:
*/
    showError: function(error) {
        app.display(error);
    },

/*
    appends @message to the message div:
*/
    display: function(message) {
        var display = document.getElementById("message"), // the message div
            lineBreak = document.createElement("br"),     // a line break
            label = document.createTextNode(message);     // create the label

        display.appendChild(lineBreak);          // add a line break
        display.appendChild(label);              // add the message node
    },
/*
    clears the message div:
*/
    clear: function() {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
};      // end of app

