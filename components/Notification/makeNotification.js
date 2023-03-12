import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, Text, Animated, View} from 'react-native';
import {Icon} from '@rneui/themed';

const ICON_SQUARE_SIZE = 100;
const ANIMATION_DURATION_MS = 150;
const NOTIFICATION_HEIGHT = 100;

export const makeNotification = (
  iconLibrary,
  iconName,
  colorPrimary,
  colorAccent
) => {
  function NotificationBase(props) {
    const {
      title,
      message,
      onClosePress,
      isOkButton,
      isCancelButton,
      onOkClick,
      onCancelClick,
    } = props;
    const [animated] = React.useState(new Animated.Value(0));

    React.useEffect(() => {
      Animated.timing(animated, {
        toValue: 1,
        duration: ANIMATION_DURATION_MS,
        useNativeDriver: false,
      }).start();
    }, []);

    return (
      <TouchableOpacity
        onPress={() => {
          if (onClosePress) {
            Animated.timing(animated, {
              toValue: 0,
              duration: ANIMATION_DURATION_MS,
              useNativeDriver: false,
            }).start(onClosePress);
          }
        }}
      >
        <Animated.View
          style={[
            {
              opacity: animated,
              height: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, NOTIFICATION_HEIGHT],
                extrapolate: 'clamp',
              }),
              transform: [
                {
                  translateX: animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
            styles.mainContainer,
            {backgroundColor: colorPrimary},
          ]}
        >
          <Icon
            name={iconName}
            type={iconLibrary}
            size={ICON_SQUARE_SIZE}
            color={colorAccent}
            containerStyle={styles.icon}
          />
          <Text style={[styles.title, {color: colorAccent}]}>{title}</Text>
          <Text style={[styles.message, {color: colorAccent}]}>{message}</Text>
          <View style={styles.buttonContainer}>
            {isOkButton && (
              <Icon
                name="checkcircleo"
                type="antdesign"
                size={36}
                onPress={() => onOkClick()}
                color={colorAccent}
                containerStyle={styles.buttonIconStyle}
              />
            )}
            {isCancelButton && (
              <Icon
                name="closecircleo"
                type="antdesign"
                size={36}
                color={colorAccent}
                onPress={() => {
                  console.log('isCanceled pressed')
                  onCancelClick();
                }}
                containerStyle={styles.buttonIconStyle}
              />
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  NotificationBase.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    isOkButton: PropTypes.bool,
    isCancelButton: PropTypes.bool,
    onClosePress: PropTypes.func,
    onOkClick: PropTypes.func,
    onCancelClick: PropTypes.func,
  };

  return NotificationBase;
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 270,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    elevation: 10,
  },
  icon: {
    position: 'absolute',
    right: -ICON_SQUARE_SIZE / 5,
    bottom: -ICON_SQUARE_SIZE / 5,
    opacity: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '40%',
  },
  buttonIconStyle: {
    paddingRight: 8,
    margin: 0,
    padding: 0,
    elevation: 16,
    zIndex: -2,
  },
});
