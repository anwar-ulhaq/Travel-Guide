import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const FirstPage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.buttonsContainer}>
      <Text style={styles.header}>TRAVEL GUIDE</Text>
      <Button
        title="REGISTER"
        buttonStyle={{
          backgroundColor: '#5790DF',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{fontWeight: 'bold'}}
        onPress={() => {
          navigation.navigate('Register');
        }}
      />

      <Button
        title="LOGIN"
        buttonStyle={{
          backgroundColor: 'white',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{fontWeight: 'bold', color: 'black'}}
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 40,
    fontSize: 25,
    fontFamily: 'Cochin',
  },
});

export default FirstPage;
