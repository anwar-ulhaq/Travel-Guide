import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Text} from '@rneui/themed';
import {MainContext} from '../contexts/MainContext';
import {Overlay} from 'react-native-elements';
import {NotificationWrapper} from './Notification/NotificationWrapper';
import {COLORS} from '../theme';

const Notification = () => {
  const {isNotification, setIsNotification, notification} =
    useContext(MainContext);
  return (

     <Overlay
      isVisible={isNotification}
      onBackdropPress={() => setIsNotification(!isNotification)}
      overlayStyle={{
        padding: 0,
        borderRadius: 8,
      }}
    >
         <NotificationWrapper
           type={notification.type}
           title={notification.title}
           message={notification.message}
           onClosePress={() => {
             setIsNotification(!isNotification);
           }}
         />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  title: {
    fontSize: 20,
    color: '#afafaf',
  },
  description: {
    fontSize: 17,
    color: '#afafaf',
    textAlign: 'center',
  },
});

export default Notification;
