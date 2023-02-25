import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon} from '@rneui/themed';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainContext} from '../contexts/MainContext';

const AppHeader = ({title, navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const logout = async () => {
    Alert.alert('Are you sure of ', 'logging out?', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          } catch (error) {
            console.log('Error while logging out: ' + error);
          }
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon
            name="arrow-back-outline"
            type="ionicon"
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={logout}>
          <Icon name="log-out-outline" type="ionicon" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    backgroundColor: '#E6EEFA',
    borderBottomColor: '#ccc',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

AppHeader.propTypes = {
  title: PropTypes.string,
  onPressLogout: PropTypes.func,
  navigation: PropTypes.object,
};
export default AppHeader;
