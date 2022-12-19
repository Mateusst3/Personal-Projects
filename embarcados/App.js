import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios"
import {useEffect, useState} from 'react'
import Constants from 'expo-constants';


export default function App() {
  const [response, setResponse] = useState()
  const fetchData = () => {
    const baseURL = "";
    axios.get(`http://localhost:8080/all`).then((response) => setResponse(response.data));
  };

  useEffect(() => {
    
  }, [setInterval(fetchData(), 1000)])
  if(!response){return<></>}

  else{
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Distância:</Text>
      <Text style={styles.paragraph}>{response[response.length - 1].distance} centimetros</Text>
      <Text style={styles.paragraph}>Distancias passadas:</Text>
      <div style={styles.div}>
      <h1>
      {response.map(
        element => {
          return(
            <Text style={styles.text2} key={response.indexOf(element)}>
              {element.distance},
            </Text>
          )
        }
      )}
      </h1>
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
    backgroundColor: '#ADD'
  },
  paragraph: {
    fontWeight: 'bold',
    fontSize: '50px'
  },
  text2: {
    fontWeight: 'bold',
    fontSize: '15px',
    clear: 'both',
    display: 'inline-block',
    overflow: 'hidden',
    whitespace: 'nowrap'
  },
  div: {
    display: 'flex'
  }
});
