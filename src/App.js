import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import { Button, Checkbox } from '@material-ui/core';
import { Delete ,MoreVert} from '@material-ui/icons';
const data=[
  { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
  { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
  { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
  { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
  { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", fee: 748521 },
  { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
  { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
  { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
  { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
  { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
  { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
  { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
]


function App() {
  const [tableData, setTableData] = useState(data)
  const [filter,setFilter]=useState(null)

// handle filter button 
const handleCheckBox=()=>{
     setFilter(true)
     if(filter === true){
         setFilter(false)
     }else{
         setFilter(true)
     }
}

// handle delete all 
const handlDeleteAll=()=>{
  setTableData([])
}

  const columns = [
    { title: "Name", field: "name", sorting: false, filterPlaceholder: "filter by Name" ,cellStyle: { background:"#E6A496 " }, headerStyle: { color: "white" } },
    { title: "Email", field: "email", filterPlaceholder: "filter by email" },
    { title: "Phone Number", field: "phone", filterPlaceholder: "filter by ph:no", align: "center", grouping: false },
    {
      title: "Age", field: "age " , filterPlaceholder: "filter by age"  , emptyValue: () => <em>null</em>,
      render: (rowData) => <div style={{ background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",borderRadius:"4px",paddingLeft:1 }}>{rowData.age >= 18 ? "18+" : "18-"}</div>,
       searchable: false, export: false
    },
    { title: "Gender", field: "gender", filterPlaceholder: " Gender", lookup: { M: "Male", F: "Female" } },
    { title: "City", field: "city",filterPlaceholder:"filter by city" },
    { title: "School Fee", field:  "fee",filterPlaceholder: "filter by fee" ,type: "currency", currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
    cellStyle: { background:"#grey" }, headerStyle: { color: "white" } },
  ]
  return (
    <div className="App">
      <h1 align="center">Material DataTable</h1>
      <Checkbox
      onChange={handleCheckBox}
      
      > 
      
      </Checkbox> 
      <span>Filter</span>
      <MaterialTable columns={columns} data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 500)
          }),
          onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[oldRow.tableData.id] = newRow
            setTableData(updatedData)
            setTimeout(() => resolve(), 500)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData.splice(selectedRow.tableData.id, 1)
            setTableData(updatedData)
            setTimeout(() => resolve(), 1000)

          })
        }}
        actions={[
          {
            icon: () => <MoreVert  style={{color:'green'}} />,
            tooltip: "table customization",
            onClick: (e, data) =>alert("hello"),
          },
          {
            icon: () => <Delete  style={{color:'red'}} />,
            tooltip: "Delete All",
            onClick: () =>handlDeleteAll(),
          }
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: filter, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
          showSelectAllCheckbox: false, showTextRowsSelected: true, selectionProps: rowData => ({
            // disabled: rowData.age == null,
            // color:"primary"
          }),
        columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336",color:"#fff"}
        }}
        title="Student Information"
        icons={{ Add: () => <AddIcon /> }} />
    </div>
  );
}

export default App;