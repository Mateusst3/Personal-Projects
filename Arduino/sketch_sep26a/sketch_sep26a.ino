#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

int buzzer = 14; // set the "buzzer" variable as 14 - D5 ESP8266
int sonar_echo = 13; // set the "sonar_echo" variable as 13 - D7 ESP8266
int sonar_trigger = 12; // set the "sonar_trigger" variable as 12 - D6 ESP8266

const float som = 34300.0; // Velocidade do som em cm/s
const float limite1 = 30.0; // Limites minimo para o buzzer ativar
const float limite2 = 20.0;
const float limite3 = 10.0;
const float limite4 = 5.0;

void setup() {
  
  Serial.begin(115200);
  pinMode(buzzer, OUTPUT);
  pinMode(sonar_trigger, OUTPUT);
  pinMode(sonar_echo, INPUT);
  WiFi.begin("Roteador de baixo", "teixeira");   //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(500);
    Serial.println("Waiting for connection");
  }
}
 
void loop() {
  HTTPClient http;  //Declare an object of class HTTPClient
  WiFiClient wifiClient;
  inicializarTrigger();                                
  float distancia = calcularDistancia();
  String buf;
  buf += F("http://192.168.5.102:8080/?distance=");
  buf += String(distancia, 6);
    Serial.print(buf);
  http.begin(wifiClient, buf);
  http.addHeader("Cache-Control","no-cache");
  int httpCode = http.POST("");
  if (httpCode > 0) { //Check the returning code
      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);             //Print the response payload
  }
  
  if (distancia < limite1){
  // Dispara os alertas
    alertas(distancia);
  }
  http.end();
  delay(500);
}

void alertas (float distancia){
  // Se a distância estiver entre o limite1 e o limite2
  if (distancia < limite1 && distancia >= limite2){
    tone(buzzer, 1500, 50);
  }
    // Se a distância estiver entre o limite2 e o limite3
  else if (distancia < limite2 && distancia >= limite3){
    tone(buzzer, 2000, 100);
  }
  
  // Se a distância estiver entre o limite3 e o limite4
  else if (distancia < limite3 && distancia >= limite4){
    tone(buzzer, 2750, 150);
  }
  
  // Se a distância for menor que o limite4
  else if (distancia < limite4){
    tone(buzzer, 3000, 200);
    delay(2);
    tone(buzzer, 3000, 200);
    delay(2);
    tone(buzzer, 3000, 200);
  }
}

float calcularDistancia(){
  unsigned long time = pulseIn(sonar_echo, HIGH);
  float distancia = time* 0.000001 * som / 2.0;
  Serial.print("Distância é de ");
  Serial.print(distancia);
  Serial.print("cm");
  Serial.println();
  return distancia;
}

void inicializarTrigger(){
  digitalWrite(sonar_trigger, LOW);
  delayMicroseconds(2);
  digitalWrite(sonar_trigger, HIGH);
  delayMicroseconds(10);
  digitalWrite(sonar_trigger, LOW);
}
