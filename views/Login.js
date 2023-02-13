import {Text, View} from 'react-native';
import React from 'react';
// Example usage
import {useComment, useUser} from '../hooks';
// Example component Import
import {CommentForm, CommentItem, List, ListItem} from '../components';

const Login = () => {
  // Example usage
  // eslint-disable-next-line no-unused-vars
  const {getCommentById} = useComment();
  // eslint-disable-next-line no-unused-vars
  const {postUser} = useUser();

  return (
    <View>
      {/* Example: Component usage*/}
      <CommentItem></CommentItem>
      <CommentForm></CommentForm>
      <List></List>
      <ListItem></ListItem>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
