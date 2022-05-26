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


function mapStateToProps(state) {
  return {
    ...state[USERS],
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...usersActions,
}, dispatch)

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridItemStyle: {}
    }
  }
  render() {
    return (
      <>
        <Grid style={{
          margin: 'auto',
          marginTop: '200px'
        }} component={Paper} container sm={6} spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant={'h5'} align={'center'}>
                Авторизація
              </Typography>
            </FormControl>
          </Grid>
          <Grid style={this.state.gridItemStyle} item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Введіть логін"
                variant="outlined"
                type="text"
                onChange={e => this.setState({ login: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid style={this.state.gridItemStyle} item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                type="password"
                label="Введіть пароль"
                variant="outlined"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormControl>
          </Grid>
          <Grid style={this.state.gridItemStyle} item xs={12}>
            <FormControl fullWidth>
              <Button variant="contained" color="primary" onClick={() => {
                this.props.login({
                  login: this.state.login,
                  password: this.state.password,
                })
              }}>Вхід</Button>
            </FormControl>
          </Grid>
        </Grid>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
