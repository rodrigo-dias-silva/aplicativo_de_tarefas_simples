import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Login from './src/components/Login';

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="inverted" />
      <Text>Open up App.js to start working on your app!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
