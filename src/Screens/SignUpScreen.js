
import React, { useState } from 'react';
import {
View,
Text,
TextInput,
TouchableOpacity,
StyleSheet,
ScrollView,
KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = ({ navigation }) => {
const [farmName, setFarmName] = useState('');
const [farmOwner, setFarmOwner] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [address, setAddress] = useState('');
const [error, setError] = useState('');

const handleSignUp = () => {
// Check if any field is empty
if (
farmName === '' ||
farmOwner === '' ||
email === '' ||
password === '' ||
phoneNumber === '' ||
address === ''
) {
setError('All fields are required');
return;
}


// Perform sign-up logic with the entered data
// ...
// After successful sign-up, navigate to the login screen
navigation.navigate('Login');
};

return (
<KeyboardAvoidingView style={styles.container} >
<ScrollView contentContainerStyle={styles.scrollViewContainer}>
<Text style={styles.title}>Sign Up</Text>


    <View style={styles.inputContainer}>
      <Text style={styles.label}>Farm Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Farm Name"
        value={farmName}
        onChangeText={setFarmName}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Farm Owner</Text>
      <TextInput
        style={styles.input}
        placeholder="Farm Owner"
        value={farmOwner}
        onChangeText={setFarmOwner}
      />
    </View>

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

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
    </View>

    <Text style={styles.errorText}>{error}</Text>
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  </ScrollView>
</KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
},
scrollViewContainer: {
flexGrow: 1,
alignItems: 'center',
justifyContent: 'center',
paddingHorizontal: 20,
},
title: {
fontSize: 25,
fontWeight: '900',
marginBottom: 20,
color: 'black',
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
errorText: {
color: 'red',
marginBottom: 10,
},
});

export default SignUpScreen;