import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screens
import DashboardScreen from './src/Components/Dashboard';
import ProfileScreen from './src/Components/Profile';
import PlantInfoScreen from './src/Components/PlantInfo';
import HistoryScreen from './src/Components/History';
import EditThresholdScreen from './src/Components/EditThreshold';

export default function App() {
  return (
    <NavigationContainer>
    <MyTabs/>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={DashboardScreen}/>
    <Tab.Screen name="Plant Info" component={PlantInfoScreen}/>
    <Tab.Screen name="Treshold" component={EditThresholdScreen}/>
    <Tab.Screen name="History" component={HistoryScreen}/>
    <Tab.Screen name="Profile" component={ProfileScreen} />

  </Tab.Navigator>
  );
}