import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [type, setType] = useState('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    alert('Logou')
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='inverted' />
      <TextInput
        placeholder='Seu e-mail'
        placeholderTextColor='#fff'
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Sua senha'
        placeholderTextColor='#fff'
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.textBtn}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnLink}
        onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={styles.textLink}>
          {type === 'login' ? 'Criar uma conta' : 'Já tem uma conta?'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
    backgroundColor: '#4f4f4f',
    width: '100%',
    marginVertical: 10,
    padding: 15,
    height: 50,
    borderRadius: 5,
    fontSize: 16
  },
  btn: {
    height: 50,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#81d8f7',
    borderRadius: 5,
    marginVertical: 10,
  },
  btnLink: {
    marginTop: 10
  },
  textBtn: {
    fontSize: 16
  },
  textLink: {
    color: '#fff'
  }
})