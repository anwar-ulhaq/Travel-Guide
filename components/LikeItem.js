import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useUser, useTag} from '../hooks';
import {uploadsUrl} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES, SHADOWS} from '../theme';
import {Card} from '@rneui/themed';
import {Pressable} from 'react-native';
import PropTypes from 'prop-types';

const LikeItem = ({navigation, singleLike}) => {
  const {getFilesByTag} = useTag();

  const {getUserById} = useUser();

  const [likeOwner, setLikeOwner] = useState({username: 'fetching..'});
  const [avatar, setAvatar] = useState('https//:placekittens/180');

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + singleLike.user_id);
      const avatar = avatarArray.pop().filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };
  const fetchLikeOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(singleLike.user_id, token);
      setLikeOwner(userData);
    } catch (e) {
      console.log('Error in fetching like owner', e);
      setLikeOwner({username: '[not available]'});
    }
  };
  useEffect(() => {
    fetchLikeOwner();
    loadAvatar();
  }, []);

  return (
    <Card containerStyle={{height: 70, marginTop: 4, borderRadius: 10}}>
      <Pressable
        onPress={() => {
          console.log('userid', singleLike.user_id);
          navigation.navigate('OtherUserProfile', {file: singleLike});
        }}
      >
        <View style={styles.header}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}
          >
            <Image style={styles.profileImage} source={{uri: avatar}} />
            <View>
              <Text style={styles.name}>
                {likeOwner.full_name || likeOwner.username}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

LikeItem.propTypes = {
  singleLike: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};
export default LikeItem;

const styles = StyleSheet.create({
  cardContainer: {},
  post: {
    height: 35,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {fontWeight: '500', fontSize: 18},
  subtitle: {color: 'gray', fontSize: 10},
  icon: {marginLeft: 'auto'},
  //Body
  description: {paddingHorizontal: 10, lineHeight: 20, letterSpacing: 0.3},
  /* image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 10,
  }, */

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
