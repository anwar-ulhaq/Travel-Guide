import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useUser, useTag} from '../hooks';
import {uploadsUrl} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES, SHADOWS} from '../theme';
import {Card} from '@rneui/themed';
import {Pressable} from 'react-native';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';
import {MainContext} from '../contexts/MainContext';

const LikeItem = ({navigation, singleLike}) => {
  const {getFilesByTag} = useTag();

  const {getUserById} = useUser();

  const [likeOwner, setLikeOwner] = useState({username: 'fetching..'});
  const [avatar, setAvatar] = useState('https//:placekittens/180');

  const {isAvatarUpdated} = useContext(MainContext);


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
  }, []);
  useEffect(() => {
    loadAvatar();
  }, [isAvatarUpdated]);

  return (
    <Card containerStyle={{height: 65, borderRadius: 10, margin: 2}}>
      <Pressable
        onPress={() => {
          console.log('userid', singleLike.user_id);
          navigation.navigate('OtherUserProfile', {file: singleLike});
        }}
      >
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <UserAvatar userId={singleLike.user_id} />
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
