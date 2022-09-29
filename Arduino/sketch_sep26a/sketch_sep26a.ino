int led = 14; // set the "led" variable as 14 - D5 ESP8266
int sonar_echo = 13; // set the "sonar_echo" variable as 13 - D7 ESP8266
int sonar_trigger = 12; // set the "sonar_trigger" variable as 12 - D6 ESP8266

//define sound velocity in cm/uS
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701

long duration;
float distance_cm;
float distance_inch;

void setup() {
  Serial.begin(115200);
  pinMode(led, OUTPUT);   // designate port 13 as output
  pinMode(sonar_trigger, OUTPUT);
  pinMode(sonar_echo, INPUT);
}
 
void loop() {
  digitalWrite(led, LOW);
  digitalWrite(sonar_trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(sonar_trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(sonar_trigger, LOW);

  duration = pulseIn(sonar_echo, HIGH);

    // Calculate the distance
  distance_cm = duration * SOUND_VELOCITY/2;
  
  // Convert to inches
  distance_inch = distance_cm * CM_TO_INCH;

  
  
//  digitalWrite(led, HIGH);   // turn the led on
//  delay(1000);               // wait for 1 second
//  digitalWrite(led, LOW);    // turn the led off
//  delay(1000);               // wait for a second
}
