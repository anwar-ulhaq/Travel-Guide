import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const EmptyListAnimation = ({title}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style={styles.nofavText}>{title}</Text>
    <LottieView
      source={require('../assets/lottie/no-fav.json')}
      autoPlay
      loop
      style={styles.lottieViewContainer}
    />
  </View>
);
EmptyListAnimation.propTypes = {
  title: PropTypes.string,
};
export default EmptyListAnimation;
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
