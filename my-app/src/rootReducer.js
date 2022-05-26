import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reducer as rootReducer, NAME as ROOT_NAME } from './modules/Root/reducer'
import { reducer as userReducer, NAME as USER_NAME } from './modules/User/reducer'
import { reducer as lesonsReduser, NAME as LESONS_NAME } from './modules/Lesons/reducer'
import { reducer as materialsReduser, NAME as MATERIALS_NAME } from './modules/Materials/reducer'


const appReducer = combineReducers({
  [ROOT_NAME]: rootReducer,
  [USER_NAME]: userReducer,
  [LESONS_NAME]: lesonsReduser,
  [MATERIALS_NAME]: materialsReduser,
})

const store = createStore(
  appReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk, apiMiddleware))
)

export default store