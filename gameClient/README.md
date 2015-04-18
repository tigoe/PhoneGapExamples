# BluetoothLE Beacon Game

This is a stub for the Bluetooth LE beacon game for my Understanding Networks class. It gontains enough information to login and logout of the game. You'll get a token back from the server when you login. You'll also get the service uuid and characteristic uuid that you need for the game. When you logout, the token will be erased from the server, and a new one will be generated on login.

Building the rest of the game client is up to you.

To use this example, create a new cordova project, and replace the www folder of your project with this project's www folder. You'll also need to get the URL of the server from me.

NOTE: this app makes cross-domain HTTP requests. CORS should be enabled by default, according to the [cordova documentation whitelist guide](http://cordova.apache.org/docs/en/4.0.0/guide_appdev_whitelist_index.md.html#Whitelist%20Guide).
