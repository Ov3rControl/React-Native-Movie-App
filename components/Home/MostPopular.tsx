import React, { Children } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, Snackbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from '../Themed';
import Data from './data';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { CartAtom } from '../../store/atoms/atoms';

export interface IMovieData {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  poster_path: string;
  setCartProducts: any;
  cartProducts: any;
  onShowSnackBar: any;
}
const GLOBAL_IMAGE_URL = 'https://image.tmdb.org/t/p/w185/';
const calculateMoviePrice = (vote_average: number) => {
  return vote_average !== 0 ? Math.round(vote_average * 25) : 100;
};
export const Item = (props: IMovieData) => (
  <View style={styles.container}>
    <Image
      style={styles.thumbnail}
      source={{
        uri: GLOBAL_IMAGE_URL + props.poster_path,
      }}
    />
    <View style={styles.content}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {props.title}
      </Text>
      <Text style={styles.stats}>
        <AntDesign name="star" size={16} color="gold" /> {props.release_date} |{' '}
        {props.vote_average}
      </Text>
      <Text style={styles.stats}>
        <FontAwesome5 name="money-bill" size={16} color="green" />{' '}
        {calculateMoviePrice(props.vote_average)} EGP
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {props.overview}
      </Text>
      <Button
        dark
        color="green"
        icon="cart"
        mode="contained"
        onPress={() => {
          props.onShowSnackBar();
          props.setCartProducts({
            products: [
              ...props.cartProducts.products,
              {
                id: props.id,
                price: calculateMoviePrice(props.vote_average),
                title: props.title,
                thumbnailUrl: props.poster_path,
              },
            ],
          });
        }}
      >
        Add to Cart
      </Button>
    </View>
  </View>
);
interface IProps {
  searchData?: [];
}

export const MostPopular: React.FC<IProps> = ({ searchData }: IProps) => {
  const [cartProducts, setCartProducts] = useRecoilState(CartAtom);
  const [visible, setVisible] = React.useState(false);

  const onShowSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);
  const renderItem = ({ item }: { item: IMovieData }) => (
    <Item
      onShowSnackBar={onShowSnackBar}
      cartProducts={cartProducts}
      setCartProducts={setCartProducts}
      id={item.id}
      title={item.title}
      overview={item.overview}
      vote_average={item.vote_average}
      release_date={item.release_date}
      poster_path={item.poster_path}
    />
  );
  return (
    <>
      <FlatList
        style={{ width: '100%' }}
        data={searchData ? searchData : Data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Snackbar
        style={{ backgroundColor: 'green' }}
        duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
      >
        Movie Added to Cart
      </Snackbar>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  thumbnail: {
    flex: 1,
    height: hp('20%'),
    borderRadius: 5,
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  content: {
    flex: 1.5,
    justifyContent: 'space-between',
    marginLeft: wp('5%'),
    height: hp('20%'),
  },
  description: { color: 'grey' },
  stats: { fontSize: hp('2%') },
});
