import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as lesonsActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../reducer'
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


function mapStateToProps(state) { //connection to staTE
  return {
    ...state[LESONS],
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...lesonsActions,
}, dispatch)

class SubjectsList extends React.Component {
  constructor(props) {
    props.getSubjectList()
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
            <SearchedTable tableTitle={"Предмети"} tableDescription={{
              columns: this.props.subjectColumns,
              data: this.props.subjectData
            }}
              // clickAction={(rowData, rowMeta) => {
              //   let id = rowData[0]
              //   this.props.editMonitorAction(id)
              //   //this.props.setCurrentCompany(id)
              // }}
            />
          </Grid> </Grid>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubjectsList)
