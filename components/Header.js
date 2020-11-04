import React from 'react'

import { View, Text, StyleSheet, Button } from 'react-native'

const AddGoalScreen = props => {
  return(
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'royalblue',
    elevation: 7
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    padding:20,
    fontWeight: 'bold'
  }
})

export default AddGoalScreen