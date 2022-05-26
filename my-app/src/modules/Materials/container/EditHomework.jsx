import React, { useRef } from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as lesonsActions } from '../../Lesons/actions'
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../../Lesons/reducer'

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

import JoditEditor from "jodit-react";


function mapStateToProps(state) {
  return {
    ...state[MATERIALS]
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...materialsActions
}, dispatch)


class EditHomework extends React.Component {
  constructor(props) {
    super(props);
    let homeworkId = extractUrlValue('id')
    let userId = extractUrlValue('userId')
    let lessonId = extractUrlValue('lessonId')
    this.state = {
      content: props.homework.content,
      //editor: useRef(null),
      config: {
        minWidth: 1000,
        readonly: false, // all options from https://xdsoft.net/jodit/doc/        
      },
      homeworkId: homeworkId ? homeworkId : null,
      userId: userId? userId: null,
      lessonId: lessonId? lessonId: null
    }
  }
  render() {
    return (
      <Grid component={Paper} container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <JoditEditor
              //ref={this.props.editor}
              value={this.props.homework.content}
              config={this.props.config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => {
                this.setState({ content: newContent })
              }} // preferred to use only this option to update the content for performance reasons
            /*onChange={newContent => {
              console.log(newContent)
              this.setState({ content: newContent })
            }}*/
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" color="primary" onClick={() => {
              if(this.props.editHomeworkMode) {                
                this.props.openHomeworkEditTab({})
                this.props.editHomework({
                  id: this.state.homeworkId,
                  content: this.state.content
                })
              } else {
                this.props.createHomework({
                  userId: this.state.userId,
                  lessonId: this.state.lessonId,
                  content: this.state.content,
                })
              }              
            }}>Оновити домашнє завдання</Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditHomework)