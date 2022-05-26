import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as usersActions } from '../actions'
//import { actions as rootActions } from '../actions'
import { NAME as USERS } from '../reducer'
import { Button } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Typography from '@material-ui/core/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import { generatePassword, translit } from '../../../helpers/stringsGenerators'
function mapStateToProps(state) {
  return {
    ...state[USERS],
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...usersActions,
}, dispatch)

function validate(selector) {
  let successFlag = 0
  //name validation
  if (!selector.state.name) {
    selector.setState({ errorName: true, helperTextName: "Введіть назву." })
    successFlag--
  } else {
    selector.setState({ errorName: false, helperTextName: "" })
    successFlag++
  }
  if (successFlag === 1) { return true }
}


class CreateStudent extends React.Component {
  constructor(props) {
    props.getGroupsList()
    super(props);
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
    console.log(generatePassword())
    return (
      <Grid component={Paper} container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="warehouseName"
              label="Прізвище учня"
              variant="outlined"
              error={this.state.errorName}
              helperText={this.state.helperTextName}
              onChange={e => this.setState({ surname: e.target.value, errorName: false, helperTextName: "" })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="warehouseName"
              label="Ім'я учня"
              variant="outlined"
              error={this.state.errorName}
              helperText={this.state.helperTextName}
              onChange={e => this.setState({ name: e.target.value, errorName: false, helperTextName: "" })}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="warehouseName"
              label="Побатькові учня"
              variant="outlined"
              error={this.state.errorName}
              helperText={this.state.helperTextName}
              onChange={e => this.setState({ fathername: e.target.value, errorName: false, helperTextName: "" })}
            />
          </FormControl>
        </Grid>
        <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-select-currency"
              select
              label="Роль"
              variant="outlined"
              value={this.state.role}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ role: event.target.value, errorSelectedTypeId: false })
              }}
              helperText="Оберіть роль користувача"
            >
              <MenuItem value="30">
                <em>Учень</em>
              </MenuItem>
              <MenuItem value="20">
                <em>Вчитель</em>
              </MenuItem>
              <MenuItem value="10">
                <em>Адміністратор</em>
              </MenuItem>              
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
              <TextField
              id="date"
              label="Дата народження учня"
              type="date"
              variant="outlined"      
              error={this.state.errorName}
              helperText={this.state.helperTextName}        
              onChange={e => this.setState({ birthday: e.target.value, errorName: false, helperTextName: "" })}
            />
          </FormControl>
        </Grid>
        <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-select-currency"
              select
              label="Клас"
              variant="outlined"
              value={this.state.selectedTypeId}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ groupId: event.target.value, errorSelectedTypeId: false })
              }}
              helperText="Оберіть клас в якому навчається учень"
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

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" color="primary" onClick={() => {
              if (validate(this)) {
                this.props.createStudent({
                  surname: this.state.surname,
                  name: this.state.name,
                  fathername: this.state.fathername,
                  birthday: this.state.birthday,
                  role: this.state.role,
                  login: translit(this.state.name),
                  password: generatePassword(),
                  groupId: this.state.groupId
                })
              }
            }}>Створити</Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent)
