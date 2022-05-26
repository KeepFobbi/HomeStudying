import React from 'react'

export const NAME = 'ROOT'

export const types = {
  REDIRECT_TO: `${NAME}/REDIRECT_TO`,
  RESET_REDIRECT: `${NAME}/RESET_REDIRECT`,
  SHOW_ALERT: `${NAME}/SHOW_ALERT`,
  HIDE_ALERT: `${NAME}/HIDE_ALERT`,
  CHECK_TOKEN_REQUEST: `${NAME}/CHECK_TOKEN_REQUEST`,
  CHECK_TOKEN_SUCCESS: `${NAME}/CHECK_TOKEN_SUCCESS`,
  CHECK_TOKEN_FAILURE: `${NAME}/CHECK_TOKEN_FAILURE`

}

export const initialState = {
  redirect: undefined,
  alert: {
    show: false,
    alertTitle: '',
    alertText: '',
    severity: 'error',
    style: {},
    variant: 'outlined'
  },
  authenticated: true,
  userRole: 0,
  userId: null,
  groupsId: null
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.REDIRECT_TO:
      return {
        ...state,
        redirect: action.payload
      }
    case types.RESET_REDIRECT:
      return {
        ...state,
        redirect: undefined
      }
    case types.SHOW_ALERT:
      return {
        ...state,
        alert: action.payload
      }
    case types.HIDE_ALERT:
      return {
        ...state,
        alert: action.payload
      }
    case types.CHECK_TOKEN_SUCCESS: 
      return {
        ...state,
        authenticated: action.payload.authenticated,
        userRole: action.payload.data.role,
        userId: action.payload.data.userId,
        groupsId: action.payload.data.groupsId,
        userName: action.payload.data.surname + " " + action.payload.data.name + " " + action.payload.data.fathername
      }
    case types.CHECK_TOKEN_FAILURE: 
    return {
      ...state,
      authenticated: action.payload.authenticated,
      userRole: action.payload.userRole,
      userId: action.payload.userId,
      groupsId: action.payload.groupsId,
      userName: null
    }      
    default:
      return { ...state }
  }
}