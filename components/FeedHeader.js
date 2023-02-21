import {useContext} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS, assets} from '../theme';
import {MainContext} from '../contexts/MainContext';

const FeedHeader = () => {
  const {user} = useContext(MainContext);
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
            source={assets.person}
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
          <Text>Feed</Text>
          <Text>Recommended</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  searchContainer: {
    width: 255,
    borderRadius: 30,
    height: 45,
    alignItems: 'center',
    backgroundColor: '#d4e3ed',
  },
  searchInputContainer: {
    width: 240,
    borderRadius: SIZES.font,
    height: SIZES.large,
    backgroundColor: '#deedf7',
  },
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
  userAvatarContainer: {width: 45, height: 45},
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
