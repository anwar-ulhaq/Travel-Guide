import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useFavourite, useUser} from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uploadsUrl} from '../utils';
import {Image, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import moment from 'moment';
import {COLORS, SIZES, SHADOWS} from '../theme';
import UserAvatar from '../components/UserAvatar';

const Favourites = ({myFilesOnly = false}) => {
  const navigation = useNavigation();
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

  const Item = ({singleItem}) => {
    const {getUserById} = useUser();
    const [owner, setOwner] = useState({username: 'fetching..'});
    const fetchOwner = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userData = await getUserById(singleItem.user_id, token);
        setOwner(userData);
      } catch (e) {
        console.log('Error in fetching owner', e);
        setOwner({username: '[not available]'});
      }
    };
    useEffect(() => {
      fetchOwner();
    }, [update]);
    return (
      <Pressable onPress={() => navigation.navigate('SinglePost', singleItem)}>
        <View>
          <View style={styles.post}>
            <View style={styles.header}>
              <View style={{flexDirection: 'row'}}>
                <UserAvatar userId={singleItem.user_id} />
                <View>
                  <Text style={styles.name}>{owner.username}</Text>
                  <Text style={styles.subtitle}>
                    {moment(singleItem.time_added).fromNow()}
                  </Text>
                </View>
              </View>
            </View>
            {singleItem.description && (
              <Text style={styles.description}>{singleItem.description}</Text>
            )}
            <View style={{width: '98%', height: 250}}>
              <Image
                style={styles.image}
                source={{uri: uploadsUrl + singleItem.filename}}
                resizeMode="cover"
              >
                <Icon
                  name="heart-circle-outline"
                  type="ionicon"
                  size={40}
                  color="red"
                  containerStyle={styles.iconImage}
                />
              </Image>
            </View>
            <View style={styles.footer}>
              <View style={styles.statsRow}></View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  const renderUsersItem = ({item}) => <Item singleItem={item} />;
  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.primary, paddingVertical: 16}}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={favArray}
        renderItem={renderUsersItem}
        keyExtractor={(item, index) => index.toString()}
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
  avatarContainer: {
    borderWidth: 5,
    borderRadius: 60,
    margin: 5,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    padding: 5,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  cardContainer: {},
  post: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    height: 350,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {fontWeight: '500'},
  subtitle: {color: 'gray'},
  icon: {marginLeft: 'auto'},
  //Body
  description: {paddingHorizontal: 10, lineHeight: 20, letterSpacing: 0.3},
  /* image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 10,
  }, */
  iconImage: {
    position: 'absolute',
    top: 15,
    right: 15,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.font,
    margin: 5,
  },
  buttonsRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButtonText: {marginLeft: 5, color: 'gray', fontWeight: '500'},
});
