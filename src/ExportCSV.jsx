import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import "./ExportCSV.css"
import moment from 'moment'


export default function ExportCSV({ObjData, fileName}){

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    function fromObjectToArray(){
        let arr = []
        Object.keys(ObjData).map(key => {
            let item = {date: key, start: showTime(ObjData[key].start), end : showTime(ObjData[key].start)}
            arr.push(item)
        })
        return arr
    }

    function showTime(time){
        return moment(time).format('LTS')
      }
    

    function exportToCSV() {
        let csvData  = fromObjectToArray()
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className='export-button' variant="warning" onClick={exportToCSV}>Export</button>
    )
}