import React from 'react'
import moment from 'moment'

export const NAME = 'MATERIALS'

export const types = {
  UPDATE_MATERIALS_REQUEST: `${NAME}/UPDATE_MATERIALS_REQUEST`,
  UPDATE_MATERIALS_SUCCESS: `${NAME}/UPDATE_MATERIALS_SUCCESS`,
  UPDATE_MATERIALS_FAILURE: `${NAME}/UPDATE_MATERIALS_FAILURE`,
  CREATE_MATERIALS_REQUEST: `${NAME}/CREATE_MATERIALS_REQUEST`,
  CREATE_MATERIALS_SUCCESS: `${NAME}/CREATE_MATERIALS_SUCCESS`,
  CREATE_MATERIALS_FAILURE: `${NAME}/CREATE_MATERIALS_FAILURE`,
  GET_MATERIALS_REQUEST: `${NAME}/GET_MATERIALS_REQUEST`,
  GET_MATERIALS_SUCCESS: `${NAME}/GET_MATERIALS_SUCCESS`,
  GET_MATERIALS_FAILURE: `${NAME}/GET_MATERIALS_FAILURE`,
  CREATE_HOME_TASK_REQUEST: `${NAME}/CREATE_HOME_TASK_REQUEST`,
  CREATE_HOME_TASK_SUCCESS: `${NAME}/CREATE_HOME_TASK_SUCCESS`,
  CREATE_HOME_TASK_FAILURE: `${NAME}/CREATE_HOME_TASK_FAILURE`,
  EDIT_HOMEWORK_REQUEST: `${NAME}/EDIT_HOMEWORK_REQUEST`,
  EDIT_HOMEWORK_SUCCESS: `${NAME}/EDIT_HOMEWORK_SUCCESS`,
  EDIT_HOMEWORK_FAILURE: `${NAME}/EDIT_HOMEWORK_FAILURE`,
  CREATE_HOMEWORK_REQUEST: `${NAME}/CREATE_HOMEWORK_REQUEST`,
  CREATE_HOMEWORK_SUCCESS: `${NAME}/CREATE_HOMEWORK_SUCCESS`,
  CREATE_HOMEWORK_FAILURE: `${NAME}/CREATE_HOMEWORK_FAILURE`,
  GET_HOMEWORK_REQUEST: `${NAME}/GET_HOMEWORK_REQUEST`,
  GET_HOMEWORK_SUCCESS: `${NAME}/GET_HOMEWORK_SUCCESS`,
  GET_HOMEWORK_FAILURE: `${NAME}/GET_HOMEWORK_FAILURE`,
  GET_HOMEWORK_LIST_REQUEST: `${NAME}/GET_HOMEWORK_LIST_REQUEST`,
  GET_HOMEWORK_LIST_SUCCESS: `${NAME}/GET_HOMEWORK_LIST_SUCCESS`,
  GET_HOMEWORK_LIST_FAILURE: `${NAME}/GET_HOMEWORK_LIST_FAILURE`,
  OPEN_EDIT_TAB: `${NAME}/OPEN_EDIT_TAB`,
  OPEN_HOMEWORK_EDIT_TAB: `${NAME}/OPEN_HOMEWORK_EDIT_TAB`,
}

export const initialState = {
  material: [{
    content: ''
  }],
  homeworkColumns: [
    {
      name: 'id',
      options: {
        display: 'executed',
        viewColumns: false,
        filter: false
      }
    },
    {
      label: 'Прізвище',
      name: 'surname'
    },
    {
      label: 'Ім\'я',
      name: 'name'
    },
    {
      label: 'По батькові',
      name: 'fathername'
    },
    {
      label: 'Оцінка за Домашню роботу',
      name: 'mark'
    },
  ],
  homework: {
    content: ''
  },
  editMaterialMode: false,
  editHomeworkMode: false,
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_MATERIALS_SUCCESS:
      return {
        ...state,
        material: action.payload
      }
    case types.OPEN_EDIT_TAB:
      return {
        ...state,
        editMaterialMode: action.payload
      }
    case types.OPEN_HOMEWORK_EDIT_TAB:
      return {
        ...state,
        editHomeworkMode: action.payload
      }
    case types.UPDATE_MATERIALS_SUCCESS:
      return {
        ...state,
        editMaterialMode: false
      }
    case types.GET_HOMEWORK_SUCCESS:
      return {
        ...state,
        homework: action.payload
      }
    case types.GET_HOMEWORK_LIST_SUCCESS:
      return {
        ...state,
        homeworkList: action.payload
      }
    default:
      return { ...state }
  }
}