import { types, NAME as USER } from './reducer'
import { RSAA } from 'redux-api-middleware'
import entryPoint from '../../constants/endpoints'
import { createToken } from '../../helpers/stringsGenerators'

import { actions as mainActions } from '../Root/actions'

export const actions = {
  login: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.LOGIN_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.LOGIN_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              localStorage.setItem('token',data.token)
              
              dispatch(mainActions.checkSession())
              return data
            })
        },
        {
          type: types.LOGIN_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/login`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  createGroup: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_GROUP_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_GROUP_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              dispatch(mainActions.redirectTo('/groupsList'))
              return data
            })
        },
        {
          type: types.CREATE_GROUP_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createGroup`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getGroupsList: () => ({
    [RSAA]: {
      types: [
        {
          type: types.GROUPS_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.GROUPS_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              return data
            })
        },
        {
          type: types.GROUPS_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/groupsList`,
      credentials: 'include',
      method: 'GET'
    }
  }),
  getStudentsList: () => ({
    [RSAA]: {
      types: [
        {
          type: types.STUDENTS_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.STUDENTS_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              return data
            })
        },
        {
          type: types.STUDENTS_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/studentsList`,
      credentials: 'include',
      method: 'GET'
    }
  }),
  createStudent: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_STUDENT_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_STUDENT_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              dispatch(mainActions.redirectTo('/studentsList'))
              return data
            })
        },
        {
          type: types.CREATE_STUDENT_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createStudent`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  //-------------------------EDIT_USER_BLOCK---------------------//
  getSelectedUser: (value) => (dispatch, getState) => {
    let thisState = getState()[USER]
    let selected = thisState.studentsData.find((element, index, array) => {
      return element.id === value
    })
    dispatch(mainActions.redirectTo("/editUser"))
    return dispatch({
      type: types.SELECTED_USER_SET,
      payload: selected
    })
  },

  editUser: (data) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.USER_EDIT_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.USER_EDIT_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((respData) => {
              dispatch(actions.getSelectedUser(data.id))
              dispatch(mainActions.redirectTo('/studentsList'))
              let alert = {
                show: true,
                alertTitle: 'Данні користувача збережено',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              return
            })
        },
        {
          type: types.USER_EDIT_FAILURE,
          payload: (action, state, res) => res.json()
            .then((data) => {
              let alert = {
                show: true,
                alertTitle: 'Помилка при заміні данних користувача',
                alertText: 'Невідома помилка',
                severity: 'error',
                style: {},
                variant: 'outlined'
              }
              if(data.message.code === 'ER_DUP_ENTRY') {
                alert = {
                  ...alert,
                  alertText: 'Користувача з такою назвою вже створено!'
                }
              }
              dispatch(mainActions.showAlert(alert))
              return
            })
        }
      ],
      endpoint: `${entryPoint}/editUser`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
  })
  //-----------------------------------------------------------------------------------------
}