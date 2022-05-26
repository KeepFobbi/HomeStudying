import { types } from './reducer'
import { RSAA } from 'redux-api-middleware'
import entryPoint from '../../constants/endpoints'

export const actions = {
  getRevenue: (data) => dispatch => dispatch({

  }),
  redirectTo: (value) => {
    return ({
      type: types.REDIRECT_TO,
      payload: value
    })
  },
  resetRedirect: () => (
    {
      type: types.RESET_REDIRECT
    }),
  showAlert: (data) => {
    return ({
      type: types.SHOW_ALERT,
      payload: data
    })
  },
  hideAlert: (data) => {
    return ({
      type: types.HIDE_ALERT,
      payload: data
    })
  },
  checkSession: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CHECK_TOKEN_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CHECK_TOKEN_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {              
              return {
                authenticated: data[0].token?true:false,
                data: data[0]
              }
            })
        },
        {
          type: types.CHECK_TOKEN_FAILURE,
          payload: (action, state, res) => {
            //dispatch(actions.redirectTo('/login'))
            return {
              authenticated: false,
              userRole: 0,
              userId: null,
              groupsId: null
            }
          }
 
        }
      ],
      endpoint: `${entryPoint}/checkToken`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({token: localStorage.getItem('token')}),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
}