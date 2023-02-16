import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem as RNEListItem,
} from '@rneui/themed';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {uploadsUrl} from '../utils';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia} from '../hooks';
import {ListItemButtonGroup} from '@rneui/base/dist/ListItem/ListItem.ButtonGroup';

const ListItem = ({navigation, singleMedia}) => {
  const item = singleMedia;
  const {user, update, setUpdate} = useContext(MainContext);
  const {deleteMedia, putMedia} = useMedia();

  const doDelete = () => {
    try {
      Alert.alert('Delete', ' this file permanently', [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(item.file_id, token);
            response && setUpdate(!update);
          },
        },
      ]);
    } catch (error) {
      console.log('Error in deleting media', error);
    }
  };

  const buttons = [
    {
      element: () => (
        <Button
          icon={{
            name: 'delete',
            size: 20,
          }}
          buttonStyle={{backgroundColor: 'red', width: 50, height: 100}}
          onPress={doDelete}
        />
      ),
    },
    {
      element: () => (
        <Button
          icon={{
            name: 'create',
            size: 20,
            type: 'ionicon',
          }}
          buttonStyle={{backgroundColor: 'cyan', width: 50, height: 100}}
          onPress={() => {
            navigation.navigate('Modify', {file: item});
          }}
        />
      ),
    },
    {
      element: () => (
        <Button
          icon={{
            name: 'eye',
            type: 'ionicon',
            size: 20,
          }}
          buttonStyle={{backgroundColor: 'green', width: 50, height: 100}}
          onPress={() => {
            navigation.navigate('Single', item);
          }}
        />
      ),
    },
  ];

  return (
    <>
      {item.user_id === user.user_id ? (
        <RNEListItem.Swipeable
          onPress={() => {
            navigation.navigate('Single', item);
          }}
          rightContent={() => (
            <ListItemButtonGroup
              buttons={buttons}
              containerStyle={{width: 120}}
              innerBorderStyle={{color: 'white', width: 10}}
            ></ListItemButtonGroup>
          )}
        >
          <Avatar
            size="large"
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
          />
          <RNEListItem.Content>
            <RNEListItem.Title>{item.title}</RNEListItem.Title>
            <RNEListItem.Subtitle numberOfLines={3}>
              {item.description}
            </RNEListItem.Subtitle>
          </RNEListItem.Content>
          <RNEListItem.Chevron
            onPress={() => {
              navigation.navigate('Single', item);
            }}
          />
        </RNEListItem.Swipeable>
      ) : (
        <RNEListItem
          onPress={() => {
            navigation.navigate('Single', item);
          }}
        >
          <Avatar
            size="large"
            source={{uri: uploadsUrl + item.thumbnails?.w160}}
          />
          <RNEListItem.Content>
            <RNEListItem.Title>{item.title}</RNEListItem.Title>
            <RNEListItem.Subtitle numberOfLines={3}>
              {item.description}
            </RNEListItem.Subtitle>
            {item.user_id === user.user_id && (
              <ButtonGroup
                buttons={['Modify', 'Delete']}
                rounded
                onPress={(index) => {
                  if (index === 0) {
                    navigation.navigate('Modify', {file: item});
                  } else {
                    doDelete();
                  }
                }}
              />
            )}
          </RNEListItem.Content>
          <RNEListItem.Chevron />
        </RNEListItem>
      )}
    </>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

export default ListItem;
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    width: 50,
    height: 100,
  },
});
