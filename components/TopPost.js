import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useMedia} from '../hooks';
import {COLORS} from '../theme';
import {uploadsUrl} from '../utils';
import {Avatar} from '@rneui/themed';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const TopPost = ({myFilesOnly = false}) => {
  const navigation = useNavigation();
  const {mediaArray, mediaArr} = useMedia(myFilesOnly);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Top Posts</Text>
      </View>
    );
  };
  const Item = ({singleItem}) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#fff',
            overflow: 'hidden',
            margin: 5,
            borderRadius: 40,
          }}
        >
          <Avatar
            rounded
            size={'large'}
            source={{uri: uploadsUrl + singleItem?.thumbnails.w160}}
            onPress={() => {
              navigation.navigate('SinglePost', singleItem);
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderUsersItem = ({item}) => <Item singleItem={item} />;
  return (
    <View
      style={{flex: 1, backgroundColor: COLORS.primary, paddingVertical: 16}}
    >
      {renderHeader()}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={mediaArray}
        renderItem={renderUsersItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{backgroundColor: COLORS.primary, padding: 5, marginBottom: -15}}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Feed
        </Text>
      </View>
    </View>
  );
};
TopPost.propTypes = {
  singleItem: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};
export default TopPost;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 5,
    borderRadius: 60,
    margin: 5,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    padding: 5,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
