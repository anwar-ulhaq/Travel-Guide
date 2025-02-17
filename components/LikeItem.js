import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from '@rneui/themed';
import PropTypes from 'prop-types';
import UserAvatar from './UserAvatar';

const LikeItem = ({navigation, singleLike}) => {
  const {getUserById} = useUser();

  const [likeOwner, setLikeOwner] = useState({username: 'fetching..'});

  const fetchLikeOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(singleLike.user_id, token);
      setLikeOwner(userData);
    } catch (e) {
      console.log('Error in fetching like owner', e);
      setLikeOwner({username: '[not available]'});
    }
  };
  useEffect(() => {
    fetchLikeOwner();
  }, []);

  return (
    <Card containerStyle={{height: 65, borderRadius: 10, margin: 2}}>
      <Pressable
        onPress={() => {
          console.log('userid', singleLike.user_id);
          navigation.navigate('OtherUserProfile', {file: singleLike});
        }}
      >
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <UserAvatar userId={singleLike.user_id} />
            <View>
              <Text style={styles.name}>
                {likeOwner.full_name || likeOwner.username}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Card>
  );
};

LikeItem.propTypes = {
  singleLike: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};
export default LikeItem;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
