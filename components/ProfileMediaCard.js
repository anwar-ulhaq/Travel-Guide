import React, {useMemo, useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {Video} from 'expo-av';

const ProfileMediaCard = ({item, style}) => {
  const navigation = useNavigation();
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const videoRef = useRef(null);
  // const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SinglePost', item);
      }}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <View key={item.key} style={[{marginTop: 12, flex: 1}, style]}>
        {item.media_type === 'image' ? (
          <Image
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: 'stretch',
            }}
            source={{uri: uploadsUrl + item.filename}}
            resizeMode="cover"
          />
        ) : (
          <Video
            ref={videoRef}
            source={{uri: uploadsUrl + item.filename}}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: 'stretch',
            }}
            resizeMode="cover"
            useNativeControls
            onError={(error) => {
              console.log(error);
            }}
            isLooping
          />
        )}
        <Text
          style={{
            marginTop: 8,
            color: 'black',
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMediaCard;

ProfileMediaCard.propTypes = {
  i: PropTypes.number,
  item: PropTypes.object,
  style: PropTypes.object,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};
