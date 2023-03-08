import {View} from 'react-native';
import React from 'react';
import ListLike from '../components/ListLike';
import PropTypes from 'prop-types';

const LikedBy = ({route, navigation}) => {
  const {file} = route.params;
  return (
    <View>
      <ListLike navigation={navigation} fileId={file.file_id} />
    </View>
  );
};

export default LikedBy;
LikedBy.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};
