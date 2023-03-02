import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Button} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {Svg, Path} from 'react-native-svg';

const FirstPage = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.header}>TRAVEL GUIDE</Text>
      <View style={styles.buttonsContainer}>
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
      <Svg
        style={{
          bottom: 0,
        }}
      >
        <Path
          fill="#5790DF"
          d="M0,96L30,117.3C60,139,120,181,180,181.3C240,181,300,139,360,144C420,149,480,203,540,192C600,181,660,107,720,80C780,53,840,75,900,112C960,149,1020,203,1080,202.7C1140,203,1200,149,1260,144C1320,139,1380,181,1410,202.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 100,
    marginBottom: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    marginTop: 100,
    marginLeft: 110,
    fontSize: 25,
    fontFamily: 'sans-serif',
  },
});

export default FirstPage;
