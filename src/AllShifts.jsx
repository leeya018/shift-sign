import React, { useState, useEffect } from 'react'



const TIME_OBJ_NAME = "TIME_OBJ_NAME"


export default function AllShifts({ timer }) {

  const [shifts, setShifts] = useState(null)

  useEffect(() => {
    let shiftsStr = localStorage.getItem(TIME_OBJ_NAME)
    console.log(JSON.parse(shiftsStr))
    setShifts(JSON.parse(shiftsStr))
  }, [timer])

  return (
    <div>
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
                <td>{shifts[key].start}</td>
                <td>{shifts[key].end}</td>
              </tr>
            )
          })
          }
          {/* {shifts && shifts.map(function(object, key){
        return (
          <tr key={key}>
            <td>{key}</td>
            <td>{object[key].start}</td>
            <td>{object[key].end}</td>
          </tr>
        )
    })} */}

        </tbody>
      </table>
    </div>
  )
}
