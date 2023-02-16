import {StyleSheet, View, Image} from 'react-native';
import {Avatar} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Text, Divider, Card, Icon, Dialog} from '@rneui/themed';
import {useContext, useState, useEffect} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks';
import {uploadsUrl} from '../utils';

const UserProfile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const [dialogVisibility, setDialogVisibility] = useState(false);

  const toggleVisibilty = () => {
    setDialogVisibility(!dialogVisibility);
  };

  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      console.log('Avatar array: ', avatarArray);
      const avatar = avatarArray.pop().filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
  };
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.imgIcon}>
          <Avatar rounded size="medium" source={{uri: avatar}} />
          <Icon
            iconStyle={{elevation: 3, marginStart: -10}}
            name="add"
            type="iconicon"
            onPress={() => {
              navigation.navigate('ModifyAvatar');
            }}
          />
        </View>
        <Text style={{marginLeft: 5}}>{user.username}</Text>
        <Icon
          title="Dialog"
          name="ellipsis-vertical-outline"
          type="ionicon"
          onPress={() => {
            setDialogVisibility(!dialogVisibility);
          }}
          containerStyle={{marginLeft: 135}}
        />
      </View>
      <Divider />
      <Image
        source={{uri: avatar}}
        style={{width: '100%', height: '40%', borderRadius: 15}}
        resizeMode="cover"
      />
      <Divider />
      <View style={styles.iconBox}>
        <Icon name="mail-outline" type="ionicon" />
        <Text style={{marginLeft: 5}}>{user.email}</Text>
      </View>
      <Divider />
      <View style={styles.iconBox}>
        <Icon name="person-outline" type="iconicon" />
        <Text style={{marginLeft: 5}}>{user.full_name}</Text>
      </View>
      <Divider />
      <View style={{width: '40%'}}></View>
      <Divider />
      <Dialog isVisible={dialogVisibility} onBackdropPress={toggleVisibilty}>
        <Dialog.Title title="User Setting" />
        <Dialog.Actions>
          <Dialog.Button title={'Logout'} onPress={logout} />

          <Dialog.Button
            title={'Edit'}
            onPress={() => {
              setDialogVisibility(false);
              navigation.navigate('ModifyUser');
            }}
          />
          <Dialog.Button
            title={'Myfiles'}
            onPress={() => {
              setDialogVisibility(false);
              navigation.navigate('MyFiles');
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </Card>
  );
};
UserProfile.propTypes = {
  navigation: PropTypes.object,
};
export default UserProfile;
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
