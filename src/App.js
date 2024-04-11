import {useState,useEffect} from 'react'
import {About} from './About'
import {Data} from './Components/Data'
import {IndividualData} from './Components/IndividualData';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import * as XLSX  from 'xlsx'





function App() {



  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);
console.log(excelFile);






const [excelData, setExcelData]=useState(null);



const fileType=['application/vnd.ms-excel']
const handleFile = (e)=>{
  let selectedFile = e.target.files[0];
  if (selectedFile){
   console.log(selectedFile.type);
   if(selectedFile&&fileType.includes(selectedFile.type)){
    let reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload=(e)=>{
     
      setExcelFileError(null);
      setExcelFile(e.target.result);

    }
   }
   else{
     setExcelFileError('ple select excel file');
     setExcelFile(null);
   }
  }
else{
  console.log('plz select file');
}
}

//submit
const handleSubmit=(e)=>{
  e.preventDefault();
  if(excelFile!==null){
const workbook = XLSX.read(excelFile,{type:'buffer'});
const worksheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[worksheetName];
const data = XLSX.utils.sheet_to_json(worksheet);
setExcelData(data);

  }
  else{
    setExcelData(null);
  }
}

  return (
<div className="container">
  <div className='from'>
    <form className='from-group' autoComplete="off"
    onSubmit={handleSubmit}>
<label>
  <h5>Upload Excel File</h5>
</label>
<br></br>
<input type='file' className='from-control' 
onChange={handleFile} required>
</input>
{excelFileError&&<div className='text-danger' style={{marginTop:5+ 'px'}}>{excelFileError}</div>}
<button type='submit' className='btn btn-success' style={{marginTop:5+'px'}}>
Submit
</button>
</form>
</div>
<br></br>
<hr></hr>



<h5>View Excel File</h5>
<div className='viewer'>
{excelData===null&&<>No File Selected</>}
{excelData!== null&&(
  
<div className='table-responsive'>
<table className='table'>
<thead>
  <tr>
    <th scope='col'>ID</th>
    <th scope='col'>FirstName</th>
    <th scope='col'>LastName</th>
    <th scope='col'>Gender</th>
    <th scope='col'>Country</th>
    <th scope='col'>Age</th>
    <th scope='col'>Date</th>
  </tr>
</thead>
<tbody>
  {/* <Data excelData={excelData}/> */}
</tbody>

</table>
</div>

)}
   {excelData ? < About excelData={excelData} /> : ""}

  </div>  
</div>
  );
}

export default App;
