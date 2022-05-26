import React from 'react';
import { connect, } from 'react-redux'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import { bindActionCreators } from 'redux'

import { actions as lesonsActions } from '../actions'
import { NAME as LESONS } from '../reducer'
import { NAME as USERS } from '../../User/reducer'
import { NAME as ROOT } from '../../Root/reducer'
import { actions as rootActions } from '../../Root/actions'
import { actions as usersActions } from '../../User/actions'

import MenuItem from '@material-ui/core/MenuItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function mapStateToProps(state) { //connection to staTE
  return {
    ...state[LESONS],
    groupsData: state[USERS].groupsData,
    userGroupId: state[ROOT].groupsId,
    userRole: state[ROOT].userRole
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...lesonsActions,
  redirectTo: rootActions.redirectTo,
  getGroupsList: usersActions.getGroupsList
}, dispatch)

class EventCalendar extends React.Component {
  constructor(props) {
    props.getGroupsList()
    super(props);    
    props.getEventCalendar({groupId: props.userGroupId})
    this.state = {
      gridItemStyle: {}
    }
  }
  render() {
    const localizer = momentLocalizer(moment)
    
    return (
      <Grid component={Paper} container spacing={3}>
          <Grid hidden={this.props.userRole == 30} style={this.state.gridItemStyle} item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="standard-select-currency"
                select
                label="Клас"
                variant="outlined"
                value={this.state.groupId}
                //error={this.state.errorSelectedTypeId}
                onChange={(event) => {
                  this.setState({ groupId: event.target.value})
                  this.props.getEventCalendar({groupId: event.target.value})
                }}
                helperText="Оберіть клас"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.props.groupsData.map((item) => {
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
            <Calendar
            localizer={localizer}
            events={this.props.lessonData}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent = {(event, e) => {
                this.props.getSelectedLesson(event.id)
                this.props.redirectTo("/lessondata?id=" + event.id)
            }} 
            style={{ height: 500 }}
            />
            </FormControl>
          </Grid>
        </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventCalendar) // mapStateToProps, mapDispatchToProps
