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
    clientRole: state[ROOT].userRole,
    clientId: state[ROOT].userId,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...materialsActions,
}, dispatch)


class ShowTrainingsMaterials extends React.Component {
  constructor(props) {
    super(props);
    let homeworkId = extractUrlValue('id')
    let userId = extractUrlValue('userId')
    let lessonId = extractUrlValue('lessonId')
    if (homeworkId) {
      props.getHomework({ id: homeworkId })
    } else {
      props.getHomework({ userId: userId,lessonId: lessonId })
    }
    this.state = {
      homeworkId: homeworkId ? homeworkId : null,
      mark: props.homework.mark,
      markEdit: false
    }
    //console.log("location: ",props.locationState)
  }
  render() {
    return (
      <Grid style={{ paddingTop: '5px' }} component={Paper} >
        <Grid item xs={12} hidden={this.props.clientRole != 30 || this.props.clientId != this.props.homework.userId}>
          <FormControl fullWidth>
            <Button variant="outlined" color="primary" onClick={() => {
              this.props.openHomeworkEditTab({
                show: true,
                homeworkId: this.state.homeworkId
              })
            }}>Редагувати</Button>
          </FormControl>
        </Grid>
        
        <div style={{ padding: '20px' }} className="content" dangerouslySetInnerHTML={{ __html: this.props.homework.content }}></div>

        <Grid style={{
          padding: "10px",
          marginLeft: '50%'
        }} item sm={12}>
          {this.state.markEdit
            ?
            <>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="mark"
                    label="Оцінка"
                    variant="outlined"
                    helperText="Виставлення оцінки"
                    type="number"
                    value={this.state.mark}
                    onChange={e => this.setState({ mark: e.target.value })}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Button variant="outlined" color="primary" onClick={() => {
                    this.setState({
                      markEdit: false
                    })
                    this.props.editHomework({
                      id: this.props.homework.id,
                      mark: this.state.mark
                    })
                  }}>Поставити оцінку</Button>
                </FormControl>
              </Grid>
            </>
            :
            <>
              <Grid item sm={12}>
                Оцінка: {this.props.homework.mark}
              </Grid>
                <Grid hidden={this.props.clientRole != 20} item sm={12}>
                  <FormControl fullWidth>
                    <Button variant="outlined" color="primary" onClick={() => {
                      this.setState({
                        markEdit: true
                      })
                    }}>Змінити оцінку</Button>
                  </FormControl>
                </Grid>
            </>
          }
        </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowTrainingsMaterials)