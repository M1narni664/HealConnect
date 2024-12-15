import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const db = SQLite.openDatabase(
    { name: 'userdb', createFromLocation: '~usersdb.sqlite' },
    () => console.log('Database opened successfully'),
    (error) => console.error('Error opening database: ', error)
  );

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Validation Error', 'Username or Password cannot be empty!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (tx, results) => {
          if (results.rows.length === 0) {
            Alert.alert('Error', 'Invalid Username or Password!');
            return;
          }

          const user = results.rows.item(0);
          if (user.password === password) {
            AsyncStorage.setItem('loggedIn', JSON.stringify(true));
            AsyncStorage.setItem('userCurrent', JSON.stringify(user));
            navigation.navigate('AfterLogin');
          } else {
            Alert.alert('Error', 'Invalid Username or Password!');
          }
        },
        (error) => console.error('SQL Error: ', error)
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text.trim())}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Not a Member? Click Here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  button: {
    backgroundColor: '#7d8ff5',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: 'grey',
  },
});
