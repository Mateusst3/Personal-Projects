import React, { useState, useEffect } from "react";
import './App.css';
import api from "./services/api";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    api
      .then((response) => setData(response))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function teste(){
    console.log(data)
  }

  return (
    <><h1>teste</h1>
    <button onClick={teste}></button></>
  );
}

export default App;
