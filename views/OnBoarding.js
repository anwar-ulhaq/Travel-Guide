import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';

const OnBoarding = ({navigation}) => {
  const Dots = ({selected}) => {
    const backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';

    return (
      <View
        style={{width: 5, height: 5, marginHorizontal: 3, backgroundColor}}
      />
    );
  };

  const Skip = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={styles.fontSize}>Skip</Text>
    </TouchableOpacity>
  );
  const Next = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={styles.fontSize}>Next</Text>
    </TouchableOpacity>
  );
  const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
      <Text style={styles.fontSize}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => {
        navigation.replace('Login');
      }}
      onDone={() => {
        navigation.navigate('Login');
      }}
      pages={[
        {
          backgroundColor: '#edd97a',
          image: (
            <Image
              source={require('../assets/images/onboard-img4.png')}
              style={{height: 250, width: 320}}
            />
          ),
          title: 'Welcome to Travel Media app',
          subtitle: 'A new social media experience',
        },
        {
          backgroundColor: '#4396',
          image: (
            <Image
              source={require('../assets/images/onboard-img3.png')}
              style={{height: 300, width: 300}}
            />
          ),
          title: 'Post, Share, Comment and Engage',
          subtitle: '',
        },
        {
          backgroundColor: '#f27f57',
          image: (
            <Image
              source={require('../assets/images/onboard-img2.png')}
              style={{height: 200, width: 400}}
            />
          ),
          title: 'Go through the recommended place',
          subtitle: '',
        },
      ]}
    />
  );
};

OnBoarding.propTypes = {
  navigation: PropTypes.object,
  selected: PropTypes.bool,
};
export default OnBoarding;

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 16,
  },
});
