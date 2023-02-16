import {FlatList} from 'react-native';
import {useMedia} from '../hooks';
import ListItem from './ListItem';
import PropTypes from 'prop-types';

const List = ({navigation, myFilesOnly = false}) => {
  const {mediaArray} = useMedia(myFilesOnly);
  return (
    <FlatList
      style={{padding: 10}}
      data={mediaArray}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={({item}) => {
        return (
          <>
            <ListItem
              navigation={navigation}
              singleMedia={item}
              myFilesOnly={myFilesOnly}
            />
          </>
        );
      }}
    />
  );
};
List.propTypes = {
  navigation: PropTypes.object,
  myFilesOnly: PropTypes.bool,
};

export default List;
