import React from 'react';
import { connect, } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as rootActions } from '../actions'
import { NAME as ROOT_NAME } from '../reducer'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { createBrowserHistory } from "history"

import ResponsiveDrawer from "../../../components/ResponsiveDrawer"
import { CustomRedirection } from '../../../components/CustomRedirection'

import Login from '../../User/container/Login'
import mapping from '../../../constants/mapping'

const hist = createBrowserHistory()

function mapStateToProps(state) {
  return {
    ...state[ROOT_NAME]
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...rootActions,
}, dispatch)


class Root extends React.Component {
  constructor(props) {
    super(props);
    props.checkSession()

  }
  render() {
    return (
      <>
        <div hidden={true}>{this.props.userRole}</div>
        <Router history={hist}>
          <Switch>
            {this.props.redirect && <CustomRedirection history={hist} redirectTo={this.props.redirect} reset={this.props.resetRedirect} />}
            {!this.props.authenticated ?
              <>
                <Route
                  path='/'
                  exec='/'
                  key='/'
                >
                  <Login></Login>
                </Route>
              </>
              :
              <>
                {mapping.map((item) => {
                  return (
                    <Route
                      path={item.path}
                      exec={item.path}
                      key={item.path}
                    >
                      <ResponsiveDrawer
                        reload={()=>{
                          window.location.reload()
                        }}
                        userRole={this.props.userRole}
                        pageTitle={item.title}
                        hideAlert={this.props.hideAlert}
                        alert={this.props.alert}
                        MainContent={item.MainContent} 
                        userName={this.props.userName}/>
                    </Route>
                  )
                })}
              </>
            }
          </Switch>
        </Router>
      </>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Root)
