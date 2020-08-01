import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { View } from '../Themed';
import { MostPopular } from '../Home/MostPopular';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [Data, setData] = React.useState<[]>([]);
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=5bff03860e4910cb2a15a526240d4fdc&language=en-US&query=${query}&page=1&include_adult=false`
      )
      .then((res) => setData(res.data.results))
      .catch(() => setData([]));
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <MostPopular searchData={Data} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    height: '100%',
  },
});
