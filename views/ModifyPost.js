import PropTypes from 'prop-types';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, Card, Input} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useMedia} from '../hooks';
import {MainContext} from '../contexts/MainContext';
import {uploadsUrl} from '../utils';
import {COLORS, SIZES} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserAvatar from '../components/UserAvatar';

const ModifyPost = ({route, navigation}) => {
  const {updateMedia} = useMedia();
  const {update, setUpdate, user} = useContext(MainContext);
  const [mediaObject, setMediaObject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    title,
    filename,
    description,
    file_id: fileId,
    user_id: userId,
  } = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const onSubmit = async (data) => {
    setIsAnimating(true);
    const userToken = await AsyncStorage.getItem('userToken');

    try {
      await updateMedia(fileId, data, userToken).then(() => {
        setUpdate(!update);
        navigation.goBack();
      });
    } catch (error) {
      console.log('Error: ' + error);
      setIsAnimating(false);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <Card containerStyle={{borderRadius: SIZES.base, marginTop: SIZES.xxl}}>
        <View
          style={{
            flexDirection: 'row',
            justifyItem: 'center',
            alignItems: 'center',
            marginBottom: SIZES.extraLarge,
          }}
        >
          <UserAvatar userId={userId} />
          <Text style={{fontSize: SIZES.large}}>{user.username}</Text>
        </View>

        <Card.Image
          source={{
            uri: uploadsUrl + filename,
          }}
          containerStyle={{
            borderRadius: SIZES.base,
            margin: SIZES.base,
          }}
        >
          <ActivityIndicator
            animating={isAnimating} // replace with the post indicator
            size={80}
            color={'gray'}
            style={
              isAnimating
                ? {
                    backgroundColor: '#F5FCFF88',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: mediaObject?.uri ? -1 : 1,
                  }
                : {}
            }
          />
        </Card.Image>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 5,
              message: 'Must be at least 5 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="title"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              errorStyle={{color: 'red'}}
              errorMessage={errors.title && errors.title.message}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="description"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize={'none'}
            />
          )}
          name="description"
        />
        <Button
          title="Save Changes"
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: 'rgba(78, 116, 289, 1)',
          }}
          containerStyle={styles.btnContainer}
          titleStyle={styles.buttonTitleStyle}
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          title="Cancel"
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: 'white',
          }}
          containerStyle={styles.btnContainer}
          titleStyle={{
            ...styles.buttonTitleStyle,
            color: 'black',
          }}
          onPress={handleSubmit(onSubmit)}
        />
      </Card>
    </KeyboardAwareScrollView>
  );
};

ModifyPost.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

export default ModifyPost;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 48,
    borderRadius: SIZES.xxl,
  },
  buttonTitleStyle: {
    fontSize: SIZES.small,
  },
  btnContainer: {
    elevation: SIZES.large,
    marginBottom: SIZES.medium,
  },
});
