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
import convertDate from '../../../helpers/common'

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
  if(selector.state.newPassword){
    if (selector.state.newPassword !== selector.state.reNewPassword) {
      selector.setState({ errorName: true, helperTextName: "Введіть назву." })
      successFlag--
    } else {
      selector.setState({ errorName: false, helperTextName: "" })
      successFlag++
    }
  } else {
    return true
  } 
  if (successFlag === 1) { return true }
}


class EditUser extends React.Component {
  constructor(props) {
    props.getStudentsList()
    props.getGroupsList()
    super(props);
    this.state = {
      errorName: false,
      errorShippingConditions: false,
      errorPrice: false,

      helperTextName: "",
      helperTextShippingConditions: "",
      helperTextPrice: "",

      ...props.selectedUser,
      reNewPassword: props.selectedUser.password,
      groupsId: props.selectedUser.groupsId
    }
  }
  render() {
    return (
      <Grid component={Paper} container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="warehouseName"
              label="Прізвище учня"
              variant="outlined"
              defaultValue={this.state.surname}
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
              defaultValue={this.state.name}
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
              defaultValue={this.state.fathername}
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
        <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="standard-select-currency"
              select
              label="Клас"
              variant="outlined"
              value={this.state.groupsId}
              error={this.state.errorSelectedTypeId}
              onChange={(event) => {
                this.setState({ groupsId: event.target.value, errorSelectedTypeId: false })
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
            <TextField
              id="warehouseName"
              label="Логін"
              variant="outlined"
              error={this.state.errorName}
              defaultValue={this.state.login}
              helperText={this.state.helperTextName}
              onChange={e => this.setState({ login: e.target.value, errorName: false, helperTextName: "" })}
            />
          </FormControl>
        </Grid>

        <Grid style={this.state.gridItemStyle} item xs={12}>
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              type="password"
              label="Введіть новий пароль"
              variant="outlined"
              error={this.state.errorName}
              onChange={e => this.setState({ newPassword: e.target.value })}
            />
          </FormControl>
        </Grid>
        <Grid style={this.state.gridItemStyle} item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                type="password"
                label="Введіть новий пароль ще раз"
                variant="outlined"
                onChange={e => this.setState({ reNewPassword: e.target.value })}
              />
            </FormControl>
          </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" color="primary" onClick={() => {
              if (validate(this)) {
                this.props.editUser({
                  login: this.state.login,
                  password: this.state.reNewPassword,
                  role: this.state.role,
                  name: this.state.name,
                  surname: this.state.surname,                  
                  fathername: this.state.fathername,
                  birthday: convertDate(this.state.birthday),            
                  id: this.state.id,
                  groupsId: this.state.groupsId,
                  relationId: this.state.relationId
                })
              }
            }}>Зберегти</Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
