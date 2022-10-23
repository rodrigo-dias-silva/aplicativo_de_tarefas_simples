import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

let tasks = [
  { key: '1', task: 'Pagar o agiota' },
  { key: '2', task: 'Pagar o travesti' },
  { key: '3', task: 'Fazer teste de HIV' }
]

export default function App() {
  const [user, setUser] = useState(null)

  const [newTask, setNewTask] = useState('')

  function handleDelete(key) {
    console.log(key);
  }

  function handleEdit(data) {
    console.log(data);
  }

  // if (!user) {
  //   return <Login changeStatus={(user) => setUser(user)} />
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="O que vai fazer hoje?"
            value={newTask}
            onChangeText={(text) => setNewTask(text)}
            placeholderTextColor="#fff"
          />
          <TouchableOpacity style={styles.btnAdd}>
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
    marginHorizontal: 15
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
    backgroundColor: '#81d8f7',
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center'
  },
});
