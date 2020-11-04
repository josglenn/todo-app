import React from 'react'

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import EditGoalScreen from '../screens/EditGoalScreen'
import ViewGoalScreen from '../screens/ViewGoalScreen'
import AddGoalScreen from '../screens/AddGoalScreen'




const EditGoalNavigator = createStackNavigator({
  View : {
    screen: ViewGoalScreen
  },
  Edit : {
    screen: EditGoalScreen
  }

})
const botTabGoalNavigator = createBottomTabNavigator({
  View :EditGoalNavigator,
  Add: AddGoalScreen

  
})
export default createAppContainer(botTabGoalNavigator);