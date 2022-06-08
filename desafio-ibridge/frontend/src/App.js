import React, { useState, useEffect } from "react";
import './App.css';
import api from "./services/api";
import Dropdown from "./components/Dropdown";
import ReactLoading from 'react-loading';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { VictoryPie } from "victory";


function App() {
  const [data, setData] = useState();
  const [clientValue, setClientValue] = useState('cliente01');
  const [isData, setIsData] = useState(false);
  const [classCalendar, setClassCalendar] = useState('hide');
  const [firstDate, setFirstDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [formatedDate, setFormatedDate] = useState()
  const optionsClients = [
    { label: 'Cliente 01', value: 'cliente01' },
    { label: 'Cliente 02', value: 'cliente02' },
    { label: 'Cliente 03', value: 'cliente03' },
    { label: 'Cliente 04', value: 'cliente04' },
    { label: 'Cliente 05', value: 'cliente05' },
    { label: 'Cliente 06', value: 'cliente06' },
  ]
  let dataChart = []
    

  const handleChange = (event) => {
    setClientValue(event.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
    let json = await api.getDataList();
    setData(json)
    setIsData(true)
    let arrFirstDate = json[0][json[0].length - 1].geral.data.split('-')
    setFirstDate(arrFirstDate[1] + '-' + arrFirstDate[2] + '-' + arrFirstDate[0])
    let arrLastDate = json[0][0].geral.data.split('-')
    setLastDate(arrLastDate[1] + '-' + arrLastDate[2] + '-' + arrLastDate[0])
    }

    loadData();
  }, []);

  function openCalendar(){
    setClassCalendar(classCalendar === 'hide' ? 'show' : 'hide')
    
  }

  function printDay(valueData){
    dataChart.splice(0, dataChart.length)
    setClassCalendar(classCalendar === 'hide' ? 'show' : 'hide')
    let returnDate = formatedActualDate(valueData)
    data[0].forEach(function(element){
      if(element.geral.data === returnDate){
        console.log(element)
        dataChart.push(element.clientes[clientValue].chamadas_abandono_fila)
        dataChart.push(element.clientes[clientValue].chamadas_abandono_pre_fila)
        dataChart.push(element.clientes[clientValue].chamadas_atendimento_humano)
        dataChart.push(element.clientes[clientValue].chamadas_atendimento_maquina)
        dataChart.push(element.clientes[clientValue].chamadas_atendimento_pa)
        dataChart.push(element.clientes[clientValue].chamadas_falha_operadora)
        dataChart.push(element.clientes[clientValue].chamadas_nao_atendida)
        dataChart.push(element.clientes[clientValue].chamadas_telefone_incorreto)
        dataChart.push(element.clientes[clientValue].chamadas_total)
        console.log(dataChart)
      }
    })
  }

  function formatedActualDate(date){
    var data = date,
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), 
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        setFormatedDate(diaF+"-"+mesF+"-"+anoF)
        return (anoF+"-"+mesF+"-"+diaF)
}

  if(isData){
    return(
      <>
    <Dropdown
        label=""
        options={optionsClients}
        value={clientValue}
        onChange={handleChange}
      />
    <input
    disabled={true}
    value={formatedDate}/>
    <Calendar
    activeStartDate={new Date(firstDate)}
    onClickDay={printDay}
    className={classCalendar}
    minDate={new Date(firstDate)}
    maxDate={new Date(lastDate)}
    />
    <p>Cliente {clientValue}</p>
    <button onClick={openCalendar}><img src="https://portais.univasf.edu.br/reitoria/imagens/Calendrio.png/@@images/image.png"/></button>
    <VictoryPie data={[
    { x: "Cats", y: 35 },
    { x: "Dogs", y: 40 },
    { x: "Birds", y: 55 }
  ]}/>

    </>
    
    )
  } else{
    return(
      <ReactLoading type={'spokes'} color={'#000'} height={667} width={375} />
    )
  }
}

export default App;
