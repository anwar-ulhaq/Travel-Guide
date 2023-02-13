// import {doFetch} from '../utils/apiUtils/doFetch';
import {
  baseUrl,
  doFetch,
  HTTP_METHOD,
  usernamePath,
  userPath,
  usersPath,
} from '../utils';

// import {baseUrl} from '../utils/variables';

export const useUser = () => {
  const getUserByToken = async (token) => {
    // call https://media.mw.metropolia.fi/wbma/docs/#api-User-CheckUserName
    const options = {
      method: HTTP_METHOD.GET,
      headers: {'x-access-token': token},
    };
    try {
      return await doFetch(baseUrl + usersPath + userPath, options);
    } catch (error) {
      throw new Error('checkUser: ' + error.message);
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
      throw new Error('postUser: ' + error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const result = await doFetch(
        baseUrl + usersPath + usernamePath + username,
      );
      return result.available;
    } catch (error) {
      throw new Error('checkUsername: ' + error.message);
    }
  };

  const getUserById = async (id, token) => {
    try {
      return await doFetch(baseUrl + usersPath + id, {
        headers: {'x-access-token': token},
      });
    } catch (error) {
      throw new Error('getUserById, ' + error.message);
    }
  };

  return {getUserByToken, postUser, checkUsername, getUserById};
};
