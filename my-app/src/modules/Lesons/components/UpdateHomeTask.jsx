import React from 'react'


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import JoditEditor from "jodit-react";


function UpdateHomeTask(props) {

  return (
    <Grid container spacing={3} component={Paper}>
      <Grid item xs={12}>
          Домашнє завдання:
        </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <JoditEditor
            value={props.content}
            tabIndex={1} // tabIndex of textarea
            onBlur={props.onBlurAction} // preferred to use only this option to update the content for performance reasons
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" color="primary" onClick={() => {
              console.log(props)
              props.updateAction({
                id: props.lessonId,
                homeTask: props.content
              })
            }}>Оновити завдання</Button>
          </FormControl>
        </Grid>
    </Grid>
  )
}

export default UpdateHomeTask