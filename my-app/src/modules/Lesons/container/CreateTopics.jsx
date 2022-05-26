import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as usersActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as LESONS } from '../reducer'
import { Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


function mapStateToProps(state) {
  return {
    ...state[LESONS],
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...usersActions,
}, dispatch)

function validate(selector){
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


class CreateTopic extends React.Component {
  constructor(props) {
    super(props);
    props.getSubjectList()
    this.state = {
      errorName: false,
      errorShippingConditions: false,
      errorPrice: false,

      helperTextName: "",
      helperTextShippingConditions: "",
      helperTextPrice: ""
    }
  }
  render() {
    return (
      <Grid component={Paper} container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="warehouseName"
            label="Назва теми"
            variant="outlined"
            error={this.state.errorTitle}
            helperText={this.state.helperTextTitle}
            onChange={e => this.setState({ title: e.target.value, errorTitle: false, helperTextTitle: "" })}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="warehouseName"
            label="Опис"
            variant="outlined"
            error={this.state.errorName}
            helperText={this.state.helperTextName}
            onChange={e => this.setState({ description: e.target.value, errorName: false, helperTextName: "" })}
          />
        </FormControl>
      </Grid>
      <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-select-currency"
              select
              label="Предмет"
              variant="outlined"
              value={this.state.selectedTypeId}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ subjectId: event.target.value, errorSelectedTypeId: false })
              }}
              helperText="Оберіть предмет до якого належить тема"
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

      <Grid item xs={12}>
        <FormControl fullWidth>
          <Button variant="contained" color="primary" onClick={() => {
            if(validate(this)){
              this.props.createTopic({
              title: this.state.title,
              description: this.state.description,
              subjectId: this.state.subjectId
             })
            }
          }}>Створити тему</Button>
        </FormControl>
      </Grid>
    </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTopic)