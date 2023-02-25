import {useContext, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS, assets} from '../theme';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks';
import {uploadsUrl} from '../utils';

const FeedHeader = () => {
  const {user} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('https//:placekittens/180');
  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);

      const avatar = avatarArray.pop().filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={assets.logo}
          resizeMode="cover"
          style={styles.logoImage}
        />

        <View style={styles.userAvatarContainer}>
          <Image
            source={{uri: avatar}}
            resizeMode="contain"
            style={styles.userAvatar}
          />

          <Image
            source={assets.badge}
            resizeMode="contain"
            style={styles.avatarBadge}
          />
        </View>
      </View>
      <View>
        <View style={styles.greetContainer}>
          <Text style={styles.greetUsername}>Hello {user.username} 👋</Text>

          <Text style={styles.greet}>Good Morning 😃</Text>
        </View>
        <View style={styles.userChoice}>
          <Text style={styles.feedOption}>Feed</Text>
          <Text style={styles.RecOption}>Recommended</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  feedOption: {
    fontSize: 20,
  },
  RecOption: {
    fontSize: 20,
    marginLeft: 20,
  },
  leftMargin: {marginLeft: 20},

  headerContainer: {
    backgroundColor: COLORS.primary,
    padding: SIZES.font,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: 170,
    height: 60,
  },
  userAvatarContainer: {width: 45, height: 45, marginRight: 20},
  userAvatar: {width: '100%', height: '100%', borderRadius: 25},
  avatarBadge: {
    position: 'absolute',
    width: SIZES.font,
    height: SIZES.font,
    bottom: 0,
    right: 0,
  },
  greetContainer: {
    marginVertical: SIZES.font,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetUsername: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.large,
    color: COLORS.white,
    marginRight: SIZES.medium,
  },
  greet: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  userChoice: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: SIZES.base,
  },
});
