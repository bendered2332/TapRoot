
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../Components/Register';
import Login from '../Components/Login';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
