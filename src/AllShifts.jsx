import React, { useState, useEffect } from 'react'

import moment from 'moment'


const TIME_OBJ_NAME = "TIME_OBJ_NAME"


export default function AllShifts({ timer }) {

  const [shifts, setShifts] = useState(null)
  const [totalSeconds, setTotalSeconds] = useState(0)


  useEffect(() => {
    let shiftsStr = localStorage.getItem(TIME_OBJ_NAME)
    console.log(JSON.parse(shiftsStr))
    setShifts(JSON.parse(shiftsStr))
  }, [timer])

  function getDiff(start, end){
    let diff = new Date(end).getTime() -  new Date(start).getTime()
    return parseInt(diff / 1000);
  }

  function getTotalTime() {
    let totalSecondsTmp = 0
    Object.keys(shifts).map(key => {
      totalSecondsTmp += getDiff(shifts[key]["start"], shifts[key]["end"])

    })
    setTotalSeconds(totalSecondsTmp)
  }

  function showTime(time){
    return moment(time).format('LTS')
  }




  function showClock(time){
    let minutes, seconds, hours
    seconds = parseInt(time % 60, 10);
    minutes = parseInt(time / 60 % 60 , 10)
    hours = parseInt(time / 3600, 10);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div>
      <button onClick={getTotalTime}>show total</button>
      <span>{showClock(totalSeconds)}</span>
      <h1>AllShifts</h1>
      <table>
        <thead>

          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>



          {shifts && Object.keys(shifts).map(key => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{showTime(shifts[key].start)}</td>
                <td>{showTime(shifts[key].end)}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}
