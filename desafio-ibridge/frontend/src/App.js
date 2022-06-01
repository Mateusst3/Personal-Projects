import React, { useState, useEffect } from "react";
import './App.css';
import api from "./services/api";
import Dropdown from "./components/Dropdown";
import ReactLoading from 'react-loading';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


function App() {
  const [data, setData] = useState();
  const [value, setValue] = useState();
  const [isData, setIsData] = useState(false)
  const optionsClients = [
    { label: 'Cliente 01', value: 'cliente01' },
    { label: 'Cliente 02', value: 'cliente02' },
    { label: 'Cliente 03', value: 'cliente03' },
    { label: 'Cliente 04', value: 'cliente04' },
    { label: 'Cliente 05', value: 'cliente05' },
    { label: 'Cliente 06', value: 'cliente06' },
  ]
  const [classCalendar, setClassCalendar] = useState('hide')

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
    let json = await api.getDataList();
    setData(json)
    setIsData(true)
    }

    loadData();
  }, []);

  function teste(){
    console.log(data)
    setClassCalendar(classCalendar === 'hide' ? 'show' : 'hide')
  }

  if(isData){
    return(
      <>
    <Dropdown
        label=""
        options={optionsClients}
        value={value}
        onChange={handleChange}
      />
    <Calendar
    className={classCalendar}
    />
    <p>We eat {value}!</p>
    <button onClick={teste}></button></>
    )
  } else{
    return(
      <ReactLoading type={'spokes'} color={'#000'} height={667} width={375} />
    )
  }
}

export default App;
