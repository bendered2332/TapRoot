import React from 'react';
import { View, Button } from 'react-native';

const Register = ({navigation} ) => {
  return (
    <View>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default Register;
