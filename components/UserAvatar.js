import {StyleSheet, Image, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useTag} from '../hooks';
import {uploadsUrl} from '../utils';
import PropTypes from 'prop-types';
import {SIZES, assets} from '../theme';
import {MainContext} from '../contexts/MainContext';

const UserAvatar = ({userId}) => {
  const {isAvatarUpdated} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [tag, setTag] = useState({});
  const [avatar, setAvatar] = useState(
    'https://via.placeholder.com/180&text=loading'
  );

  const loadAvatar = async () => {
    try {
      await getFilesByTag('avatar_' + userId).then((tagArray) => {
        if (tagArray.length === 0) {
          setAvatar(
            'https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png'
          );
        } else {
          setTag(tagArray[0]);
          setAvatar(uploadsUrl + tagArray.pop().filename);
        }
      });
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, [isAvatarUpdated]);
  return (
    <View style={styles.userAvatarContainer}>
      <Image style={styles.profileImage} source={{uri: avatar}} />
      <Image
        source={assets.badge}
        resizeMode="contain"
        style={styles.avatarBadge}
      />
    </View>
  );
};
UserAvatar.propTypes = {
  userId: PropTypes.number,
};
export default UserAvatar;

const styles = StyleSheet.create({
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  userAvatarContainer: {width: 45, height: 45, marginRight: 10},
  userAvatar: {width: '100%', height: '100%', borderRadius: 25},
  avatarBadge: {
    position: 'absolute',
    width: SIZES.font,
    height: SIZES.font,
    bottom: 0,
    right: 0,
  },
});
