import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

export default function TaskList({ data, deleteItem, editItem }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => deleteItem(data.key)}>
        <Feather name='trash' color='#fff' size={20} />
      </TouchableOpacity>

      <View style={{ marginHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={styles.text}>{data.task}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#4f4f4f',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10
  },
  text: {
    color: '#fff'
  }
})