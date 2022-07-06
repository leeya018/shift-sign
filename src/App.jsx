import { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment' 

import AllShifts from './AllShifts'

let timeInterval = null

const TIME_OBJ_NAME = "TIME_OBJ_NAME"

function App() {

  const [inShift, setInShift] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [timer, setTimer] = useState(0)
  const [stop, setStop] = useState(false)
  const [timerStr, setTimerStr] = useState("00:00:00")



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
    if (localStorage.getItem(TIME_OBJ_NAME) == undefined) {
      localStorage.setItem(TIME_OBJ_NAME, "{}")
    }
  }, [])

  useEffect(() => {
    if(stop){
      setTimer(0)
      setTimeout(() => {
        setStop(false)
      }, 1000);
    }
    if (timer && !stop) {
      setTimeout(() => {
        setTimer(timer + 1)
      }, 1000);
      updateTimerStr(timer)
    }
  }, [timer])



  function fetchData() {
    let today = new Date()
    let timestr = localStorage.getItem(TIME_OBJ_NAME)
    let timeObject = JSON.parse(timestr)
    setStart(timeObject[moment(today).format('l')]["start"])
    setEnd(timeObject[moment(today).format('l')]["end"])

  }
  function clearData() {
    localStorage.setItem(TIME_OBJ_NAME, '')
    localStorage.setItem('inShift', false)
  }
  function clearAll() {
    localStorage.clear()
  }


  function updateTime() {
    let timestr = localStorage.getItem(TIME_OBJ_NAME)
    let timeObject = JSON.parse(timestr)
    let todayKey = moment(new Date()).format('l')
    if (timeObject[todayKey] == undefined) {
      timeObject[todayKey] = {}
    }
    if (inShift) {
      timeObject[todayKey]["end"] = new Date()

      setStop(true)
    } else {
      let startTime = new Date()
      timeObject[todayKey]["start"] = startTime

      setTimer(1)

    }
    localStorage.setItem(TIME_OBJ_NAME, JSON.stringify(timeObject))

    setInShift(!inShift)
  }

  function updateTimerStr(time) {
    let minutes, seconds, hours
    seconds = parseInt(time % 60, 10);
    minutes = parseInt(time / 60 % 60 , 10)
    hours = parseInt(time / 3600, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    
    setTimerStr(`${hours}:${minutes}:${seconds}`)
  }

  return (
    <div className="app">
      <h1>Sign time</h1>

      <button onClick={updateTime}>{inShift ? 'stop time ' : 'start time'}</button>
      {/* <button onClick={fetchData}>show data</button>
      <div>
        {`shift data : ${moment(start).format('LLL')} - ${moment(end).format('LLL')}`}
      </div> */}
      {/* <button onClick={clearData}>clear data </button> */}
      <button onClick={clearAll}>clear all </button>
      <div>
        <span>{timerStr}</span>
      </div>
      <AllShifts timer={timer} />
      {/* <span>{counter}</span> */}

    </div>
  );
}

export default App;
