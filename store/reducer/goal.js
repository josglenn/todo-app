import GOALS from '../../data/dummy'
import { CREATE_GOAL, DELETE_GOAL, SET_GOAL, UPDATE_GOAL } from '../action/goal'
import Goal from '../../models/goals'

const initialState = {
  goals: GOALS
}

export default (state =  initialState, action) => {
  switch (action.type) {
    case SET_GOAL:
      return{
        goals: action.goals
      }
    case CREATE_GOAL:
      const newGoal = new Goal(
        action.goalData.id,
        action.goalData.subject,
        action.goalData.description,
      )
      return {
        ...state, 
        goals: state.goals.concat(newGoal)
      }
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter(goal => goal.id !== action.goalId)
      }
    case UPDATE_GOAL:
      const goalIndex = state.goals.findIndex(
        goal => goal.id === action.goalId
      );
      const updatedGoal = new Goal(
        action.goalId,
        action.goalData.subject,
        action.goalData.description,
      );
      const updatedGoals = [...state.goals];
      updatedGoals[goalIndex] = updatedGoal;
      return {
        ...state,
        goals: updatedGoals
      }
  }
  return state;
}