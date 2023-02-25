import {View, Text} from 'react-native';
import React from 'react';
import AppHeader from '../components/AppHeader';
import PropTypes from 'prop-types';

const EditProfile = ({navigation}) => {
  return (
    <View>
      <View style={{flexDirection: 'column'}}>
        <AppHeader title={'Edit Profile'} />
        <View style={{marginTop: 70}}>
          <Text>Hello World</Text>
        </View>
      </View>
    </View>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
};
export default EditProfile;
