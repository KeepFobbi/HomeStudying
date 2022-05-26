import React from 'react'


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import JoditEditor from "jodit-react";


function ShowHomeTask(props) {

  return (
    <Grid container spacing={3} component={Paper}>
      <Grid item xs={8}>
        Домашнє завдання:
      </Grid>
      <Grid item xs={4} hidden={props.userRole == 30}>
        <FormControl fullWidth>
          <Button variant="outlined" color="primary" onClick={props.editAction}>Редагувати</Button>
        </FormControl>
      </Grid>
      <FormControl fullWidth>
        <div style={{ padding: '20px' }} className="content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
      </FormControl>
    </Grid>
  )
}

export default ShowHomeTask