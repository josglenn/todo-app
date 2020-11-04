import React, { useCallback, useEffect, useState } from 'react'

import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import * as goalActions from '../store/action/goal'
import { useDispatch, useSelector } from 'react-redux'


const ViewGoalScreen = props => {
  
  const goals = useSelector(state => state.goals.goals)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const loadedGoals = useCallback( async () => {
    setIsLoading(true);
    await dispatch(goalActions.fetchGoals());
    setIsLoading(false); 
    },[setIsLoading,dispatch]);

  useEffect(() => {
  const willFocusSub =  props.navigation.addListener('willFocus', loadedGoals)
    return () => {
      willFocusSub.remove()
    }
  }, [loadedGoals])

  useEffect(() => {  
    loadedGoals();
  }, [loadedGoals])

  if (isLoading) {
    return <View style={styles.loading}>
    <ActivityIndicator size="large" />
  </View>
  }
  if (goals.length === 0) {
    return <View style={styles.loading}>
      <Text>No goals yet.</Text>
    </View>
    }
  if (isLoading && goals.length === 0) {
    return <View style={styles.loading}>
      <Text>No goals yet.</Text>
    </View>
    }
    
  return(
    <View style={styles.container}>
      <FlatList 
      data={goals}
      keyExtractor={item =>item.id}
      renderItem={itemData => (
        <TouchableOpacity 
        style={styles.goalContainer} 
        onPress={() => 
          props.navigation.navigate('Edit', {goalIdItem: itemData.item.id, goalTitle: itemData.item.subject} 
        )}
        >
          <View style={styles.textContainer} >
          <Text style={styles.itemSubject}>{itemData.item.subject.toUpperCase()}</Text>
          <Text style={styles.itemDescription} numberOfLines={1}>{itemData.item.description}</Text>
          </View>
          <Ionicons name='md-trash' color="red" size={30} style={styles.trashIcon}  onPress={() => {
            Alert.alert('Warning', 'You Sure You want to Delete This Goal?',[
              {
                text: 'OK',
                style:'destructive',
                onPress: () => {
                  dispatch(goalActions.deleteGoal(itemData.item.id))
                }
              },
              {
                text: 'Cancel',
                onPress: () => {}
              },
            ]
            )
          }}/>
        </TouchableOpacity>
        
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex:1,
    marginHorizontal: 30
  },
  goalContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'royalblue',
    elevation: 4
  },
  textContainer: {
    flex: 1
  },  
  itemSubject: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 3,
    color: 'white'
  },
  itemDescription: {

  },
  trashIcon: {
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15
  }
})
export default ViewGoalScreen