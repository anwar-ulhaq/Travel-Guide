import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useContext, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks';
import PropTypes from 'prop-types';
import {Card, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../components/AppHeader';

const ModifyAvatar = ({navigation}) => {
  const [mediafile, setMediafile] = useState({});

  const [loading, setLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();

  const {user} = useContext(MainContext);

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

  const pickFile = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setMediafile(result.assets[0]);
    }
  };
  // console.log('Media file', mediafile);

  return (
    <View>
      <AppHeader title={'Modify Avatar'} />
      <View>
        <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
          <Card>
            <Card.Image
              source={{
                uri: mediafile.uri || 'https://placekitten.com/g/200/300',
              }}
              onPress={pickFile}
            />

            <Button title="Pick a file" onPress={pickFile} />
            <Button
              disabled={!mediafile.uri}
              title="Upload"
              onPress={postAvatar}
            />
            {loading && <ActivityIndicator size="large" />}
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ModifyAvatar.propTypes = {
  navigation: PropTypes.object,
};

export default ModifyAvatar;

const styles = StyleSheet.create({});
