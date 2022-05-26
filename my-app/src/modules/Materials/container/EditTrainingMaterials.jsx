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
    ...state[MATERIALS],
    topicData: state[LESONS].topicData,
    subjectData: state[LESONS].subjectData
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...materialsActions,
  getSubjectList: lesonsActions.getSubjectList,
  getTopicList: lesonsActions.getTopicList
}, dispatch)


class EditTrainingMaterials extends React.Component {
  constructor(props) {
    super(props);
    props.getSubjectList()
    let topicId = extractUrlValue('topicId')
    let subjectId = extractUrlValue('subjectId')
    if (topicId) {
      props.getSubjectList()
    } else {

    }
    this.state = {
      content: props.material[0].content,
      //editor: useRef(null),
      config: {
        minWidth: 1000,
        readonly: false, // all options from https://xdsoft.net/jodit/doc/        
      },
      topicId: topicId ? topicId : null,
      subjectId: subjectId ? subjectId : null
    }
  }
  render() {
    return (
      <Grid component={Paper} container spacing={3}>
        {this.props.editMaterialMode ?
          <>
            <Grid style={this.state.gridItemStyle} item xs={12}>
              Предмет: {this.props.material[0].subjectName}
            </Grid>
            <Grid style={this.state.gridItemStyle} item xs={12}>
              Тема: {this.props.material[0].title} / {this.props.material[0].description}
            </Grid>
          </>
          :
          <>
            <Grid style={this.state.gridItemStyle} item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Назва предмета"
                  variant="outlined"
                  value={this.state.subjectId}
                  error={this.state.errorSelectedTypeId}
                  onChange={(event) => {
                    this.setState({ subjectId: event.target.value, errorSelectedTypeId: false })
                    this.props.getTopicList(event.target.value)
                  }}
                  helperText="Оберіть предмет"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.subjectData.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </FormControl>
            </Grid>
            <Grid style={this.state.gridItemStyle} item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Тема уроку"
                  variant="outlined"
                  value={this.state.topicId}
                  error={this.state.errorSelectedTypeId}
                  onChange={(event) => {
                    this.setState({ topicId: event.target.value, errorSelectedTypeId: false })
                  }}
                  helperText="Оберіть тему уроку"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {this.props.topicData.map((item) => {
                    return (

                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </FormControl>
            </Grid>
          </>}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <JoditEditor
              style={{
                backgroundColor: 'white'
              }}
              //ref={this.props.editor}
              value={this.props.material[0].content}
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
              if(this.props.editMaterialMode) {                
                this.props.openEditTab({
                  show: false,
                  topicId: this.state.topicId,
                  subjectId: this.state.subjectId
                })
                this.props.updateMaterials({
                  topicId: this.state.topicId,
                  content: this.state.content,
                  subjectId: this.state.subjectId,
                  id: this.props.material[0].id
                })
              } else {
                this.props.createMaterials({
                  topicId: this.state.topicId,
                  content: this.state.content,
                  subjectId: this.state.subjectId
                })
              }
            }}>Оновити матеріали</Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTrainingMaterials)