import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { Cart } from '../components/Cart/Cart';

export default function CartTab() {
  return (
    <View style={styles.container}>
      <Cart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
