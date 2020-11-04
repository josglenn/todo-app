import React, { useState, useCallback } from 'react'

import { View, Text, StyleSheet, Button, TextInput, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import Header from '../components/Header'
import * as goalsAction from '../store/action/goal'


const AddGoalScreen = props => {
  const [goalSubject, setGoalSubject] = useState('')
  const [goalDescription, setGoalDescription] = useState('')

  const dispatch = useDispatch();
  const submitHandler = useCallback(() => {
    dispatch(goalsAction.createGoal(goalSubject,goalDescription))
    setGoalSubject('')
    setGoalDescription('')
    Keyboard.dismiss()
    props.navigation.navigate('View')
  },[dispatch,goalSubject,goalDescription]);


  return(
    <View>
      <Header title="SET GOALS"/>
      <View style={styles.container}>
        <Text style={styles.goalLabel}>Goal Subject</Text>
        <TextInput style={styles.goalInput} 
        value={goalSubject}
        onChangeText={(text) => {
          setGoalSubject(text)
        }}
        />
        <Text style={styles.goalLabel}>Goal Description</Text>
        <TextInput 
        style={styles.goalInput} 
        value={goalDescription}
        onChangeText={(text) => {
          setGoalDescription(text)
        }}
        />
        <Button 
        title='ADD' 
        style={styles.button} 
        onPress={submitHandler} 
        disabled={!goalSubject.length || !setGoalDescription.length }

        />
      </View>
    </View>
    
  )
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

export default AddGoalScreen