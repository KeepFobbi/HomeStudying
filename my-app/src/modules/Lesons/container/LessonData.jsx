import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'
import extractUrlValue from '../../../helpers/cookies'

import { actions as lesonsActions } from '../actions'
import { actions as materialsActions } from '../../Materials/actions'
import { actions as rootActions } from '../../Root/actions'
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../reducer'
import { NAME as ROOT } from '../../Root/reducer'
import { Button, useRadioGroup } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';
import SearchedTable from "../../../components/SearchedTable"

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import InfoTable from '../../../components/InfoTable';

import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import convertDate from '../../../helpers/common';
import { grid } from '@mui/system';
import { Link } from 'react-router-dom'

import UpdateHomeTask from '../components/UpdateHomeTask'
import ShowHomeTask from '../components/ShowHomeTask'
import HomeworkList from '../../Materials/container/HomeworkList'


function mapStateToProps(state) { //connection to staTE
  return {
    ...state[LESONS],
    clientId: state[ROOT].userId,
    userRole: state[ROOT].userRole
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...lesonsActions,
  updateHomeTask: materialsActions.updateHomeTask,
  redirectTo: rootActions.redirectTo
}, dispatch)

class LessonData extends React.Component {
  constructor(props) {
    //props.getLessonData()
    super(props);
    let lessonId = extractUrlValue('id')
    if (lessonId) {
      props.getEventCalendar({ lesonId: lessonId })
    }
    this.state = {
      gridItemStyle: {},
      homeTaskContent: props.selectedLesson.homeTask,
      homeTaskEdit: false,
      lessonId: lessonId ? lessonId : props.selectedLesson.id
    }
  }
  render() {
    return (
      <>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Grid component={Paper} container spacing={3}>
              <InfoTable
                data={[
                  {
                    data: ["Опис уроку:", this.props.selectedLesson.title]
                  },
                  {
                    data: ["Час початку:", convertDate(this.props.selectedLesson.dateStart)]
                  },
                  {
                    data: ['Викладач:', this.props.selectedLesson.userSurname + " " + this.props.selectedLesson.userName + " " + this.props.selectedLesson.userFathername]
                  },
                  {
                    data: ['Тема уроку:', this.props.selectedLesson.topicName]
                  },
                  {
                    data: ['Клас:', this.props.selectedLesson.groupName]
                  },
                  {
                    data: ['Почилання на клас:', this.props.selectedLesson.roomLink]
                  }
                ]}
              />
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <Button variant="outlined" color="primary" onClick={() => {
                    window.location.assign(this.props.selectedLesson.roomLink)
                  }}>Перейти до класу</Button>
                </FormControl>
              </Grid>
              <Grid item xs={8} hidden={this.props.userRole == 30}>
                <FormControl fullWidth>
                  <Button variant="outlined" component={Link} color="primary" to={'/editlesson?id=' + this.props.selectedLesson.id}>Редагувати</Button>
                </FormControl>
              </Grid>
              <Grid item xs={this.props.userRole == 30 ? 10 : 2}>
                <FormControl fullWidth>
                  <Button variant="outlined" color="primary" component={Link} to={'/material?topicId=' + this.props.selectedLesson.topicId + "&subjectId=" + this.props.selectedLesson.subjectId}
                  >Показати навчальні матеріали</Button>
                </FormControl>
              </Grid>
            </Grid>
            <Grid hidden={this.props.userRole == 30}>
            <br />
            <br />
              <Grid container spacing={3} component={Paper}>
                <Grid item xs={10}>
                  <FormControl fullWidth>
                    <TextField
                      id="warehouseName"
                      label="Посилання на урок"
                      variant="outlined"
                      error={this.state.errorTitle}
                      helperText={this.state.helperTextTitle}
                      defaultValue={this.props.selectedLesson.roomLink}
                      onChange={e => this.setState({ roomLink: e.target.value, errorTitle: false, helperTextTitle: "" })}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <Button variant="outlined" color="primary" onClick={() => {
                      this.props.editLesson({
                        lessonDescription: this.props.selectedLesson.lessonDescription,
                        dateStart: convertDate(this.props.selectedLesson.dateStart),
                        topicId: this.props.selectedLesson.topicId,
                        groupId: this.props.selectedLesson.groupId,
                        userId: this.props.selectedLesson.userId,
                        roomLink: this.state.roomLink,
                        id: this.props.selectedLesson.id
                      })
                    }
                    }>Встановити посилання класу</Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <br />
            <br />
            <Grid container spacing={5}>
              <Grid item xs={this.props.userRole != 30 ? 12 : 6} hidden={this.props.userRole == 30}>
                <HomeworkList
                  lessonId={this.state.lessonId}
                  tableTitle={"Список домашніх робіт"}
                />
              </Grid>
              <Grid item xs={this.props.userName != 30 ? 12 : 6}>

                <br /><br />
                <Grid container spacing={3} component={Paper}>
                  <Grid item xs={12} hidden={this.props.userRole == 20}>
                    <Button variant="outlined" color="primary" onClick={() => {
                      this.props.redirectTo('/homework?userId=' + this.props.clientId + '&lessonId=' + this.props.selectedLesson.id)
                    }
                    }>Моє домашнє завдання</Button>
                  </Grid>
                </Grid>

                {this.state.homeTaskEdit ?
                  <UpdateHomeTask
                    content={this.state.homeTaskContent}
                    updateAction={(value) => {
                      this.setState({
                        homeTaskEdit: !this.state.homeTaskEdit
                      })
                      this.props.updateHomeTask(value)
                    }}
                    lessonId={this.props.selectedLesson.id}
                    onBlurAction={(value) => {
                      this.setState({
                        homeTaskContent: value
                      })
                    }}
                  />
                  :
                  <ShowHomeTask
                    userRole={this.props.userRole}
                    editAction={() => {
                      this.setState({
                        homeTaskEdit: !this.state.homeTaskEdit,
                        homeTaskContent: this.props.selectedLesson.homeTask
                      })
                    }}
                    content={this.state.homeTaskContent ? this.state.homeTaskContent : this.props.selectedLesson.homeTask}
                  />
                }

              </Grid>
            </Grid>
            <br />
            <br />
          </Grid>
        </Grid>


      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LessonData)