import React from 'react'

import {useState,useEffect} from 'react'


import ReactHTMLTableToExcel from 'react-html-table-to-excel';

// const About = () => {
//     return (
//         <div>
//         <h1>
//             i am madhubala agrawal
//         </h1>
//         </div>
//     )
// }
// function About(){
    export const About = ({excelData}) => {
  console.log(excelData + 'hi');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  useEffect(() => {
    setEditedData(
        [...excelData]
    )
    
  }, [excelData])
  const handleEdit = (index, key, value) => {
      const newArraySet = [...editedData];

  const updatedObject = { ...newArraySet[index] };
 
  updatedObject[key] = value;
 newArraySet[index] = updatedObject;
    setEditedData([...newArraySet]);
  };

  const saveEdit = (index) => {
    
    console.log("Saving edited data for index", index, ":", editedData[index]);
    setEditingIndex(-1); 
  };
    return (
      <div className="container">
          <h3 className="mt-3 text-success"><center>Export React Table Data into EXCEL Sheet</center></h3>
          <div className="row mt-4">
          <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success mb-3"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export Data to Excel Sheet"/>
             <table className="table" id="table-to-xls">
              <thead className="thead-dark">
              <tr>
                   <th scope='col'>ID</th>
    <th scope='col'>FirstName</th>
    <th scope='col'>LastName</th>
    <th scope='col'>Gender</th>
    <th scope='col'>Country</th>
    <th scope='col'>Age</th>
    <th scope='col'>Date</th>
    <th scope='col'>Actions</th> 

              </tr>
              </thead>
              {/* <tbody>
            
                   {excelData.map((res)=>
                      <tr>
                      <td>{res.ID}</td>
                      <td>{res.FirstName}</td>
                      <td>{res.LastName}</td>
                      <td>{res.Gender}</td>
                      <td>{res.Country}</td>
                      <td>{res.Age}</td>
                      <td>{res.Date}</td>
                      </tr>
                    )}   
                
              </tbody>    */}

<tbody>
            {editedData.map((res, index) => (
              <tr key={index}>
                <td>{res.ID}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.FirstName || res.FirstName}
                      onChange={(e) => handleEdit(index, 'FirstName', e.target.value)}
                    />
                  ) : (
                    res.FirstName
                  )}
                </td>
              
                <td>  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.LastName || res.LastName}
                      onChange={(e) => handleEdit(index, 'LastName', e.target.value)}
                    />
                  ) : (
                    res.LastName
                  )}</td>
                <td>  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.Gender || res.Gender}
                      onChange={(e) => handleEdit(index, 'Gender', e.target.value)}
                    />
                  ) : (
                    res.Gender
                  )}</td>
                <td> {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.Country || res.Country}
                      onChange={(e) => handleEdit(index, 'Country', e.target.value)}
                    />
                  ) : (
                    res.Country
                  )}</td>
                <td> {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.Age || res.Age}
                      onChange={(e) => handleEdit(index, 'Age', e.target.value)}
                    />
                  ) : (
                    res.Age
                  )}</td>
                <td> {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedData[index]?.Date || res.Date}
                      onChange={(e) => handleEdit(index, 'Date', e.target.value)}
                    />
                  ) : (
                    res.Date
                  )}</td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={() => saveEdit(index)}>Save</button>
                  ) : (
                    <button onClick={() => setEditingIndex(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
       </div>
      </div>
    );
    }
export default About;
