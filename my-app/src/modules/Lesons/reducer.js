import React from 'react'
import moment from 'moment'

export const NAME = 'LESONS'

export const types = {
    CREATE_SUBJECT_REQUEST: `${NAME}/CREATE_SUBJECT_REQUEST`,
    CREATE_SUBJECT_SUCCESS: `${NAME}/CREATE_SUBJECT_SUCCESS`,
    CREATE_SUBJECT_FAILURE: `${NAME}/CREATE_SUBJECT_FAILURE`,
    SUBJECT_LIST_REQUEST: `${NAME}/SUBJECT_LIST_REQUEST`,
    SUBJECT_LIST_SUCCESS: `${NAME}/SUBJECT_LIST_SUCCESS`,
    SUBJECT_LIST_FAILURE: `${NAME}/SUBJECT_LIST_FAILURE`,
    CREATE_TOPIC_REQUEST: `${NAME}/CREATE_TOPIC_REQUEST`,
    CREATE_TOPIC_SUCCESS: `${NAME}/CREATE_TOPIC_SUCCESS`,
    CREATE_TOPIC_FAILURE: `${NAME}/CREATE_TOPIC_FAILURE`,
    TOPIC_LIST_REQUEST: `${NAME}/TOPIC_LIST_REQUEST`,
    TOPIC_LIST_SUCCESS: `${NAME}/TOPIC_LIST_SUCCESS`,
    TOPIC_LIST_FAILURE: `${NAME}/TOPIC_LIST_FAILURE`,
    CREATE_LESSON_REQUEST: `${NAME}/CREATE_LESSON_REQUEST`,
    CREATE_LESSON_SUCCESS: `${NAME}/CREATE_LESSON_SUCCESS`,
    CREATE_LESSON_FAILURE: `${NAME}/CREATE_LESSON_FAILURE`,
    LESSON_LIST_REQUEST: `${NAME}/LESSON_LIST_REQUEST`,
    LESSON_LIST_SUCCESS: `${NAME}/LESSON_LIST_SUCCESS`,
    LESSON_LIST_FAILURE: `${NAME}/LESSON_LIST_FAILURE`,
    LESSON_DATA_LIST_REQUEST: `${NAME}/LESSON_DATA_LIST_REQUEST`,
    LESSON_DATA_LIST_SUCCESS: `${NAME}/LESSON_DATA_LIST_SUCCESS`,
    LESSON_DATA_LIST_FAILURE: `${NAME}/LESSON_DATA_LIST_FAILURE`,
    LESSON_EDIT_REQUEST: `${NAME}/LESSON_EDIT_REQUEST`,
    LESSON_EDIT_SUCCESS: `${NAME}/LESSON_EDIT_SUCCESS`,
    LESSON_EDIT_FAILURE: `${NAME}/LESSON_EDIT_FAILURE`,
    CREATE_ROOMLINK_REQUEST: `${NAME}/CREATE_ROOMLINK_REQUEST`,
    CREATE_ROOMLINK_SUCCESS: `${NAME}/CREATE_ROOMLINK_SUCCESS`,
    CREATE_ROOMLINK_FAILURE: `${NAME}/CREATE_ROOMLINK_FAILURE`,


    SELECTED_LESSON_SET: `${NAME}/SELECTED_LESSON_SET`
  }

  export const initialState = {
    subjectColumns: [
        {
          name: 'id',
          options: {
            display: 'executed',
            viewColumns: false,
            filter: false
          }
        },
        {
          label: 'Назва предмету:',
          name: 'name'
        },
      ],
      subjectData: [
      {  id: 1,
        name: 'dsfsdfsdf'
      },
      ],
      //------------TOPIC---------------//
      topicColumns: [
        {
          name: 'id',
          options: {
            display: 'executed',
            viewColumns: false,
            filter: false
          }
        },
        {
          name: 'subjectId',
          options: {
            display: 'executed',
            viewColumns: false,
            filter: false
          }
        },
        {
          label: 'Назва теми',
          name: 'title',
          options: {
            filter: false
          }
        },
        {
          label: 'Опис',
          name: 'description',
          options: {
            filter: false
          }
        },
        {
          label: 'Предмет',
          name: 'subjectName'
        },
      ],
      topicData: [
        {  id: 1,
          title: 'dsfsdfsdf',
          description: 'asdasdasd',
          subjectName: 'au'
        }],
      //------------LESSON---------------//
      lessonColumns: [
        {
          name: 'id',
          options: {
            display: 'executed',
            viewColumns: false,
            filter: false
          }
        },
        {
          label: 'опис уроку',
          name: 'lessonDescription'
        },
        {
          label: 'Дата початку',
          name: 'dateStart'
        },
        {
          label: 'Викладач',
          name: 'userId'
        },
        {
          label: 'Тема',
          name: 'topicId'
        },
        {
          label: 'Клас',
          name: 'groupId'
        },
      ],
      lessonData: [
      {  id: 1,
        title: 'dsfsdfsdf',
        start: new Date(),
        end: new Date(),
        userId: 0,
        topicId: 0,
        groupId: 0
      },
      ],
      //------------LESSON_DATA_PAGE---------------//
      selectedLesson: {
        lessonDescription: "qwe",
        dataStart: "undefined",
        userId: "undefined",
        topicId: "undefined",
        groupId: "undefined",
        id: "undefined"
      }
  }
  export function reducer(state = initialState, action) {
    switch (action.type) {
        case types.SUBJECT_LIST_SUCCESS:
        return {
          ...state,
          subjectData: action.payload
        }
        case types.TOPIC_LIST_SUCCESS:
        return {
          ...state,
          topicData: action.payload
        }
        case types.LESSON_LIST_SUCCESS:
          if(action.payload.selected){
            return {
              ...state,
              lessonData: action.payload.data,
              selectedLesson: action.payload.selected
            }
          } else {
            return {
              ...state,
              lessonData: action.payload.data
            }
          }          
        case types.SELECTED_LESSON_SET:
        return {
          ...state,
          selectedLesson: action.payload
        }
        case types.LESSON_EDIT_SUCCESS:
        return {
          ...state,
        } 
      default:
        return { ...state }
    }
  }