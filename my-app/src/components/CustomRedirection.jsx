import React from 'react'

import { Redirect } from 'react-router'
let isAlertShow = false

export class CustomRedirection extends React.Component {
    
    constructor(props){
        super(props);
        //props.history.push(this.props.redirectTo)
      };
    componentDidUpdate (){
        this.props.reset()
    }
    render () {
        return (
            <Redirect push to={this.props.redirectTo} /> 
        )
    }
}