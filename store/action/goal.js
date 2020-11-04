import Goal from '../../models/goals'
export const CREATE_GOAL = 'CREATE_GOAL'
export const DELETE_GOAL = 'DELETE_GOAL'
export const UPDATE_GOAL = 'UPDATE_GOAL'
export const SET_GOAL = 'SET_GOAL'


export const fetchGoals = () => {
  return async dispatch => {

    const response = await fetch(
      'http://10.0.2.2:3000/goals'
      );

    const resData = await response.json();
      const loadedGoals = []
      for(const key in resData) {
        loadedGoals.push(new Goal(
          resData[key].id, 
          resData[key].subject, 
          resData[key].description)
          )
      }
    dispatch({type: SET_GOAL, goals: loadedGoals})
  }
}

export const createGoal = (subject, description) => {
  return async dispatch => {

    const response = await fetch('http://10.0.2.2:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject,
        description
      })
    })

    const resData = await response.json();
    dispatch({
      type: CREATE_GOAL, goalData: {
      id: resData.id,
      subject: subject,
      description: description,
      }
  });
  }
    
}

export const deleteGoal = (id) => {
  return async dispatch => {
    await fetch(
      `http://10.0.2.2:3000/goals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    dispatch({
    type: DELETE_GOAL, goalId : id
    })
  }
}

export const updateGoal = (id, subject, description) => {
  return async (dispatch, getState) => {
    const goalIdItem = getState().goals.goals
    await fetch(
      `http://10.0.2.2:3000/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject,
        description
      })
    })
    dispatch ({
      type: UPDATE_GOAL,
      goalId: id,
      goalData: {
        subject: subject,
        description: description,
        
      }
    })
  }
  
}

