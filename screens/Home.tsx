import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { MostPopular } from '../components/Home/MostPopular';

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Popular</Text>
      <MostPopular />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
});
