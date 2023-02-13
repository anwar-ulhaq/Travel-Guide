// import {doFetch} from '../utils/apiUtils/doFetch';
// import {baseUrl} from '../utils/variables';

import {baseUrl, commentsPath, doFetch, filePath, HTTP_METHOD} from '../utils';

export const useComment = () => {
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
      throw new Error('Post Comment: ' + error.message);
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
      throw new Error('Get Comment By id: ' + error.message);
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
      throw new Error('Error in deleting comments: ' + error.message);
    }
  };

  return {postComment, getCommentById, deleteComment};
};
