import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Chip, Icon, Input} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks';
import ListItem from '../components/ListItem';
import {SIZES} from '../theme';

const Search = ({navigation}) => {
  const {searchMedia} = useMedia();
  const [titleSelect, setTitleSelect] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [descriptionSelect, setDescriptionSelect] = useState(false);

  const search = async () => {
    if (titleSelect || descriptionSelect) {
      setSearchResult([]);
      const data = {};
      titleSelect ? (data.title = searchString) : undefined;
      descriptionSelect ? (data.description = searchString) : undefined;

      try {
        AsyncStorage.getItem('userToken').then(async (userToken) => {
          if (userToken !== undefined) {
            searchMedia(data, userToken).then((result) => {
              setSearchResult(result);
            });
          }
        });
      } catch (error) {
        console.log('Error while searching media', error);
      }
    }
  };
  console.log('search result', searchResult);

  return (
    <View>
      <View style={styles.searchContainer}>
        <Input
          value={searchString}
          placeholder="Search"
          autoCapitalize={'none'}
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputFieldInputStyle}
          errorStyle={styles.inputFieldErrorStyle}
          inputContainerStyle={styles.inputContainerStyle}
          onChangeText={(text) => setSearchString(text)}
          rightIcon={
            <Icon
              name="search"
              size={SIZES.extraLarge}
              color="black"
              onPress={() => search()}
            />
          }
          errorMessage={
            !titleSelect &&
            !descriptionSelect &&
            'Select atleast one from below.'
          }
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingBottom: SIZES.base,
        }}
      >
        <Chip
          title="Search in Title"
          icon={
            titleSelect
              ? {
                  name: 'check',
                  type: 'antdesign',
                  size: SIZES.medium,
                }
              : {
                  name: 'close',
                  type: 'antdesign',
                  size: SIZES.medium,
                }
          }
          onPress={() => setTitleSelect(!titleSelect)}
          iconRight
          type={'outline'}
        />
        <Chip
          title="Search in Description"
          icon={
            descriptionSelect
              ? {
                  name: 'check',
                  type: 'antdesign',
                  size: SIZES.medium,
                }
              : {
                  name: 'close',
                  type: 'antdesign',
                  size: SIZES.medium,
                }
          }
          onPress={() => setDescriptionSelect(!descriptionSelect)}
          iconRight
          type="outline"
        />
      </View>
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={searchResult}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ListItem
                navigation={navigation}
                singleMedia={item}
                myFilesOnly={false}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.upperCard} />
          <View style={styles.lowerCard} />
        </View>
      </View>
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: SIZES.medium,
    borderRadius: SIZES.xxl,
    borderColor: 'gray',
    borderWidth: 1,
    height: 48,
    marginTop: SIZES.font,
  },
  searchContainer: {
    padding: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.small,
  },
  inputFieldErrorStyle: {
    color: 'red',
    textAlign: 'center',
  },
  inputFieldInputStyle: {
    fontSize: SIZES.medium,
    paddingLeft: SIZES.base,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
});

Search.propTypes = {
  navigation: PropTypes.object,
};
