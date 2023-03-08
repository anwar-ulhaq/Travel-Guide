import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import {Icon} from '@rneui/themed';
import PropTypes from 'prop-types';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation} from '@react-navigation/core';
import {COLORS, SIZES} from '../theme';

const AppHeader = ({title}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={SIZES.extraLarge}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    height: Platform.OS === 'android' ? 40 : 60,

    backgroundColor: COLORS.secondary,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginBottom: SIZES.large,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

AppHeader.propTypes = {
  title: PropTypes.string,
  onPressLogout: PropTypes.func,
  navigation: PropTypes.object,
};
export default AppHeader;
