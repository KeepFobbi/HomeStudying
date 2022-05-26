import { types, NAME as LESONS } from './reducer'
import { RSAA } from 'redux-api-middleware'
import entryPoint from '../../constants/endpoints'

import { actions as mainActions } from '../Root/actions'

import moment from 'moment'


export const actions = {

  createSubject: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_SUBJECT_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_SUBJECT_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              dispatch(mainActions.redirectTo('/subjectList'))
              let alert = {
                show: true,
                alertTitle: 'Предмет успішно додано',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              console.log(data)
              return data
            })
        },
        {
          type: types.CREATE_SUBJECT_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createSubject`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getSubjectList: () => ({
    [RSAA]: {
      types: [
        {
          type: types.SUBJECT_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.SUBJECT_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              return data
            })
        },
        {
          type: types.SUBJECT_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/subjectList`,
      credentials: 'include',
      method: 'GET'
    }
  }),
  //----------------------TOPICS-------------------------//
  createTopic: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_TOPIC_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_TOPIC_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              dispatch(mainActions.redirectTo('/topicList'))
              let alert = {
                show: true,
                alertTitle: 'Тему успішно додано',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              console.log(data)
              return data
            })
        },
        {
          type: types.CREATE_TOPIC_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createtopic`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getTopicList: (param) => ({
    [RSAA]: {
      types: [
        {
          type: types.TOPIC_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.TOPIC_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              return data
            })
        },
        {
          type: types.TOPIC_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/topicList` + (param ? "?subjectId=" + param : ""),
      credentials: 'include',
      method: 'GET'
    }
  }),
  //----------------------LESSONS-------------------------//
  createLesson: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_LESSON_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_LESSON_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              dispatch(mainActions.redirectTo('/eventcalendar'))
              let alert = {
                show: true,
                alertTitle: 'Урок успішно додано',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              console.log(data)
              return data
            })
        },
        {
          type: types.CREATE_LESSON_FAILURE,
          payload: (action, state, res) => {
            return
          }
 
        }
      ],
      endpoint: `${entryPoint}/createlesson`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  getEventCalendar: (value) => ({
    [RSAA]: {
      types: [
        {
          type: types.LESSON_LIST_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.LESSON_LIST_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              data.map((item) => {
                  item.allDay = false
                  item.start = new Date(item.dateStart)
                  item.end = moment(new Date(item.dateStart)).add(45, 'm').toDate();
                  item.title = item.topicName + " / "+ item.lessonDescription
                  return 0
              })
              let selected
              if(value.lesonId){
                
                selected = data.find((element, index, array) => {
                  return element.id == value.lesonId
                })
                return {data: data, selected: selected}
              } else {
                return {data: data}
              }              
            })
        },
        {
          type: types.LESSON_LIST_FAILURE,
          payload: (action, state, res) => {
            return
          }
 
        }
      ],
      endpoint: `${entryPoint}/eventcalendar`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  //------------------------------LESSON_DATA_PAGE-----------------------------------//
  getSelectedLesson: (value) => (dispatch, getState) => {
    let thisState = getState()[LESONS]
    let selected = thisState.lessonData.find((element, index, array) => {
      return element.id === value
    })
    dispatch(mainActions.redirectTo("/studentsList"))
    return dispatch({
      type: types.SELECTED_LESSON_SET,
      payload: selected
    })
  },

  editLesson: (data) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.LESSON_EDIT_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.LESSON_EDIT_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((respData) => {
              dispatch(actions.getEventCalendar({ lesonId: data.id}))
              dispatch(mainActions.redirectTo('/lessondata?id=' + data.id))
              let alert = {
                show: true,
                alertTitle: 'Данні урока збережено',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              return
            })
        },
        {
          type: types.LESSON_EDIT_FAILURE,
          payload: (action, state, res) => res.json()
            .then((data) => {
              let alert = {
                show: true,
                alertTitle: 'Помилка при заміні данних урока',
                alertText: 'Невідома помилка',
                severity: 'error',
                style: {},
                variant: 'outlined'
              }
              if(data.message.code === 'ER_DUP_ENTRY') {
                alert = {
                  ...alert,
                  alertText: 'Урок з такою назвою вже створено!'
                }
              }
              dispatch(mainActions.showAlert(alert))
              return
            })
        }
      ],
      endpoint: `${entryPoint}/editlesson`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
  }),
  createRoomLink: (value) => dispatch => dispatch({
    [RSAA]: {
      types: [
        {
          type: types.CREATE_ROOMLINK_REQUEST,
          payload: (action, state, res) => {
            return
          }
        },
        {
          type: types.CREATE_ROOMLINK_SUCCESS,
          payload: (action, state, res) => res.json()
            .then((data) => {
              let alert = {
                show: true,
                alertTitle: 'Посилання успішно додано',
                severity: 'success',
                style: {},
                variant: 'outlined'
              }
              dispatch(mainActions.showAlert(alert))
              console.log(data)
              return data
            })
        },
        {
          type: types.CREATE_ROOMLINK_FAILURE,
          payload: (action, state, res) => {
            return
          }

        }
      ],
      endpoint: `${entryPoint}/createSubject`,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(value),
      headers: { 'Content-Type': 'application/json' }
    }
  })
  //-----------------------------------------------------------------------------------------
}