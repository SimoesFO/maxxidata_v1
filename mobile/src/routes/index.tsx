import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Main } from '../screens/Main';
import { OccupationsList } from '../screens/OccupationsList';
import { Occupation } from '../screens/Occupation';
import { EmployeesList } from '../screens/EmployeesList';
import { Employee } from '../screens/Employee';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false}}>
        <Screen name="Main" component={Main} />
        <Screen name="OccupationsList" component={OccupationsList} />
        <Screen name="Occupation" component={Occupation} />
        <Screen name="EmployeesList" component={EmployeesList} />
        <Screen name="Employee" component={Employee} />
      </Navigator>
    </NavigationContainer>
  )
}