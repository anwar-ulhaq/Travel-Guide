import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import NewPost from '../views/NewPost';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import Search from '../views/Search';
import LikedBy from '../views/LikedBy';
import OtherUserProfile from '../views/OtherUserProfile';
import Chat from '../views/Chat';
import SinglePost from '../views/SinglePost';
import ModifyPost from '../views/ModifyPost';
import {COLORS, SHADOWS} from '../theme';
import UserProfile from '../views/UserProfile';
import {Icon} from '@rneui/themed';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabContainer,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              type="ionicon"
              size={24}
              color={focused ? COLORS.primary : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="search"
              size={32}
              color={focused ? COLORS.primary : 'black'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={NewPost}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <View style={{...styles.uploadDesign, ...styles.left}}></View>
              <View style={{...styles.uploadDesign, ...styles.right}}></View>
              <View style={styles.uploadDesign}>
                <Icon
                  name="add"
                  size={30}
                  color={focused ? COLORS.primary : 'white'}
                />
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="settings"
              type="ionicon"
              size={28}
              color={focused ? COLORS.primary : 'black'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="person"
              type="ionicon"
              size={26}
              color={focused ? COLORS.primary : 'black'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="SinglePost" component={SinglePost} />
          <Stack.Screen name="MyFiles" component={MyFiles} />
          <Stack.Screen name="ModifyPost" component={ModifyPost} />
          <Stack.Screen name="LikedBy" component={LikedBy} />
          <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: '#b0dbff',
    bottom: -2,
    marginHorizontal: 5,
    height: 60,
    paddingVertical: 0,
    borderRadius: 15,
    ...SHADOWS.dark,
  },
  uploadDesign: {
    backgroundColor: '#354455',
    width: 60,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 33,
    zIndex: 1,
  },
  left: {
    position: 'absolute',
    left: 3,
    bottom: -3,
    top: 15,
    height: 32,
    backgroundColor: 'pink',
  },
  right: {
    position: 'absolute',
    right: 3,
    height: 32,
    top: 15,
    backgroundColor: 'blue',
    bottom: -3,
  },
});
