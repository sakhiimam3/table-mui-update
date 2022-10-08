import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import { Button, Checkbox } from '@material-ui/core';
import { Delete, MoreVert } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { TableSelector, TableallData, deleteTable, updateTable } from "./TableSlice"
import FormModal from '../components/formModal';
import TableModal from '../components/formModal';
const data = [
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


function Table() {
    const dispatch = useDispatch()
    const { tableList } = useSelector(TableSelector)
    const [filter, setFilter] = useState(null)
    // handle filter button 
    const handleCheckBox = () => {
        setFilter(true)
        if (filter === true) {
            setFilter(false)
        } else {
            setFilter(true)
        }
    }

    useEffect(() => {

        dispatch(TableallData())


    }, [])

    // handle delete all 
    const handlDeleteAll = () => {
        alert("")
    }


    const data = tableList.map(item => ({ ...item }))

    const columns = [
        { title: "Id", field: "id", },
        { title: "Name", field: "name", sorting: true, filterPlaceholder: "filter by Name", cellStyle: { background: "#E6A496 " }, headerStyle: { color: "white" }, sorting: true },
        { title: "Email", field: "email", filterPlaceholder: "filter by email", sorting: true },
        { title: "Phone Number", field: "phone", filterPlaceholder: "filter by ph:no", align: "center", grouping: false, sorting: true },
        { title: "Address", field: "address", filterPlaceholder: "filter by address", sorting: true },
        { title: "City", field: "city", filterPlaceholder: "filter by city", sorting: true },
    ]
    return (

        <div className="table_App">

            <h1 align="center">Material DataTable</h1>

            <Checkbox
                onChange={handleCheckBox}

            >

            </Checkbox>
            <span>Filter</span>
            <div className='modal-popup'>
                <TableModal />
            </div>
            <MaterialTable columns={columns} data={data}

                editable={{

                    onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                        dispatch(updateTable(oldRow.id, newRow))
                        resolve()
                    }),
                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {

                        dispatch(deleteTable(selectedRow.id))
                        resolve()


                    })
                }}
                actions={[

                    {
                        icon: () => <Delete style={{ color: 'red' }} />,
                        tooltip: "Delete All",
                        onClick: () => handlDeleteAll(),
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
                    headerStyle: { background: "#f44336", color: "#fff" }
                }}
                title="Student Information"
                icons={{ Add: () => <AddIcon /> }} />
        </div>
    );
}

export default Table;