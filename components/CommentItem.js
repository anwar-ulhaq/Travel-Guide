import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useUser, useTag} from '../hooks';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem as RNEListItem, Button} from '@rneui/themed';
import {ListItemButtonGroup} from '@rneui/base/dist/ListItem/ListItem.ButtonGroup';
import {uploadsUrl} from '../utils';
import moment from 'moment';
import {COLORS, SIZES, SHADOWS} from '../theme';
import PropTypes from 'prop-types';

const CommentItem = ({navigation, singleComment}) => {
  const {getFilesByTag} = useTag();
  const [avatar, setAvatar] = useState('https//:placekittens/180');
  const {getUserById} = useUser();
  const [commentOwner, setCommentOwner] = useState({username: 'fetching..'});
  const {user, commentUpdate, setCommentUpdate} = useContext(MainContext);

  const loadAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag(
        'avatar_' + singleComment.user_id
      );
      const avatar = avatarArray.pop().filename;
      setAvatar(uploadsUrl + avatar);
    } catch (error) {
      console.error('user avatar fetch failed', error.message);
    }
  };
  const fetchCommentOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(singleComment.user_id, token);
      setCommentOwner(userData);
    } catch (e) {
      console.log('Error in fetching comment owner', e);
      setCommentOwner({username: '[not available]'});
    }
  };
  useEffect(() => {
    fetchCommentOwner();
    loadAvatar();
  }, []);

  const buttons = [
    {
      element: () => (
        <Button
          icon={{
            name: 'delete',
            size: 20,
          }}
          buttonStyle={{backgroundColor: 'red', width: 50, height: 50}}
          onPress={() => {
            console.log('Delete comment');
          }}
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
          buttonStyle={{backgroundColor: 'green', width: 50, height: 50}}
          onPress={() => {
            console.log('Edit comment');
          }}
        />
      ),
    },
  ];
  return (
    <View style={styles.post}>
      {user.user_id === singleComment.user_id ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RNEListItem.Swipeable
            containerStyle={{height: 60}}
            onPress={() => {
              // navigation.navigate('Single', item);
              console.log('Button pressed');
            }}
            rightContent={() => (
              <ListItemButtonGroup
                buttons={buttons}
                containerStyle={{width: 100}}
                innerBorderStyle={{color: 'gray'}}
              ></ListItemButtonGroup>
            )}
          >
            <View style={styles.header}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.profileImage} source={{uri: avatar}} />
                <View>
                  <Text style={styles.name}>{commentOwner.username}</Text>
                  <Text style={styles.subtitle}>
                    {moment(singleComment.time_added).startOf('hour').fromNow()}
                  </Text>
                </View>
              </View>
              <Text style={{marginLeft: 10}}>{singleComment.comment}</Text>
            </View>
          </RNEListItem.Swipeable>
        </View>
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={styles.profileImage2} source={{uri: avatar}} />
              <View>
                <Text style={styles.name}>{commentOwner.username}</Text>
                <Text style={styles.subtitle}>
                  {moment(singleComment.time_added).startOf('hour').fromNow()}
                </Text>
              </View>
            </View>
            <Text style={{marginLeft: 10}}>{singleComment.comment}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
CommentItem.propTypes = {
  singleComment: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

export default CommentItem;
const styles = StyleSheet.create({
  cardContainer: {},
  post: {
    height: 55,
    backgroundColor: COLORS.white,
    margin: 5,
    ...SHADOWS.dark,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: -5,
  },
  profileImage2: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  name: {fontWeight: '500', fontSize: 12},
  subtitle: {color: 'gray', fontSize: 10},
  icon: {marginLeft: 'auto'},
  // Body
  description: {paddingHorizontal: 10, lineHeight: 20, letterSpacing: 0.3},
});

{
  /**
  <RNEListItem.Swipeable
          containerStyle={{height: 60}}
          onPress={() => {
            navigation.navigate('Single', item);
          }}
          rightContent={() => (
            <ListItemButtonGroup
              buttons={buttons}
              containerStyle={{width: 100}}
              innerBorderStyle={{color: 'gray'}}
            ></ListItemButtonGroup>
          )}


          </RNEListItem.Swipeable>
        > */
}
