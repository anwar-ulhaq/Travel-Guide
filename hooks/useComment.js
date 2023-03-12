// import {doFetch} from '../utils/apiUtils/doFetch';
// import {baseUrl} from '../utils/variables';

import {baseUrl, commentsPath, doFetch, filePath, HTTP_METHOD} from '../utils/';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

export const useComment = () => {
  const {isNotification, setIsNotification, setNotification} = useContext(MainContext);
  const postComment = async (token, commentId) => {
    const options = {
      method: HTTP_METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(commentId),
    };
    try {
      return await doFetch(baseUrl + commentsPath, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Post Comment error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Post Comment: ' + error.message);
    }
  };

  const getCommentById = async (fileId) => {
    try {
      // const comment = await doFetch(`${baseUrl}comments/file/${fileId}`);
      const comment = await doFetch(
        `${baseUrl + commentsPath + filePath + fileId}`
      );
      comment.reverse();
      return comment;
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Fetch comment error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get Comment By id: ' + error.message);
    }
  };
  const deleteComment = async (token, fileId) => {
    const options = {
      method: HTTP_METHOD.DELETE,
      headers: {
        'x-access-token': token,
      },
    };

    try {
      return await doFetch(baseUrl + commentsPath + fileId, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Delete comment error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Error in deleting comments: ' + error.message);
    }
  };

  return {postComment, getCommentById, deleteComment};
};
