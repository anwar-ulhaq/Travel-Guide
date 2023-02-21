import {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';


const ProfileMediaCard = ({item, style, navigation}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  // const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('Single', item);
        console.log('ITEM: ' + JSON.stringify(item));
      }}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <View key={item.key} style={[{marginTop: 12, flex: 1}, style]}>
        <Image
          // source={{uri: 'https://media.mw.metropolia.fi/wbma/uploads/' + item.thumbnails.w160}}
          source={{uri: item.thumbnails.w160}}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
          }}
          resizeMode="cover"
        />
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
};
