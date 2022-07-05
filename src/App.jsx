import { useEffect, useState } from 'react';
import './App.css';
import moment from 'moment'

import AllShifts from './AllShifts'

const TIME_OBJ_NAME = "TIME_OBJ_NAME"

function App() {

  const [inShift, setInShift] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')


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

  function updateTime(){
    let timestr = localStorage.getItem(TIME_OBJ_NAME)
    let timeObject = JSON.parse(timestr)
    let todayKey = moment(new Date()).format('l')
    if(timeObject[todayKey] == undefined){
      timeObject[todayKey] = {}
    }
    if(inShift){
      timeObject[todayKey]["end"] = new Date()
    }else{
      timeObject[todayKey]["start"] = new Date()
    }
    localStorage.setItem(TIME_OBJ_NAME,JSON.stringify(timeObject))

    setInShift(!inShift)
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
      <AllShifts />
      
    </div>
  );
}

export default App;
