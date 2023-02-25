import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useContext, useState, useCallback, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks';
import PropTypes from 'prop-types';
import {Card, Button, Icon} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../theme';

const ModifyAvatar = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});

  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const {user} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const postAvatar = async () => {
    setLoading(true);
    const formData = new FormData();
    // console.log('MEdia file post Avatar', mediafile);
    const filename = mediafile.uri.split('/').pop();
    let fileExt = filename.split('.').pop();
    if (fileExt === 'jpg') fileExt = 'jpeg';
    const mimeType = mediafile.type + '/' + fileExt;
    formData.append('file', {
      uri: mediafile.uri,
      name: filename,
      type: mimeType,
    });
    // console.log('form data', formData);

    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postMedia(formData, token);
      console.log('upload result', result);
      const appTag = {file_id: result.file_id, tag: 'avatar_' + user.user_id};
      const tagResult = await postTag(appTag, token);
      console.log('Tag result', tagResult);
      Alert.alert('Uploaded file successfully');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('file upload failed', error);
    } finally {
      setLoading(false);
    }
  };
  const getCameraPermission = async () => {
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permission');
    }
  };

  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    try {
      await getCameraPermission();
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      console.log('Pick camera result', result);

      if (!result.canceled) {
        setMediafile(result.assets[0]);
      }
    } catch (error) {
      console.log('Error in taking picture', error);
    }
  };

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    // console.log(result);

    if (!result.canceled) {
      setMediafile(result.assets[0]);
    }
  };
  // console.log('Media file', mediafile);
  const resetForm = () => {
    setMediafile({});
    reset();
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        resetForm();
      };
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{marginTop: 30}}>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          <Card>
            <Card.Image
              containerStyle={{borderRadius: 25}}
              source={{
                uri:
                  mediafile.uri ||
                  'https://place-hold.it/200x300&text=choose-avatar',
              }}
              onPress={pickFile}
            />

            <View style={styles.btnContainer}>
              <Button
                buttonStyle={styles.btnWithIcon}
                icon={
                  <Icon name="image" type="ionicon" size={25} color="white" />
                }
                title=" Gallery"
                onPress={pickFile}
                loading={loading}
              />
              <Button
                buttonStyle={styles.btnWithIcon}
                icon={
                  <Icon name="camera" type="ionicon" size={25} color="white" />
                }
                title="Camera"
                onPress={takePicture}
                loading={loading}
              />
            </View>
            <Button
              disabled={!mediafile.uri}
              title="Upload Avatar"
              onPress={postAvatar}
              loading={loading}
              buttonStyle={{borderRadius: 25, margin: 8}}
            />
            <Button
              buttonStyle={styles.btnwithoutIcon}
              title="Cancel"
              onPress={resetForm}
              type="outline"
            />
            {loading && <ActivityIndicator size="large" />}
          </Card>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          <View style={styles.upperCard} />
          <View style={styles.lowerCard} />
        </View>
      </View>
    </SafeAreaView>
  );
};

ModifyAvatar.propTypes = {
  navigation: PropTypes.object,
};

export default ModifyAvatar;
const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  btnwithoutIcon: {borderRadius: 25, margin: 8},
  btnWithIcon: {
    borderRadius: 25,
    width: 105,
    backgroundColor: 'rgba(78, 116, 289, 1)',
  },
  // lowercard background
  lowerCard: {
    height: 300,
    backgroundColor: COLORS.white,
  },

  // uppercard for background
  upperCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
