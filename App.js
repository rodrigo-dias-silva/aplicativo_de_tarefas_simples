import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Feather from '@expo/vector-icons/Feather'

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';
import firebase from './src/services/firebaseConnection'

export default function App() {
  const [user, setUser] = useState(null)
  const inputRef = useRef(null)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [key, setKey] = useState('')

  useEffect(() => {

    function getUser() {
      if (!user) {
        return
      }

      firebase.database().ref('tasks').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            task: childItem.val().task
          }

          setTasks(oldTasks => [...oldTasks, data])
        })
      })
    }

    getUser();
  }, [user])

  function handleAdd() {
    if (newTask === '') {
      return
    }

    if (key !== '') {
      firebase.database().ref('tasks').child(user).child(key).update({
        task: newTask
      })
        .then(() => {
          const taskIndex = tasks.findIndex(item => item.key === key)
          const taskClone = tasks
          taskClone[taskIndex].task = newTask

          setTasks([...taskClone])
        })

      Keyboard.dismiss()
      setNewTask('')
      setKey('')
      return;
    }

    let tarefas = firebase.database().ref('tasks').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      task: newTask
    })
      .then(() => {
        const data = {
          key: chave,
          task: newTask
        };

        setTasks(oldTasks => [...oldTasks, data])
      })

    Keyboard.dismiss();
    setNewTask('')
  }

  function handleDelete(key) {
    firebase.database().ref('tasks').child(user).child(key).remove()
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)
        setTasks(findTasks)
      })
  }

  function handleEdit(data) {
    setKey(data.key)
    setNewTask(data.task)
    inputRef.current.focus()
  }

  function cancelEdit() {
    setKey('')
    setNewTask('')
    Keyboard.dismiss();
  }

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>

        {key.length > 0 && (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={cancelEdit}>
              <Feather name='x-circle' size={20} color='#f44' />
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, color: '#f44' }}>Você está editando uma tarefa!</Text>
          </View>
        )}

        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="O que vai fazer hoje?"
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
            placeholderTextColor="#fff"
            ref={inputRef}
          />
          <TouchableOpacity style={[styles.btnAdd, { backgroundColor: key.length > 0 ? '#f43' : '#81d8f7' }]} onPress={handleAdd}>
            <Text style={{ fontSize: 25 }}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TaskList
              data={item}
              deleteItem={handleDelete}
              editItem={handleEdit}
            />
          )}
        />
      </View>
      <StatusBar style='inverted' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    // alignItems: 'center',
  },
  subContainer: {
    marginHorizontal: 15,
    marginTop: 45
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#4f4f4f',
    marginVertical: 10,
    padding: 15,
    height: 50,
    borderRadius: 5,
    fontSize: 16
  },
  btnAdd: {
    height: 50,
    width: 50,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center'
  },
});
