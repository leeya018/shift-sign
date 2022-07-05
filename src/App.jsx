import { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment'

import AllShifts from './AllShifts'
import { clear } from '@testing-library/user-event/dist/clear';

let timeInterval = null

const TIME_OBJ_NAME = "TIME_OBJ_NAME"

function App() {

  const [inShift, setInShift] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [timer, setTimer] = useState(0)

  
  // useEffect(() => {  
  //   let inShiftL = localStorage.getItem('inShift')
  //   if( localStorage.getItem(TIME_OBJ_NAME) == null){
  //     localStorage.setItem(TIME_OBJ_NAME,JSON.stringify({}))
  //   }

  //   if(inShiftL == null) {
  //     localStorage.setItem('inShift',false)
  //      inShiftL = localStorage.getItem('inShift')
  //     setInShift(false)

  //   }
  //   else if(inShiftL == "true"){
  //     setInShift(true)
  //   }else{
  //     setInShift(false)
  //   }
  // }, [])

  // useEffect(() => { 
  //   localStorage.setItem('inShift',inShift)


  //  }, [inShift])

  useEffect(() => {  
    if(localStorage.getItem(TIME_OBJ_NAME) == undefined){
      localStorage.setItem(TIME_OBJ_NAME,"{}")
    }
  }, [])


  function fetchData(){
    let today = new Date()
    let timestr = localStorage.getItem(TIME_OBJ_NAME)
    let timeObject = JSON.parse(timestr)
    setStart(timeObject[moment(today).format('l')]["start"])
    setEnd(timeObject[moment(today).format('l')]["end"])

  }
  function clearData(){
    localStorage.setItem(TIME_OBJ_NAME,'')
    localStorage.setItem('inShift',false)
  }
  function clearAll(){
    localStorage.clear()
  }

  // function startTimer(time){
  //   setTimer(moment(new Date()).format('LTS'))
  //   timeInterval = setInterval(() => {
  //     var timer = duration, minutes, seconds;
  //     let currTime = moment(new Date()).format('LTS') // change by moment 
  //     setTimer(currTime)
  //   }, 1000);

    function startTimer() {
      timeInterval = setInterval(function () {
      setTimer(timer + 1)
      }, 1000);
  
  }

  function stopTimer(){
    clearInterval(timeInterval)
    setTimer(0)
  }
  function updateTime(){
    let timestr = localStorage.getItem(TIME_OBJ_NAME)
    let timeObject = JSON.parse(timestr)
    let todayKey = moment(new Date()).format('l')
    if(timeObject[todayKey] == undefined){
      timeObject[todayKey] = {}
    }
    if(inShift){
      timeObject[todayKey]["end"] = new Date()
      stopTimer()
    }else{
      let startTime = new Date()
      timeObject[todayKey]["start"] = startTime
      startTimer(startTime)

    }
    localStorage.setItem(TIME_OBJ_NAME,JSON.stringify(timeObject))

    setInShift(!inShift)
  }

  function getTimeStr(){
    let minutes, seconds
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);
    
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds
  }

  return (
    <div className="App">
      <h1>tarnitariontsiare</h1>

      <button onClick={updateTime}>{inShift? 'stop time ' : 'start time'}</button>
      <button onClick={fetchData}>show data</button>
      <div>
        {`shift data : ${moment(start).format('LLL')} - ${moment(end).format('LLL')}`}
      </div>
      <button onClick={clearData}>clear data </button>
      <button onClick={clearAll}>clear all </button>
      <div>
        <span>{timer!==0 && `time in shift : ${ getTimeStr() }`}</span>
      </div>
      <AllShifts />

    </div>
  );
}

export default App;
