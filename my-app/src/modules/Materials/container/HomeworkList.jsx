import React, { useRef } from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as rootActions } from '../../Root/actions'

import { actions as materialsActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as MATERIALS } from '../reducer'

import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import extractUrlValue from '../../../helpers/cookies'

import SearchedTable from "../../../components/SearchedTable"

import JoditEditor from "jodit-react";


function mapStateToProps(state) {
  return {
    ...state[MATERIALS],
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...materialsActions,
  redirectTo: rootActions.redirectTo
}, dispatch)


class HomeworkList extends React.Component {
  constructor(props) {
    super(props);
    props.getHomeworkList({lessonId: props.lessonId})
  }
  render() {
    return (
      <Grid container spacing={5}>
      <Grid item xs={12}>
        <SearchedTable tableTitle={this.props.tableTitle} tableDescription={{
          columns: this.props.homeworkColumns,
          data: this.props.homeworkList
        }}
          clickAction={(rowData, rowMeta) => {
            this.props.redirectTo(
              {
                pathname: "/homework",
                search: "?id=" + rowData[0],
                state: { row: rowMeta }
              })
          }}
        />
      </Grid> </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeworkList)