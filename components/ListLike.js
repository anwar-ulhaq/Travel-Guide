import {SafeAreaView, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {SIZES, COLORS} from '../theme';
import {useFavourite} from '../hooks';
import {MainContext} from '../contexts/MainContext';
import LikeItem from './LikeItem';
import PropTypes from 'prop-types';
import AnimatedLottieView from 'lottie-react-native';

const ListLike = ({navigation, fileId}) => {
  // console.log('File id', fileId);
  const [likes, setLikes] = useState([]);
  const {getFavouriteById} = useFavourite();
  const {likeUpdate} = useContext(MainContext);

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouriteById(fileId);
      setLikes(likesData);
      // console.log(likesData);
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };
  useEffect(() => {
    fetchLikes();
  }, [likeUpdate]);

  const LikeListHeader = () => (
    <View>
      <AnimatedLottieView
        style={styles.animation}
        source={require('../assets/lottie/like.json')}
        autoPlay
        loop
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          marginBottom: 20,
        }}
      >
        <Text style={{fontSize: SIZES.extraLarge}}>Likes</Text>
      </View>
    </View>
  );
  const LikeListEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
      }}
    >
      <Text style={{fontSize: 18}}>No Likes on this post</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={likes}
            keyExtractor={(item) => item.favourite_id.toString()}
            renderItem={({item}) => (
              <LikeItem navigation={navigation} singleLike={item} />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={LikeListEmptyComponent}
            ListHeaderComponent={LikeListHeader}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.lowerCard} />
          <View style={styles.upperCard} />
        </View>
      </View>
    </SafeAreaView>
  );
};

ListLike.propTypes = {
  fileId: PropTypes.number.isRequired,
  navigation: PropTypes.object,
};
export default ListLike;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  flatListContainer: {
    zIndex: 0,
  },
  cardContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  lowerCard: {
    height: 350,
    backgroundColor: COLORS.white,
  },
  upperCard: {
    height: 300,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
