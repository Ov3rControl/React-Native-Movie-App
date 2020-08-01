import React from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { View, Text } from '../Themed';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, Card, IconButton, Portal, Dialog } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export const Cart: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);
  return (
    <View style={styles.container}>
      {/* <View style={styles.emptyCart}>
        <MaterialIcons
          name="remove-shopping-cart"
          size={160}
          color="gainsboro"
        />
        <Text style={{ fontWeight: 'bold', color: 'grey' }}>
          Your Cart is Empty
        </Text>
      </View> */}

      <ScrollView>
        <Card style={styles.productsContainer}>
          <Card.Title
            titleStyle={{ fontSize: hp('2.5%') }}
            subtitleStyle={{ fontSize: hp('1.8%'), color: 'dodgerblue' }}
            title="The Exapendables 3"
            subtitle="200 EGP"
            left={() => (
              <Image
                style={styles.thumbnail}
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/w185/mb7wQv0adK3kjOUr9n93mANHhPJ.jpg',
                }}
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                color="grey"
                onPress={() => {}}
              />
            )}
          />
        </Card>
      </ScrollView>
      <Button
        style={{ marginTop: 15 }}
        dark
        color="dodgerblue"
        mode="contained"
        onPress={() => setVisible(true)}
      >
        721 L.E Checkout
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <LottieView
              autoPlay
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
              }}
              source={require('../../assets/checkout.json')}
            />
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Successful Payment
            </Text>
            <Button
              style={{ marginTop: 15 }}
              dark
              color="dodgerblue"
              mode="contained"
              onPress={() => setVisible(false)}
            >
              Done
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    height: '100%',
  },
  productsContainer: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginBottom: 5,
    elevation: 2,
  },
  thumbnail: {
    flex: 1,
    borderRadius: 5,
  },
  emptyCart: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
