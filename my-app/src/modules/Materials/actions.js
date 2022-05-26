import { types, NAME as LESONS } from './reducer'
import { RSAA } from 'redux-api-middleware'
import entryPoint from '../../constants/endpoints'

import { actions as mainActions } from '../Root/actions'

import moment from 'moment'


export const actions = {
  updateMaterials: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.UPDATE_MATERIALS_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {

          type: types.UPDATE_MATERIALS_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              
              console.log("satri: ",value)
              dispatch(mainActions.redirectTo('/material?topicId=' + value.topicId + '&subjectId=' + value.topicId))
              return data
            })
        },
        {
          type: types.UPDATE_MATERIALS_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/updatematerial`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  createMaterials: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_MATERIALS_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_MATERIALS_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              console.log("satri: ",value)
              dispatch(mainActions.redirectTo('/material?topicId=' + value.topicId + '&subjectId=' + value.subjectId))
              return data
            })
        },
        {
          type: types.CREATE_MATERIALS_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/creatematerial`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getMaterials: (value,subjectId) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.GET_MATERIALS_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.GET_MATERIALS_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              
              console.log(data)
              if(data[0]) {
                return data
              } else {
                dispatch(mainActions.redirectTo('/updatematerials?topicId='+value+'&subjectId='+subjectId))
                return [{
                  content: ''
                }]
              }
            })
        },
        {
          type: types.GET_MATERIALS_FAILURE,
          payload: (action, state, res) => {
            return
          }
          
        }
      ],
      endpoint: `${entryPoint}/getmaterial` + (value?'?topicId='+value:''),
      credentials: 'include',
      method: 'GET'
    }
  }),
  openEditTab: (value) => (dispatch, getState) => {
    if(value.show) {
      dispatch(mainActions.redirectTo('/updatematerials?topicId='+value.topicId+'&subjectId='+value.subjectId))
    }
    return dispatch({
      type: types.OPEN_EDIT_TAB,
      payload: value
    })
  },
  updateHomeTask: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_HOME_TASK_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_HOME_TASK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {              
              return data
            })
        },
        {
          type: types.CREATE_HOME_TASK_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/updatehometask`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  createHomework: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_HOMEWORK_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_HOMEWORK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              //console.log("satri: ",value)
              dispatch(mainActions.redirectTo('/homework?id=' + data.insertId))
              return data
            })
        },
        {
          type: types.CREATE_HOMEWORK_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createhomework`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  editHomework: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.EDIT_HOMEWORK_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.EDIT_HOMEWORK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              console.log("satri: ",value)
              dispatch(mainActions.redirectTo('/homework?id=' + value.id))
              return data
            })
        },
        {
          type: types.EDIT_HOMEWORK_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/updatehomework`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getHomeworkList: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.GET_HOMEWORK_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.GET_HOMEWORK_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              console.log("satri: ",value)
              //dispatch(mainActions.redirectTo('/material?topicId=' + value.topicId + '&subjectId=' + value.subjectId))
              return data
            })
        },
        {
          type: types.GET_HOMEWORK_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/gethomeworklist`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getHomework: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.GET_HOMEWORK_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.GET_HOMEWORK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              console.log("satri: ",value)
              if(!data[0]) {
                dispatch(mainActions.redirectTo('/updatehomework?userId=' + value.userId + '&lessonId=' + value.lessonId))
                return { userId: null}
              } else {
                return data[0]
              }
              //dispatch(mainActions.redirectTo('/material?topicId=' + value.topicId + '&subjectId=' + value.subjectId))
              
            })
        },
        {
          type: types.GET_HOMEWORK_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/gethomework`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  openHomeworkEditTab: (value) => (dispatch, getState) => {
    if(value.show) {
      dispatch(mainActions.redirectTo('/updatehomework?id='+value.homeworkId))
    }
    return dispatch({
      type: types.OPEN_HOMEWORK_EDIT_TAB,
      payload: value
    })
  },
}