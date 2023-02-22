import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Icon} from '@rneui/themed';
import MasonryList from '@react-native-seoul/masonry-list';
import {
  AsyncStorage,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {MainContext} from '../contexts/MainContext';
import {useMedia, useUser} from '../hooks';
import {PopupMenu, ProfileMediaCard} from './';

const ViewProfile = ({navigation, myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  const [index, setIndex] = useState('none');
  const [eventName, setEventName] = useState('none');
  const [selectedOption, setSelectedOption] = useState('none');
  const {getUserAvatar} = useUser();
  const [tag, setTag] = useState({});
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const options = ['Edit', 'Logout'];

  const {user, setIsLoggedIn, isEditProfile, setIsEditProfile} =
    React.useContext(MainContext);

  const loadAvatar = async () => {
    const tag = await getUserAvatar('avatar_' + user.user_id).then(
      (tagArray) => tagArray[0]
    );
    setTag(tag);
    setAvatar('https://media.mw.metropolia.fi/wbma/uploads/' + tag.filename);
  };

  const onPopupEvent = (eventName, index) => {
    if (index >= 0) setSelectedOption(options[index]);
    setIndex(index);
    setEventName(eventName);
    if (index === 0) setIsEditProfile(!isEditProfile);
    else if (index === 1) logout();
  };

  const renderItem = ({item, i}) => {
    return (
      <ProfileMediaCard
        item={item}
        style={{marginLeft: i % 2 === 0 ? 0 : 12}}
      />
    );
  };

  const logout = async () => {
    console.log('User logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, [user.user_id]);

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
          justifyContent: 'space-between',
        }}
      >
        <Icon
          size={16}
          raised
          name="arrow-left"
          type="font-awesome-5"
          onPress={() => {}}
        />
        <View>
          <Avatar
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/women/40.jpg',
            }}
            size="large"
          />
          <View
            style={{
              top: 45,
              left: 45,
              position: 'absolute',
              boarderRadius: 16,
            }}
          >
            <Icon
              size={16}
              raised
              reverse
              name="plus"
              type="font-awesome-5"
              color={'rgba(78, 116, 289, 1)'}
              onPress={() => {}}
              containerStyle={{padding: 0, margin: 0}}
            />
          </View>
        </View>
        <View>
          <PopupMenu options={options} onPress={onPopupEvent}>
            <Icon size={16} raised name="ellipsis-v" type="font-awesome-5" />
          </PopupMenu>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>101K</Text>
          <Text>Following</Text>
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
        <Text style={{fontWeight: 'bold'}}>@Catherine007</Text>
      </View>
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginLeft: '10%',
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          // /!* backgroundColor: 'rgba(78, 116, 289, 1)',*!/
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          My name is Catherine. I like dancing in the rain and travelling all
          around the world.
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          title="Follow"
          buttonStyle={{
            height: 48,
            width: 120,
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 36,
          }}
          titleStyle={{
            fontSize: 13,
            color: 'white',
          }}
          containerStyle={{elevation: 20}}
          onPress={() => {
            // navigation.navigate('Single', singleMedia);
          }}
        />
        <Button
          title="Messages"
          size={'lg'}
          buttonStyle={{
            height: 48,
            width: 120,
            backgroundColor: 'white',
            borderRadius: 36,
            paddingVertical: 5,
          }}
          titleStyle={{
            fontSize: 13,
            color: 'black',
          }}
          containerStyle={{elevation: 20}}
          onPress={() => {
            // navigation.navigate('Single', singleMedia);
          }}
        />
      </View>
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
        data={mediaArray}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

ViewProfile.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default ViewProfile;
