import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
function Loading({text}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/loading.json')}
        autoPlay
        loop
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Loading;
