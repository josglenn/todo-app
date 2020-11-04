import React from 'react';
import GoalNavigation from './navigation/GoalNavigation'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import goalsReducer from './store/reducer/goal'

const rootReducer = combineReducers({
  goals: goalsReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <GoalNavigation />
    </Provider>
  );
}


