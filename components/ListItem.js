import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {uploadsUrl} from '../utils';
import {SHADOWS, SIZES} from '../theme';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';
import LikeImage from '../assets/images/like.png';
import moment from 'moment';
import {PopupMenu} from './';
import {useUser, useFavourite, useMedia, useComment} from '../hooks';
import PropTypes from 'prop-types';
import {Video} from 'expo-av';
import UserAvatar from './UserAvatar';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {
    update,
    setUpdate,
    user,
    isEditPost,
    setIsEditPost,
    commentUpdate,
    likeUpdate,
    setLikeUpdate,
  } = useContext(MainContext);

  const {postFavourite, getFavouriteById, deleteFavourite} = useFavourite();
  const {getUserById} = useUser();

  const [owner, setOwner] = useState({username: 'fetching..'});
  const video = useRef(null);

  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const [index, setIndex] = useState('none');
  const [eventName, setEventName] = useState('none');
  const [selectedOption, setSelectedOption] = useState('none');
  const {getCommentById} = useComment();
  const [comments, setComments] = useState([]);
  const options = ['Edit', 'Delete'];

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(singleMedia.user_id, token);
      setOwner(userData);
    } catch (e) {
      console.log('Error in fetching owner', e);
      setOwner({username: '[not available]'});
    }
  };
  const fetchComments = async () => {
    try {
      const commentsData = await getCommentById(singleMedia.file_id);
      setComments(commentsData);
    } catch (e) {
      console.log('Error in fetching comments', e);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouriteById(singleMedia.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };
  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(token, singleMedia.file_id);
      console.log('Response from create fav LI', response);
      setUserLike(true);
      setLikeUpdate(likeUpdate + 1);
      setUpdate(!update);
    } catch (error) {
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(token, singleMedia.file_id);
      response && setUserLike(false);
      setLikeUpdate(likeUpdate + 1);
      setUpdate(!update);
    } catch (error) {
      console.error('removeFavourite error', error);
    }
  };
  useEffect(() => {
    fetchOwner();
  }, [update]);

  useEffect(() => {
    fetchLikes();
  }, [likeUpdate]);

  useEffect(() => {
    fetchComments();
  }, [commentUpdate]);
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
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(!update);
            Alert.alert('Post', 'deleted successfully');
          },
        },
      ]);
    } catch (error) {
      console.log('Error in deleting media', error);
    }
  };

  const goToEditPost = () => {
    console.log('Edit pressed');
    navigation.navigate('ModifyPost');
  };
  const onPopupEvent = (eventName, index, style) => {
    if (index >= 0) setSelectedOption(options[index]);
    setIndex(index);
    setEventName(eventName);
    console.log('Index: ' + index);

    if (index === 0) {
      setIsEditPost(!isEditPost);
      goToEditPost();
    } else if (index === 1) doDelete();
  };

  return (
    <View style={styles.post}>
      <Pressable style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          {user.user_id !== singleMedia.user_id ? (
            <Pressable
              onPress={() => {
                navigation.navigate('OtherUserProfile', {file: singleMedia});
              }}
            >
              <UserAvatar userId={singleMedia.user_id} />
            </Pressable>
          ) : (
            <UserAvatar userId={singleMedia.user_id} />
          )}
          <View>
            <Text style={styles.name}>{owner.username}</Text>
            <Text style={styles.subtitle}>
              {moment(singleMedia.time_added).fromNow()}
            </Text>
          </View>
        </View>

        <View>
          {user.user_id === singleMedia.user_id && (
            <PopupMenu options={options} onPress={onPopupEvent}>
              <Icon
                name="ellipsis-vertical"
                type="ionicon"
                raised
                size={20}
                style={styles.icon}
              />
            </PopupMenu>
          )}
        </View>
      </Pressable>
      {singleMedia.description && (
        <Text style={styles.description}>{singleMedia.description}</Text>
      )}
      <Pressable
        onPress={() => {
          navigation.navigate('SinglePost', singleMedia);
        }}
      >
        <View style={styles.feedImageContainer}>
          {singleMedia.media_type === 'image' ? (
            <Image
              style={styles.image}
              source={{uri: uploadsUrl + singleMedia.filename}}
            />
          ) : (
            <Video
              ref={video}
              source={{uri: uploadsUrl + singleMedia.filename}}
              style={{width: '100%', height: 250}}
              resizeMode="cover"
              useNativeControls
              onError={(error) => {
                console.log(error);
              }}
              isLooping
            />
          )}
        </View>
      </Pressable>

      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <Pressable
            style={{flexDirection: 'row'}}
            onPress={() => navigation.navigate('LikedBy', {file: singleMedia})}
          >
            <Image source={LikeImage} style={styles.likeIcon} />
            <Text style={styles.likedBy}> {likes.length}</Text>
          </Pressable>
          <Icon
            name="chatbox-ellipses-outline"
            type="ionicon"
            color={'#3786e8'}
            style={{marginLeft: 20}}
          />
          <Text style={styles.commentInfo}>{comments.length}</Text>
        </View>
        <View style={styles.buttonsRow}>
          <View style={styles.iconButton}>
            {userLike ? (
              <>
                <TouchableOpacity
                  style={styles.iconButton}
                  activeOpacity={0.5}
                  onPress={() => {
                    removeFavourite();
                  }}
                >
                  <Icon
                    name="heart"
                    type="ionicon"
                    color="red"
                    size={20}
                    onPress={() => {
                      removeFavourite();
                    }}
                  />
                  <Text> Dislike</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.iconButton}
                  activeOpacity={1}
                  onPress={() => {
                    createFavourite();
                    fetchLikes();
                  }}
                >
                  <Icon name="heart-outline" type="ionicon" size={20} />
                  <Text> Like</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View style={styles.iconButton}>
            <Icon
              name="chatbox-ellipses"
              type="ionicon"
              color="gray"
              size={18}
              onPress={() => {
                navigation.navigate('SinglePost', singleMedia);
              }}
            />
            <Text
              style={styles.iconButtonText}
              onPress={() => {
                navigation.navigate('SinglePost', {file: singleMedia});
              }}
            >
              Comment
            </Text>
          </View>
          <View style={styles.iconButton}>
            <Icon
              name="share-social-outline"
              type="ionicon"
              color="gray"
              size={18}
            />
            <Text style={styles.iconButtonText}>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;

const styles = StyleSheet.create({
  post: {
    backgroundColor: '#E6EEFA',
    borderRadius: SIZES.font,
    marginBottom: SIZES.extraLarge,
    margin: SIZES.base,
    ...SHADOWS.dark,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {fontWeight: '500'},
  subtitle: {color: 'gray'},
  icon: {marginLeft: 'auto'},
  commentInfo: {color: 'gray', marginLeft: 5},
  userAvatarContainer: {width: 45, height: 45, marginRight: 10},
  userAvatar: {width: '100%', height: '100%', borderRadius: 25},
  avatarBadge: {
    position: 'absolute',
    width: SIZES.font,
    height: SIZES.font,
    bottom: 0,
    right: 0,
  },

  // Dialog container
  dialogBox: {
    width: 110,
    height: 125,
    elevation: SIZES.base,
    position: 'absolute',
    top: 80,
    left: 200,
    borderRadius: SIZES.extraLarge,
  },
  dialogItemEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base,
    backgroundColor: '#07b37f',
    height: 40,
    borderRadius: SIZES.font,
  },
  dialogItemDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2132d',
    height: 40,
    borderRadius: SIZES.font,
  },
  // Body
  description: {paddingHorizontal: 10, lineHeight: 20, letterSpacing: 0.3},

  image: {
    width: '100%',
    height: '100%',
    // borderRadius: SIZES.font,
    marginTop: 5,
  },
  feedImageContainer: {width: '100%', height: 250},
  // Footer
  footer: {paddingHorizontal: 10},
  statsRow: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  likeIcon: {width: 20, height: 20, marginRight: 5},
  likedBy: {color: 'gray'},
  shares: {
    marginLeft: 'auto',
    color: 'gray',
  },
  // Buttons Row
  buttonsRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButtonText: {marginLeft: 5, color: 'gray', fontWeight: '500'},
});
