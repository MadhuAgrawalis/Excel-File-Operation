import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({excelData}) => {
    console.log(excelData + 'datas');
    return excelData.map((individualExcelData)=>(

        <tr key={individualExcelData.Id}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>
    ))
}