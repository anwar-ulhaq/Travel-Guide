import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';

import {
  appId,
  baseUrl,
  doFetch,
  HTTP_METHOD,
  mediaPath, tagPath,
  userPath,
} from '../utils';

export const useMedia = (myFilesOnly) => {
  const {isNotification, setIsNotification, setNotification} =
    useContext(MainContext);
  const [mediaArray, setMediaArray] = useState([]);

  const {update, user} = useContext(MainContext);

  const loadMedia = async () => {
    try {
      let json = await doFetch(baseUrl + tagPath + appId);

      if (myFilesOnly) {
        json = json.filter((file) => file.user_id === user.user_id);
      }

      json.reverse();
      const media = await Promise.all(
        json.map(async (file) => {
          const fileResponse = await fetch(baseUrl + mediaPath + file.file_id);
          return await fileResponse.json();
        })
      );
      setMediaArray(media);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Load media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Load media: ', error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, [update]);

  const getMediaById = async (fileId) => {
    try {
      await doFetch(baseUrl + mediaPath + fileId);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Load media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Load media by Id: ', error);
    }
  };
  const postMedia = async (fileData, token) => {
    const options = {
      method: HTTP_METHOD.POST,
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: fileData,
    };
    try {
      return await doFetch(baseUrl + mediaPath, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Post media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Post media : ', error);
    }
  };

  const deleteMedia = async (id, token) => {
    try {
      return await doFetch(baseUrl + mediaPath + id, {
        headers: {'x-access-token': token},
        method: HTTP_METHOD.DELETE,
      });
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Delete media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Delete media:  ' + error.message);
    }
  };

  const putMedia = async (id, data, token) => {
    const options = {
      method: HTTP_METHOD.PUT,
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + mediaPath + id, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Update media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Update media:  ' + error.message);
    }
  };
  const getAllFilesOfUserByAppId = async (userId, token) => {
    try {
      const allAppMedia = await doFetch(baseUrl + tagPath + appId);
      return allAppMedia.filter((item) => item.user_id === userId);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'User media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Error in getting files of a user: ' + error.message);
    }
  };
  const getAllFilesOfUser = async (userId, token) => {
    const options = {
      method: HTTP_METHOD.GET,
      headers: {
        'x-access-token': token,
      },
    };

    try {
      return await doFetch(baseUrl + mediaPath + userPath + userId, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'User all media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Error in getting files of a user: ' + error.message);
    }
  };

  const searchMedia = async (data, token) => {
    try {
      const allAppMedia = await doFetch(baseUrl + tagPath + appId);
      return allAppMedia.filter(
        (media) =>
          media.title?.toLowerCase().includes(data.title?.toLowerCase()) ||
          media.description
            ?.toLowerCase()
            .includes(data.description?.toLowerCase())
      );
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Search media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Searching media: ' + error.message);
    }
  };

  const updateMedia = async (fileId, newData, token) => {
    const options = {
      method: HTTP_METHOD.PUT,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(newData),
    };
    try {
      return await doFetch(baseUrl + mediaPath + fileId, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Update media error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Update media ' + error.message);
    }
  };

  return {
    mediaArray,
    postMedia,
    deleteMedia,
    putMedia,
    getAllFilesOfUser,
    getAllFilesOfUserByAppId,
    searchMedia,
    updateMedia,
    getMediaById,
  };
};
