import React, { useRef } from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as materialsActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as MATERIALS } from '../reducer'
import { NAME as ROOT } from '../../Root/reducer'

import extractUrlValue from '../../../helpers/cookies'
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import JoditEditor from "jodit-react";


function mapStateToProps(state) {
  return {
    ...state[MATERIALS],
    userRole: state[ROOT].userRole
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...materialsActions,
}, dispatch)


class ShowTrainingsMaterials extends React.Component {
  constructor(props) {
    super(props);
    let topicId = extractUrlValue('topicId')
    let subjectId = extractUrlValue('subjectId')
    if(topicId) {
      props.getMaterials(topicId,subjectId)
    } else {

    }
    this.state = {
      topicId: topicId ? topicId : null,
      subjectId: subjectId ? subjectId : null
    }
  }
  render() {
    return (
      <Grid style={{paddingTop: '5px'}} component={Paper} >
        <Grid item xs={12} hidden={this.props.userRole == 30}>
          <FormControl fullWidth>
            <Button variant="outlined" color="primary" onClick={() => {
              this.props.openEditTab({
                show: true,
                topicId: this.state.topicId,
                subjectId: this.state.subjectId
              })
            }}>Редагувати</Button>
          </FormControl>
        </Grid>
        <div style={{padding: '20px'}} className="content" dangerouslySetInnerHTML={{__html: this.props.material[0].content}}></div>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowTrainingsMaterials)