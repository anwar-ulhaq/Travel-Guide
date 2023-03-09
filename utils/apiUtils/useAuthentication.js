import {doFetch} from './doFetch';
import {baseUrl} from '../constants';
import {useContext} from 'react';
import {MainContext} from '../../contexts/MainContext';

export const useAuthentication = () => {
  const {isNotification, setIsNotification, setNotification} =
    useContext(MainContext);
  const postLogin = async (userCredentials) => {
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    };
    try {
      return await doFetch(baseUrl + 'login', options);
    } catch (error) {
      // alert('Username/Password Incorrect');
      // throw new Error('postLogin: ' + error.message);
      setNotification({
        type: 'error',
        title: 'Login error',
        message: error.message,
      });
      setIsNotification(!isNotification);
    }
  };
  return {postLogin};
};
