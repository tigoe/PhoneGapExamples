#include <SoftwareSerial.h>

SoftwareSerial redBearSerial(10, 11); // RX, TX

void setup() {
  // initialize the servo on pin 8:
  pinMode(8, OUTPUT);
  // open serial communications to BTMate:
  Serial.begin(115200);
  // open serial communications to RBMini:
  redBearSerial.begin(57600);
}

void loop() {
  // listen for serial from BTMate:
  if (Serial.available()) {
    char input = Serial.read();
    // send x or X to close the latch:
    if (input == 'X' || input == 'x') {
      digitalWrite(8, HIGH);
      Serial.println("latch open");
      delay(500);
      digitalWrite(8, LOW);
      Serial.println("latch closed");
    }
  }
  
  // listen for serial from BMIni:
   if (redBearSerial.available()) {
    char input = redBearSerial.read();
    // send x or X to close the latch:
    if (input == 'X' || input == 'x') {
      digitalWrite(8, HIGH);
      redBearSerial.println("latch open");
      delay(500);
      digitalWrite(8, LOW);
      redBearSerial.println("latch closed");
    }
  }
}
