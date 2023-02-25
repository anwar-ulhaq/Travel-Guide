import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Button, Card} from '@rneui/themed';
import {Input} from '@rneui/base';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useUser} from '../hooks';
import {MainContext} from '../contexts/MainContext';
import AppHeader from '../components/AppHeader';

// TODO move styling to style sheet
const ModifyProfile = ({navigation}) => {
  const {checkUsername, updateUser} = useUser();
  const {user, isEditProfile, setIsEditProfile} = React.useContext(MainContext);
  // eslint-disable-next-line camelcase
  const {username, email, full_name} = user;
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: username || '',
      password: '',
      email: email || '',
      // eslint-disable-next-line camelcase
      full_name: full_name || '',
    },
    mode: 'onBlur',
  });

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  );

  const userNameValidation = async (value) => {
    if (value !== user.username) {
      const usernameData = await checkUsername(value).then(
        (usernameData) => usernameData
      );
      return usernameData.available;
    } else {
      return true;
    }
  };

  const comparePassword = (value) => {
    return value === getValues('password') || 'Password not match';
  };

  const onSubmit = async (data) => {
    try {
      await AsyncStorage.getItem('userToken').then(async (userToken) => {
        Object.keys(data).forEach(
          (key) => data[key] === '' && delete data[key]
        );
        if (userToken) {
          await updateUser(data, userToken).then(() => {
            setIsEditProfile(!isEditProfile);
          });
        }
      });
    } catch (error) {
      console.log('Error AsyncStorage userToken');
    }
  };

  return (
    <SafeAreaView>
      <Card containerStyle={{borderRadius: 8}}>
        <Card.Title
          h4
          h4Style={{
            fontWeight: '200',
            textAlign: 'center',
          }}
        >
          Edit Profile
        </Card.Title>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters.',
            },
            validate: userNameValidation,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              value={value}
              onBlur={onBlur}
              placeholder="username"
              onChangeText={onChange}
              autoCapitalize={'none'}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputFieldInputStyle}
              errorStyle={styles.inputFieldErrorStyle}
              inputContainerStyle={styles.inputContainerStyle}
              errorMessage={errors.username && errors.username.message}
            />
          )}
          name="username"
        />

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
            pattern: {
              value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
              message: 'Min 3 Characters, 1 number and 1 uppercase letter',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              value={value}
              onBlur={onBlur}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChange}
              autoCapitalize={'none'}
              autoComplete={'password'}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputFieldInputStyle}
              errorStyle={styles.inputFieldErrorStyle}
              inputContainerStyle={styles.inputContainerStyle}
              errorMessage={errors.password && errors.password.message}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            validate: comparePassword,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              value={value}
              onBlur={onBlur}
              secureTextEntry={true}
              onChangeText={onChange}
              autoCapitalize={'none'}
              autoComplete={'password'}
              placeholder="Confirm password"
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputFieldInputStyle}
              errorStyle={styles.inputFieldErrorStyle}
              inputContainerStyle={styles.inputContainerStyle}
              errorMessage={
                errors.confirm_password && errors.confirm_password.message
              }
            />
          )}
          name="confirm_password"
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            pattern: {
              value: emailRegex,
              message: 'Must be a valid email',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              value={value}
              onBlur={onBlur}
              placeholder="email"
              onChangeText={onChange}
              autoCapitalize={'none'}
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputFieldInputStyle}
              errorStyle={styles.inputFieldErrorStyle}
              inputContainerStyle={styles.inputContainerStyle}
              errorMessage={errors.email && errors.email.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'This field is required',
            },
            minLength: {
              value: 3,
              message: 'Must be at least 3 characters.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Enter full name"
              containerStyle={styles.containerStyle}
              inputStyle={styles.inputFieldInputStyle}
              errorStyle={styles.inputFieldErrorStyle}
              inputContainerStyle={styles.inputContainerStyle}
              errorMessage={errors.full_name && errors.full_name.message}
            />
          )}
          name="full_name"
        />

        <Button
          title="Save Changes"
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: 'rgba(78, 116, 289, 1)',
          }}
          containerStyle={{elevation: 20, marginBottom: 16}}
          titleStyle={styles.buttonTitleStyle}
          onPress={handleSubmit(onSubmit)}
        />
        <Button
          title="Cancel"
          buttonStyle={{
            ...styles.buttonStyle,
            backgroundColor: 'white',
          }}
          containerStyle={{elevation: 20, marginBottom: 16}}
          titleStyle={{
            ...styles.buttonTitleStyle,
            color: 'black',
          }}
          onPress={() => {
            setIsEditProfile(!isEditProfile);
          }}
        />
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 16,
    // backgroundColor: 'rgba(78, 116, 289, 1)',
    borderRadius: 36,
    borderColor: 'gray',
    borderWidth: 1,
    paddingRight: 16,
    paddingLeft: 16,
    height: 48,
  },
  inputFieldErrorStyle: {
    color: 'red',
    textAlign: 'center',
  },
  inputFieldInputStyle: {
    fontSize: 16,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 36,
  },
  buttonTitleStyle: {
    fontSize: 13,
  },
});

ModifyProfile.propTypes = {
  navigation: PropTypes.object,
};

export default ModifyProfile;
