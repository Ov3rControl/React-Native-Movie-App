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
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CartAtom } from '../../store/atoms/atoms';

export interface IProducts {
  id: number;
  title: string;
  price: number;
  thumbnailUrl: string;
}

export const Cart: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = useRecoilState(CartAtom);
  const resetData = useResetRecoilState(CartAtom);
  const hideDialog = () => setVisible(false);
  const totalPrice = data.products.reduce((a, { price }) => a + price, 0);
  const removeMoveFromCart = (id: number) => {
    const index = data.products.findIndex((obj: any) => obj.id === id);
    const newData = [
      ...data.products.slice(0, index),
      ...data.products.slice(index + 1),
    ];
    setData({ products: newData });
  };
  return (
    <View style={styles.container}>
      {data.products.length < 1 ? (
        <View style={styles.emptyCart}>
          <MaterialIcons
            name="remove-shopping-cart"
            size={160}
            color="gainsboro"
          />
          <Text style={{ fontWeight: 'bold', color: 'grey' }}>
            Your Cart is Empty
          </Text>
        </View>
      ) : (
        <>
          <ScrollView>
            {data.products &&
              data.products.map((product: any) => (
                <Card key={product?.id} style={styles.productsContainer}>
                  <Card.Title
                    titleStyle={{ fontSize: hp('2.5%') }}
                    subtitleStyle={{
                      fontSize: hp('1.8%'),
                      color: 'dodgerblue',
                    }}
                    title={product?.title}
                    subtitle={product?.price + ' EGP'}
                    left={() => (
                      <Image
                        style={styles.thumbnail}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w185/${product.thumbnailUrl}`,
                        }}
                      />
                    )}
                    right={(props) => (
                      <IconButton
                        {...props}
                        icon="delete"
                        color="grey"
                        onPress={() => removeMoveFromCart(product.id)}
                      />
                    )}
                  />
                </Card>
              ))}
          </ScrollView>
          <Button
            style={{ marginTop: 15 }}
            dark
            color="dodgerblue"
            mode="contained"
            onPress={() => {
              setVisible(true);
              resetData();
            }}
          >
            {totalPrice} L.E Checkout
          </Button>
        </>
      )}

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
