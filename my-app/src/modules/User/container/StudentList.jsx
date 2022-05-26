import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as usersActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as USERS } from '../reducer'
import { actions as rootActions } from '../../Root/actions'
import { Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import SearchedTable from "../../../components/SearchedTable"

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function mapStateToProps(state) {
  return {
    ...state[USERS],
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...usersActions,
  redirectTo: rootActions.redirectTo
}, dispatch)

class StudentsList extends React.Component {
  constructor(props) {
    props.getStudentsList()
    super(props);
    this.state = {
      gridItemStyle: {}
    }
  }
  render() {
    return (
      <>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SearchedTable tableTitle={"Список учнів"} tableDescription={{
              columns: this.props.studentsColumns,
              data: this.props.studentsData
            }}
            clickAction={(rowData, rowMeta) => {
              console.log(rowData)
              this.props.getSelectedUser(rowData[0])
            }}
            />
          </Grid> </Grid>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentsList)
