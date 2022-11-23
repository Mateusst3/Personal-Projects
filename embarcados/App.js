import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios"
import {useEffect, useState} from 'react'
import Constants from 'expo-constants';


export default function App() {
  const [response, setResponse] = useState()
  const fetchData = () => {
    const baseURL = "";
    axios.get(`http://192.168.5.104:8080`).then((response) => setResponse(response.data));
  };

  useEffect(() => {
  }, setInterval(fetchData(), 1000),[])
  if(!response){return<></>}

  else{
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Distância:</Text>
      <Text style={styles.paragraph}>{response[response.length - 1].distance} metros</Text>
      <Text style={styles.paragraph}>Distancias passadas:</Text>
      <div style={styles.div}>
      {response.map(
        element => {
          return(
            <Text style={styles.paragraph}>
              {element.distance},
            </Text>
          )
        }
      )}
      </div>
      <StatusBar style="auto" />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  },
  paragraph: {
    fontWeight: 'bold',
    fontSize: '50px'
  },
  div: {
    display: 'flex'
  }
});
