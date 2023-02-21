import React, {useState} from 'react';
import {
  ActionSheetIOS,
  findNodeHandle,
  Platform,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const PopupMenu = (props) => {
  const {style, children} = props;
  const [view, setView] = useState(View);

  const showActionSheet = () => {
    console.log('showActionSheet');

    const {options, destructiveButtonIndex, onPress} = props;
    const actions = ['Cancel', ...options];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actions,
        cancelButtonIndex: 0,
        destructiveButtonIndex: destructiveButtonIndex + 1 || -1,
      },
      (buttonIndex) => {
        onPress(
          actions[buttonIndex],
          buttonIndex > 0 ? buttonIndex - 1 : undefined
        );
      }
    );
  };

  const showPopupMenu = () => {
    console.log('showPopupMenu');
    const {options, onError, onPress} = props;
    const node = findNodeHandle(view);
    UIManager.showPopupMenu(node, options, onError, onPress);
  };

  const onPress = () => {
    if (Platform.OS === 'ios') {
      showActionSheet();
      return;
    }
    showPopupMenu();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          ref={(node) => {
            setView(node);
          }}
          style={style}
        >
          {/* Child is Icon*/}
          {children}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

PopupMenu.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onError: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default PopupMenu;
