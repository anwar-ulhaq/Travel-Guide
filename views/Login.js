import {ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Button, Card, Text} from '@rneui/base';
import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useUser} from '../hooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleForm, setToggleForm] = useState(true);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken Login', userData);
      userData && setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('checkToken', error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        {toggleForm ? <LoginForm /> : <RegisterForm />}
        <Card>
          <Text>
            {toggleForm
              ? 'No account yet? Please register.'
              : 'Already have an account? Please login.'}
          </Text>
          <Button
            type="outline"
            title={toggleForm ? 'Go to register' : 'Go to login'}
            onPress={() => {
              setToggleForm(!toggleForm);
            }}
          />
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
