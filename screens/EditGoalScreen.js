import React, {useCallback, useEffect, useState} from 'react'

import { View, Text, StyleSheet, Button,TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as goalActions from '../store/action/goal'

const EditGoalScreen = props => {
  const goalId = props.navigation.getParam('goalIdItem')
  console.log(goalId)
  const editGoal = useSelector(state => 
    state.goals.goals.find(goal => goal.id === goalId)
    )
  const dispatch = useDispatch();

  const [goalSubject, setGoalSubject] = useState(editGoal.subject)
  const [goalDescription, setGoalDescription] = useState(editGoal.description)

  const submitHandler = useCallback(() => {
    dispatch(goalActions.updateGoal(goalId,goalSubject, goalDescription))
    props.navigation.goBack()
  },
  [dispatch,goalId,goalSubject,goalDescription]
  );
  return(
    <View>
      {/* <Button title="sds" onPress={() => console.log(submitHandler)}/> */}
      <View style={styles.container}>
        <Text style={styles.goalLabel}>Goal Subject</Text>
        <TextInput style={styles.goalInput} 
        value={goalSubject}
        onChangeText={(text) => {
          setGoalSubject(text)
        }}
        />
        <Text style={styles.goalLabel}>Goal Description</Text>
        <TextInput style={styles.goalInput} 
        value={goalDescription}
        onChangeText={(text) => {
          setGoalDescription(text)
        }}
        />
        <Button 
        title='APPLY' 
        style={styles.button} 
        onPress={submitHandler} />
      </View>
    </View>
    
  )
}

EditGoalScreen.navigationOptions = navData => {
  return{
    headerTitle: 'Edit Subject: ' + navData.navigation.getParam('goalTitle'),

  }
}


const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  goalLabel:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalInput: {
    margin: 10,
    fontSize: 20,
    marginBottom: 20,
    borderBottomColor: '#ccc',
    width: '100%',
    height:'20%',
    borderBottomWidth: 1
  },
})

export default EditGoalScreen