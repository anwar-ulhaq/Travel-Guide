import {useContext, useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS, assets} from '../theme';
import {MainContext} from '../contexts/MainContext';
import {useTag} from '../hooks';
import {uploadsUrl} from '../utils';
import TopPost from './TopPost';

const FeedHeader = () => {
  const {user, isAvatarUpdated} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
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
  }, [isAvatarUpdated]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = '';

    if (hour >= 0 && hour < 5) {
      greeting = 'Good night';
    } else if (hour >= 5 && hour < 12) {
      greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon';
    } else if (hour >= 18 && hour < 22) {
      greeting = 'Good evening';
    } else {
      greeting = 'Good night';
    }

    return greeting;
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Travel Guide</Text>

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

          <Text style={styles.greet}>{getGreeting()} 😃</Text>
        </View>
      </View>
      <TopPost />
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
