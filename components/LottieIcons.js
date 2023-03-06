import {Platform, View} from 'react-native';
import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

const LottieIcons = () => {
  return (
    <View>
      <AnimatedLottieView
        style={{
          width: Platform.OS === 'ios' ? 200 : 150,
          height: Platform.OS === 'ios' ? 200 : 200,
          marginLeft: Platform.OS === 'ios' ? 40 : 50,
          marginTop: Platform.OS === 'ios' ? 10 : 20,
        }}
        source={require('../assets/lottie/travel.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default LottieIcons;
