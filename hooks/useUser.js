// import {doFetch} from '../utils/apiUtils/doFetch';
import {
  baseUrl,
  doFetch,
  HTTP_METHOD,
  tagPath,
  usernamePath,
  userPath,
  usersPath,
} from '../utils';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

// import {baseUrl} from '../utils/variables';

export const useUser = () => {
  const {isNotification, setIsNotification, setNotification} =
    useContext(MainContext);
  const getUserByToken = async (token) => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
    const options = {
      method: HTTP_METHOD.GET,
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + usersPath + userPath, options);
    } catch (error) {
      // First make a notification and then change isNotification
      setNotification({
        type: 'error',
        title: 'Token missing or wrong',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get User by token: ' + error.message);
    }
  };
  const postUser = async (userData) => {
    const options = {
      method: HTTP_METHOD.POST,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    try {
      return await doFetch(baseUrl + usersPath, options);
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Post user error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Post user: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(
        baseUrl + usersPath + usernamePath + username
      );
      return result.available;
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Username error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Check user name: ' + error.message);

    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + usersPath + id, {
        headers: {'x-access-token': token},
      });
    } catch (error) {
      // throw new Error('getUserById, ' + error.message);
      setNotification({
        type: 'error',
        title: 'Fetching User error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get user by Id: ' + error.message);
    }
  };

  const getUserAvatar = async (avatarName) => {
    try {
      return await doFetch(baseUrl + tagPath + avatarName);
    } catch (error) {
      // throw new Error(error.message);
      setNotification({
        type: 'error',
        title: 'User avatar error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('Get user avatar: ' + error.message);
    }
  };

  const updateUser = async (newData, token) => {
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
      const response = await doFetch(baseUrl + usersPath, options);
      console.log('user update response: ' + JSON.stringify(response));
      return response;
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'User update error',
        message: error.message,
      });
      setIsNotification(!isNotification);
      console.error('User update: ' + error.message);
    }
  };

  return {
    getUserByToken,
    postUser,
    checkUsername,
    getUserById,
    getUserAvatar,
    updateUser,
  };
};
