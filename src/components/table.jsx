import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table'
import AddIcon from '@material-ui/icons/Add';
import { Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { TableSelector, TableallData, deleteTable, updateTable } from "../features/TableSlice"
import TableModal from '../components/formModal';


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


    const data = tableList.map(item => ({ ...item }))

    const columns = [
        { title: "Id", field: "id", },
        { title: "Name", field: "name", sorting: true, filterPlaceholder: "filter by Name", cellStyle: { background: "rgb(56 56 56) " }, headerStyle: { color: "white" }, sorting: true },
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

                onSelectionChange={(selectedRows) => console.log(selectedRows)}
                options={{
                    sorting: true, search: true,
                    searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
                    filtering: filter, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
                    paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "bottom", exportButton: true,
                    exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, selection: true,
                    showSelectAllCheckbox: false, showTextRowsSelected: true, selectionProps: rowData => ({
                    }),
                    columnsButton: true,
                    rowStyle: (data, index) => index % 2 === 0 ? { background: "rgb(50 48 48)", color: 'white' }
                        : { color: "white" },
                    headerStyle: { backgroundColor: "rgb(50 48 48)", color: "#fff" }
                }}
                title="Student Information"
                icons={{ Add: () => <AddIcon /> }} />
        </div>
    );
}

export default Table;