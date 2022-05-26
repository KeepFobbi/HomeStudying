import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import MUIDataTable from "mui-datatables";

import { useTable } from 'react-table'

import makeData from './makeData'


function InfoTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table size="medium" aria-label="a dense table">
        <TableBody>
          {props.data.map((item,index) => {
            if(!item.hiden){
              return (
                <TableRow key={'tr'+index}>
                  {item.data.map((subItem, subIndex) => {
                    if (index === 1) {
                      return (
                        <TableCell key={'tc'+subIndex} component="th" scope="row">{subItem}
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell key={'tc'+subIndex} align="left">{subItem}</TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            }            
          })}

        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InfoTable