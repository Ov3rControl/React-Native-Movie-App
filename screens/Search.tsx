import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { Search } from '../components/Search/Search';

export default function SearchTab() {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
