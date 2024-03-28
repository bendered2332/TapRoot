import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet,SafeAreaView, ScrollView, StatusBar, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import screens
import DashboardScreen from './src/Components/Dashboard';
import ProfileScreen from './src/Components/Profile';
import PlantInfoComponent from './src/Components/PlantInfo';
import HistoryScreenComponent from './src/Components/History';
import EditThresholdComponent from './src/Components/EditThreshold';
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
          unmountOnBlur: true,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }} component={DashboardScreen}/>

    <Tab.Screen name="Plant Info" options={{
          unmountOnBlur: true,
          tabBarLabel: 'Plant Info',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="tree" size={size} color={color} />
          },
        }} component={PlantInfoScreen}/>  

    <Tab.Screen name="Threshold" options={{
          unmountOnBlur: true,
          tabBarLabel: 'Threshold',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="chart-line" size={size} color={color} />
          },
        }} component={ThresholdScreen}/>

    <Tab.Screen name="History" options={{
          unmountOnBlur: true,
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
        {/* New screen for OpenAI */}
    
    </Tab.Navigator>      
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: "flex-start",
  },
  scrollView: {
    marginHorizontal: 0,
  }
});

function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <HistoryScreenComponent></HistoryScreenComponent>
      </ScrollView>
    </SafeAreaView>
  );
}

function ThresholdScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <EditThresholdComponent></EditThresholdComponent>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlantInfoScreen() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <ScrollView style={styles.scrollView}>
        <PlantInfoComponent></PlantInfoComponent>
    //   </ScrollView>
    // </SafeAreaView>
  );
}
