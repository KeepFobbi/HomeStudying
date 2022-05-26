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
  if (!selector.state.name) {
    selector.setState({ errorName: true, helperTextName: "Введіть назву." })
    successFlag--
  } else {
    selector.setState({ errorName: false, helperTextName: "" })
    successFlag++
  }
  if (successFlag === 1) { return true }
}


class CreateSubject extends React.Component {
  constructor(props) {
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
    return (
      <Grid component={Paper} container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            id="warehouseName"
            label="Назва предмету"
            variant="outlined"
            error={this.state.errorName}
            helperText={this.state.helperTextName}
            onChange={e => this.setState({ name: e.target.value, errorName: false, helperTextName: "" })}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Button variant="contained" color="primary" onClick={() => {
            if(validate(this)){
              this.props.createSubject({
              name: this.state.name
             })
            }
          }}>Створити предмет</Button>
        </FormControl>
      </Grid>
    </Grid>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateSubject)