import React from 'react'
import moment from 'moment'

export const NAME = 'USER'

export const types = {
  LOGIN_REQUEST: `${NAME}/LOGIN_REQUEST`,
  LOGIN_SUCCESS: `${NAME}/LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${NAME}/LOGIN_FAILURE`,
  GROUPS_LIST_REQUEST: `${NAME}/GROUPS_LIST_REQUEST`,
  GROUPS_LIST_SUCCESS: `${NAME}/GROUPS_LIST_SUCCESS`,
  GROUPS_LIST_FAILURE: `${NAME}/GROUPS_LIST_FAILURE`,
  STUDENTS_LIST_REQUEST: `${NAME}/STUDENTS_LIST_REQUEST`,
  STUDENTS_LIST_SUCCESS: `${NAME}/STUDENTS_LIST_SUCCESS`,
  STUDENTS_LIST_FAILURE: `${NAME}/STUDENTS_LIST_FAILURE`,
  CREATE_GROUP_REQUEST: `${NAME}/CREATE_GROUP_REQUEST`,
  CREATE_GROUP_SUCCESS: `${NAME}/CREATE_GROUP_SUCCESS`,
  CREATE_GROUP_FAILURE: `${NAME}/CREATE_GROUP_FAILURE`,
  CREATE_STUDENT_REQUEST: `${NAME}/CREATE_STUDENT_REQUEST`,
  CREATE_STUDENT_SUCCESS: `${NAME}/CREATE_STUDENT_SUCCESS`,
  CREATE_STUDENT_FAILURE: `${NAME}/CREATE_STUDENT_FAILURE`,
  USER_EDIT_REQUEST: `${NAME}/USER_EDIT_REQUEST`,
  USER_EDIT_SUCCESS: `${NAME}/USER_EDIT_SUCCESS`,
  USER_EDIT_FAILURE: `${NAME}/USER_EDIT_FAILURE`,

  SELECTED_USER_SET: `${NAME}/SELECTED_USER_SET`

}

export const initialState = {
  user: {},
  groupsColumns: [
    {
      name: 'id',
      options: {
        display: 'executed',
        viewColumns: false,
        filter: false
      }
    },
    {
      label: 'Ім\'я класу',
      name: 'name'
    },
  ],
  groupsData: [
  {  id: 1,
    name: 'dsfsdfsdf'
  },
  ],
  studentsColumns: [
    {
      name: 'id',
      options: {
        display: 'executed',
        viewColumns: false,
        filter: false
      }
    },
    {
      label: 'Призвіще',
      name: 'surname',
      options: {
        filter: false
      }
    },
    {
      label: 'Ім\'я',
      name: 'name',
      options: {
        filter: false
      }
    },
    {
      label: 'По батькові',
      name: 'fathername',
      options: {
        filter: false
      }
    },
    {
      label: 'Клас',
      name: 'groupName'
    },
    {
      label: 'Роль',
      name: 'role',
      options: {
        customBodyRender: value =>  { 
          let str = "Учень"
          if(value==10) {str = "Адміністратор"}
          if(value==20) {str = "Вчитель"}
          return str
        }
      }
    }
  ],
  studentsData: [
    {  id: 1,
      name: 'dsfsdfsdf'
    },
  ],
  selectedUser: {
    login: 'test',
    password: 'test',
    role: 'test',
    name: 'test',
    surname: 'test',
    fathername: 'test',
    birthday: 'test',
    id: 'test'
  }
}
export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case types.GROUPS_LIST_SUCCESS:
    return {
      ...state,
      groupsData: action.payload
    }
    case types.STUDENTS_LIST_SUCCESS:
    return {
      ...state,
      studentsData: action.payload
    }
    case types.SELECTED_USER_SET:
      return {
        ...state,
        selectedUser: action.payload
      }
    case types.USER_EDIT_SUCCESS:
    return {
      ...state
    }
    default:
      return { ...state }
  }
}