import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import MUIDataTable from "mui-datatables";
import Grid from '@material-ui/core/Grid';

import { useTable } from 'react-table'

import makeData from './makeData'


function SearchedTable(props) {
  let columns = props.tableDescription.columns
  let data = props.tableDescription.data

  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    onRowClick: props.clickAction,
    rowHover: true,
    sortOrder: props.sortOrder,
    setRowProps: (row, dataIndex, rowIndex) => { 
      return {style: {backgroundColor: row[1]?'':'antiquewhite'}} 
    }
  };
  return (
    <>
      <MUIDataTable
        title={props.tableTitle?props.tableTitle:"Не названая таблица"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  )
}

export default SearchedTable