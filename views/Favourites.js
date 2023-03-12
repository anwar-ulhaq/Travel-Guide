import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useFavourite} from '../hooks';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import FavItem from '../components/FavItem';
import EmptyListAnimation from '../components/ListEmptyAnimation';

const Favourites = ({myFilesOnly = false}) => {
  const {getUserFavorites} = useFavourite();
  const [favArray, setFavArray] = useState([]);
  const {isFavouriteUpdated, user, isUserUpdate, isAvatarUpdated, likeUpdate} =
    useContext(MainContext);

  const fetchFavoritesByUser = async () => {
    try {
      const favoritesData = await getUserFavorites(user.user_id);
      favoritesData && setFavArray(favoritesData);
    } catch (error) {
      console.error('fetchFavoritesByUser error', error.message);
    }
  };

  useEffect(() => {
    fetchFavoritesByUser();
  }, [isFavouriteUpdated, isUserUpdate, isAvatarUpdated, likeUpdate]);

  const renderUsersItem = ({item}) => <FavItem singleItem={item} />;
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={favArray}
        renderItem={renderUsersItem}
        keyExtractor={(item) => item.file_id}
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
