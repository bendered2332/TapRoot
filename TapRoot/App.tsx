import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import screens
import DashboardScreen from './src/Components/Dashboard';
import ProfileScreen from './src/Components/Profile';
import PlantInfoScreen from './src/Components/PlantInfo';
import HistoryScreen from './src/Components/History';
import EditThresholdScreen from './src/Components/EditThreshold';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyTabs/>
      </NavigationContainer>
    </PaperProvider>
      
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator> 
    <Tab.Screen name="Dashboard" options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }} component={DashboardScreen}/>
    <Tab.Screen name="Plant Info" options={{
          tabBarLabel: 'Plant Info',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="tree" size={size} color={color} />
          },
        }} component={PlantInfoScreen}/>   
    <Tab.Screen name="Threshold" options={{
          tabBarLabel: 'Threshold',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="chart-line" size={size} color={color} />
          },
        }} component={EditThresholdScreen}/>
    <Tab.Screen name="History" options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="table-clock" size={size} color={color}/>;
          },
        }} component={HistoryScreen}/>
    <Tab.Screen name="Profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="face-man-profile" size={size} color={color}/>;
          },
        }} component={ProfileScreen} />
    
  </Tab.Navigator>
  );
}
