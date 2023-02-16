import {useContext, useState, useEffect} from 'react';
import {Card, Icon, ListItem} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks';
import {uploadsUrl} from '../utils';
import {SpeedDial} from '@rneui/themed';
import PropTypes from 'prop-types';

const UserProfile = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const {setIsLoggedIn, user, setUser} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const [open, setOpen] = useState(false);

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      setAvatar(avatarArray?.pop()?.filename);
    } catch (e) {
      console.error('Use avatar fetch failed', e.message);
    }
  };
  useEffect(() => {
    loadAvatar();
  }, []);
  const logout = async () => {
    console.log('Logging out!');
    setUser({});
    setIsLoggedIn(false);
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('clearing asyncstorage failed', error);
    }
  };

  return (
    <Card>
      <Card.Title>{user.username}</Card.Title>

      <Card.Image source={{uri: uploadsUrl + avatar}} />
      <ListItem>
        <Icon name="email" />
        <ListItem.Title>{user.email}</ListItem.Title>
      </ListItem>
      <ListItem>
        <Icon name="badge" />
        <ListItem.Title>{user.full_name}</ListItem.Title>
      </ListItem>
      <SpeedDial
        isOpen={open}
        iconContainerStyle={{backgroundColor: 'white'}}
        icon={{
          name: 'ellipsis-vertical-outline',
          type: 'ionicon',
          color: 'black',
          size: 20,
        }}
        openIcon={{name: 'close'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          iconContainerStyle={{backgroundColor: 'white'}}
          icon={{name: 'edit'}}
          title="Edit Profile"
          onPress={() => navigation.navigate('Update user')}
        />
        <SpeedDial.Action
          iconContainerStyle={{backgroundColor: 'white'}}
          icon={{name: 'log-out-outline', type: 'ionicon'}}
          title="Logout"
          onPress={logout}
        />
        <SpeedDial.Action
          iconContainerStyle={{backgroundColor: 'white'}}
          icon={{name: 'folder-outline', type: 'ionicon'}}
          title="MyFiles"
          onPress={() => {
            navigation.navigate('MyFiles');
          }}
        />
      </SpeedDial>
    </Card>
  );
};

UserProfile.propTypes = {
  navigation: PropTypes.object,
};
export default UserProfile;
