import React, { useState } from "react";
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as lessonsActions } from '../actions'
import { actions as usersActions } from '../../User/actions';
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../reducer'
import { NAME as USERS } from '../../User/reducer'

import { Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import convertDate from '../../../helpers/common'


function mapStateToProps(state) {
  return {
    ...state[LESONS],
    usersState: state[USERS]
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...lessonsActions,
  getGroupsList: usersActions.getGroupsList,
  getStudentsList: usersActions.getStudentsList
}, dispatch)

function validate(selector) {
  let successFlag = 0
  //name validation
  if (!selector.state.title) {
    selector.setState({ errorTitle: true, helperTextTitle: "Введіть назву." })
    successFlag--
  } else {
    selector.setState({ errorTitle: false, helperTextTitle: "" })
    successFlag++
  }
  if (successFlag === 1) { return true }
}



class EditLesson extends React.Component {
  constructor(props) {
    super(props);
    props.getSubjectList()
    props.getGroupsList()
    props.getStudentsList()
    props.getTopicList()
    
    this.state = {
      errorName: false,
      errorShippingConditions: false,
      errorPrice: false,

      helperTextName: "",
      helperTextShippingConditions: "",
      helperTextPrice: "",
      ...props.selectedLesson,
      userId: props.selectedLesson.userId,
      lessonName: props.selectedLesson.subjectId,
      dateStart: props.selectedLesson.dateStart
    }
  }

  render() { 
    return (
      <Grid component={Paper} container spacing={3}>
        <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="warehouseName"
            label="Опис уроку"
            variant="outlined"
            defaultValue={this.state.lessonDescription}
            error={this.state.errorTitle}
            helperText={this.state.helperTextTitle}
            onChange={e => this.setState({ lessonDescription: e.target.value, errorTitle: false, helperTextTitle: "" })}
          />
        </FormControl>
      </Grid>
       <Grid style={this.state.gridItemStyle} item xs={12}>
       <FormControl fullWidth>
          <TextField
             id="standard-select-currency"
              select
              label="Назва предмета"
              variant="outlined"
              value={this.state.lessonName}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ lessonName: event.target.value, errorSelectedTypeId: false })
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
        <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-select-currency"
              select
              label="Клас"
              variant="outlined"
              value={this.state.groupId}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ groupId: event.target.value, errorSelectedTypeId: false })
              }}
              helperText="Оберіть клас"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.usersState.groupsData.map((item) => {
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
              label="Викладач"
              variant="outlined"
              value={this.state.userId}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ userId: event.target.value, errorSelectedTypeId: false })
              }}
              helperText="Оберіть викладача"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.usersState.studentsData.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.surname + " " + item.name + " " + item.fathername}
                  </MenuItem>
                )
              })}
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
        <LocalizationProvider dateAdapter={DateAdapter}>
        <DateTimePicker
          label="Дата та час початку"
          value={this.state.dateStart}
          onChange={(date) => {
            this.setState({ dateStart: date })
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Button variant="contained" color="primary" onClick={() => {
            if(validate(this)){
              this.props.editLesson({
              lessonDescription: this.state.lessonDescription,
              dateStart: convertDate(this.state.dateStart),
              topicId: this.state.topicId,
              groupId: this.state.groupId,
              userId: this.state.userId,
              id: this.state.id
             })
            }
          }}>Зберегти</Button>
        </FormControl>
      </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditLesson)