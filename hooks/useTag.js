import {baseUrl, doFetch, filePath, HTTP_METHOD, tagPath} from '../utils';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

export const useTag = () => {
  const {isNotification, setIsNotification, setNotification} = useContext(MainContext);

  const getFilesByTag = async (tag) => {
    try {
      return await doFetch(baseUrl + tagPath + tag);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Fetching files tag error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get Files by tags' + error.message);
    }
  };
  const getTagsOfFile = async (id) => {
    try {
      return await doFetch(baseUrl + tagPath + filePath + id);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Fetching file tags error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get File tags' + error.message);
    }
  };
  const postTag = async (data, token) => {
    const options = {
      method: HTTP_METHOD.POST,
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + tagPath, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Posting Tag error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Post tag' + error.message);
    }
  };
  return {getFilesByTag, postTag, getTagsOfFile};
};
