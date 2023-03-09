import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import ListItem from './ListItem';
import {useMedia} from '../hooks';
import FeedHeader from './FeedHeader';
import {COLORS} from '../theme';
import PropTypes from 'prop-types';
import {Icon} from '@rneui/themed';
import {useRef, useState} from 'react';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  const [fabVisible, setFabVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const fabTranslateY = useRef(new Animated.Value(0)).current;

  const handleFabPress = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const halfway = event.nativeEvent.contentSize.height / 3;
    const visible = offsetY > halfway;
    setFabVisible(visible);
    Animated.timing(fabTranslateY, {
      toValue: visible ? 0 : 60,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            ref={scrollViewRef}
            data={mediaArray}
            keyExtractor={(item) => item.file_id}
            renderItem={({item}) => (
              <ListItem
                navigation={navigation}
                singleMedia={item}
                myFilesOnly={myFilesOnly}
              />
            )}
            showsVerticalScrollIndicator={false}
            // TODO restructure FEEDHEADER
            // FeedHeader should not be and Arrow Function component
            ListHeaderComponent={<FeedHeader />}
            onScroll={handleScroll}
          />
          {fabVisible && (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 30,
                right: 20,
                transform: [{translateY: fabTranslateY}],
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={handleFabPress}
              >
                <Icon
                  name="md-arrow-up"
                  type="ionicon"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.upperCard} />
          <View style={styles.lowerCard} />
        </View>
      </View>
    </SafeAreaView>
  );
};
List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
  loading: PropTypes.bool,
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    zIndex: 0,
  },

  //  whole card container
  cardContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  // lowercard background
  lowerCard: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // uppercard for background
  upperCard: {
    height: 300,
    backgroundColor: COLORS.primary,
  },
});
