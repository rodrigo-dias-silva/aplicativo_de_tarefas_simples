import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import firebase from '../../services/firebaseConnection'

export default function Login({ changeStatus }) {
  const [type, setType] = useState('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    if (type === 'login') {
      // Fazer o login
      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((error) => {
          console.log(error)
          alert('Ops, parece que deu algum erro!')
          return
        })
    } else {
      //cadastrar usuario
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((error) => {
          console.log(error)
          alert('Ops, erro ao cadastrar!')
          return
        })
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={require('../../../assets/check.png')} style={{ width: 100, height: 100, marginBottom: 30 }} />
      </View>
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

      <TouchableOpacity style={[styles.btn, { backgroundColor: type !== 'login' ? '#8cffcf' : '#81d8f7' }]} onPress={handleLogin}>
        <Text style={styles.textBtn}>
          {type === 'login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnLink}
        onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}
      >
        <Text style={styles.textLink}>
          {type === 'login' ? 'Criar uma conta' : 'J?? tem uma conta?'}
        </Text>
      </TouchableOpacity>
      <StatusBar style='inverted' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
    backgroundColor: '#4f4f4f',
    width: '80%',
    marginVertical: 10,
    padding: 15,
    height: 50,
    borderRadius: 5,
    fontSize: 16
  },
  btn: {
    height: 50,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  btnLink: {
    marginTop: 10
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '500'
  },
  textLink: {
    color: '#fff'
  }
})