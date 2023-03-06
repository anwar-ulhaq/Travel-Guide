import {StyleSheet, View, FlatList, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useFavourite} from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import FavItem from '../components/FavItem';
import EmptyListAnimation from '../components/ListEmptyAnimation';

const Favourites = ({myFilesOnly = false}) => {
  const {getAllFavourite} = useFavourite();
  const [favArray, setFavArray] = useState([]);
  const {update} = useContext(MainContext);

  const fetchFavoritesByUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const favoritesData = await getAllFavourite(token);
      setFavArray(favoritesData);
    } catch (error) {
      console.error('fetchFavoritesByUser error', error.message);
      Alert.alert('Error loading favorite posts');
    }
  };

  useEffect(() => {
    fetchFavoritesByUser();
  }, [update]);

  const renderUsersItem = ({item}) => <FavItem singleItem={item} />;
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={favArray}
        renderItem={renderUsersItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyListAnimation title={'Sorry!! No favourites Found'} />
        }
      />
    </View>
  );
};

Favourites.propTypes = {
  singleItem: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};
export default Favourites;

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    backgroundColor: '#E6EEFA',
    paddingVertical: 16,
  },
  nofavText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 80,
  },
  lottieViewContainer: {width: 200, height: 200},
});
