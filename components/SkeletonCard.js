import React from 'react';
import {StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS} from '../theme';

const SkeletonCard = ({children}) => {
  return (
    <LinearGradient
      colors={['skyblue', 'white', COLORS.primary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.card}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'hidden',
  },
});

export default SkeletonCard;
