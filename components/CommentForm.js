import {
  View,
  Alert,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {Button, Input, TextInput, Icon} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useComment} from '../hooks';
import {useContext, useCallback} from 'react';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import PropTypes from 'prop-types';

const CommentForm = ({fileId}) => {
  const {postComment} = useComment(fileId);
  const {commentUpdate, setCommentUpdate} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      userComment: '',
    },
  });
  const reset = () => {
    setValue('userComment', '');
  };
  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );
  const postUserComment = async (comment) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!comment.comment.trim()) {
        return;
      }
      const response = await postComment(token, {
        file_id: fileId,
        comment: comment.comment,
      });
      response &&
        Alert.alert('Comment', 'uploaded', [
          {
            text: 'OK',
            onPress: () => {
              Keyboard.dismiss();
              setValue('userComment', '');
              setCommentUpdate(commentUpdate + 1);
            },
          },
        ]);
      Keyboard.dismiss();
      setValue('userComment', '');
    } catch (e) {
      console.log('Error on uploading comment');
      Alert.alert('Error', 'Uploading comment failed');
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.commentFormContainer}>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This is required'},
            minLength: {
              value: 3,
              message: 'Comment must be at least 3 characters',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              inputContainerStyle={styles.commentInputContainer}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Leave a comment"
            />
          )}
          name="comment"
        />

        {errors.comment && <Text>Please enter valid comment.</Text>}
        <Icon name="send" size={30} onPress={handleSubmit(postUserComment)} />
      </View>
    </KeyboardAvoidingView>
  );
};

CommentForm.propTypes = {
  fileId: PropTypes.number.isRequired,
};
export default CommentForm;
const styles = StyleSheet.create({
  commentFormContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyItems: 'center',
    width: 300,
    marginTop: 3,
    marginLeft: 6,
  },
  commentInputContainer: {
    padding: 8,
    marginTop: 10,
    marginBottom: -5,
    height: 18,
    width: 250,
  },
});
