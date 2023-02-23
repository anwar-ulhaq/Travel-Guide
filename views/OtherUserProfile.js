import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import {Avatar} from '@rneui/themed';
import {Text, Divider} from '@rneui/themed';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag, useUser, useMedia} from '../hooks';
import {uploadsUrl} from '../utils';
import PropTypes from 'prop-types';
import {ProfileMediaCard} from '../components';
import MasonryList from '@react-native-seoul/masonry-list';
import AndroidSafeArea from '../utils';

const OtherUserProfile = ({navigation, route}) => {
  const {file} = route.params;
  const [userFiles, setUserFiles] = useState([]);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const {getUserById} = useUser();
  const {getAllFilesOfUser} = useMedia();
  const [profileOwner, setProfileOwner] = useState({username: 'fetching...'});

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      console.log('Avatar array: ', avatarArray);
      const avatar = avatarArray.pop().filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProfileOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setProfileOwner(userData);
    } catch (e) {
      console.log('Error in fetching like owner', e);
      setProfileOwner({username: '[not available]'});
    }
  };

  const fetchUserFiles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userFiles = await getAllFilesOfUser(file.user_id, token);
      console.log('Files of the user', userFiles);
      setUserFiles(userFiles);
    } catch (error) {
      console.log('Error in fetching like owner', error);
    }
  };

  useEffect(() => {
    fetchAvatar();
    fetchProfileOwner();
    fetchUserFiles();
  }, []);

  const renderItem = ({item, i}) => {
    return (
      <ProfileMediaCard
        item={item}
        style={{marginLeft: i % 2 === 0 ? 0 : 12}}
      />
    );
  };

  // console.log('Profile owner', profileOwner);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          paddingTop: 16,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <View>
          <Avatar
            rounded
            source={{
              uri: avatar,
            }}
            size={100}
          />
          <View
            style={{
              top: 45,
              left: 45,
              position: 'absolute',
              boarderRadius: 16,
            }}
          ></View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>Total Posts</Text>
          <Text style={{fontSize: 16}}>{userFiles.length}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>200M</Text>
          <Text>Followers </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{fontWeight: 'bold'}}>
          {profileOwner.full_name || profileOwner.username}
        </Text>
      </View>
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginLeft: '10%',
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          {profileOwner.email}
        </Text>
      </View>
      <Divider />
      <MasonryList
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 18,
          alignSelf: 'stretch',
        }}
        containerStyle={{
          marginTop: 16,
        }}
        onEndReached={() => console.log('onEndReached')}
        numColumns={2}
        data={userFiles}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

OtherUserProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default OtherUserProfile;
const styles = StyleSheet.create({
  container: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    alignContent: 'space-between',
    height: 70,
    width: 50,
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: 150,
  },
});
