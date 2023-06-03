import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
// login logic with email and password


navigation.navigate('HomeStack');
};

return (
<View style={styles.container}>
<Text style={styles.title}>Log In</Text>


  <View style={styles.inputContainer}>
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
    />
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
  </View>

  <TouchableOpacity style={styles.button} onPress={handleLogin}>
    <Text style={styles.buttonText}>Log In</Text>
  </TouchableOpacity>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 20,
backgroundColor: '#fff',
},
title: {
fontSize: 25,
fontWeight: '900',
marginBottom: 20,
},
inputContainer: {
  marginBottom: 10,
  width: '100%',
  },
  label: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 5,
  color: 'black',
  },
  input: {
  borderWidth: 1.5,
  borderColor: 'black',
  borderRadius: 2,
  padding: 10,
  color: 'black',
  fontSize: 16,
  width: '100%',
  },
  button: {
  width: '100%',
  height: 40,
  backgroundColor: 'green',
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  },
buttonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
});

export default LoginScreen;