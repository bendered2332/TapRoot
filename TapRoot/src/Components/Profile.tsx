import React, { useState } from 'react';
import { View, Text, Button, KeyboardAvoidingView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { initAuth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';


const Profile = () => {
  const auth = initAuth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        if (error.message.indexOf('(auth/email-already-in-use)') > -1) {
          alert('Email already in use!');
        }
      } else {
        alert("Sign up failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding'>
        <TextInput style={styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
        <TextInput style={styles.input} value={password} placeholder='Password' autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>
      </KeyboardAvoidingView>


      {loading ? <ActivityIndicator size="large" color="#0000ff" />
        :
        <>
          <Button title='Login' onPress={signIn} />
          <Button title='Create Account' onPress={signUp} />
        </>
      }

    </View>
  )
};

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center'
  },

  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  }

});

export default Profile;