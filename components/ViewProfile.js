import React, {useEffect, useState} from 'react';
import {Avatar, Button, Icon} from '@rneui/themed';
import MasonryList from '@react-native-seoul/masonry-list';
import {Platform, SafeAreaView, StatusBar, Text, View} from 'react-native';

import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks';
import {PopupMenu, ProfileMediaCard} from './';


const ViewProfile = () => {

  const data1 = [
    {
      id: 'id123',
      imgURL:
        'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
      text: 'Pioneer LHS Chaise Lounger in Grey Colour',
    },
    {
      id: 'id124',
      imgURL:
        'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
      text: 'Precedant Furniture',
    },
    {
      id: 'id125',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
      text: 'Leverette Upholstered Platform Bed',
    },
    {
      id: 'id126',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
      text: 'Briget Accent Table',
    },
    {
      id: 'id127',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Rivet Emerly Media Console',
    },
    {
      id: 'id128',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Drew Barrymore Flower Home Accent Chair',
    },
    {
      id: 'id129',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Ecobirdy Charlie Chair',
    },
    {
      id: 'id130',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
      text: 'Hailey Sofa',
    },
    {
      id: 'id131',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
      text: 'Farmhouse Dining Table',
    },
    {
      id: 'id132',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Evelyn Coffee Table',
    },
    {
      id: 'id133',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Slope Nomad Leather Sofa',
    },
    {
      id: 'id134',
      imgURL:
        'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
      text: 'Chair and Table',
    },
    {
      id: 'id223',
      imgURL:
        'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
      text: 'Pioneer LHS Chaise Lounger in Grey Colour',
    },
    {
      id: 'id224',
      imgURL:
        'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
      text: 'Precedant Furniture',
    },
    {
      id: 'id225',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
      text: 'Leverette Upholstered Platform Bed',
    },
    {
      id: 'id226',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
      text: 'Briget Accent Table',
    },
    {
      id: 'id227',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Rivet Emerly Media Console',
    },
    {
      id: 'id228',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Drew Barrymore Flower Home Accent Chair',
    },
    {
      id: 'id229',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Ecobirdy Charlie Chair',
    },
    {
      id: 'id230',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
      text: 'Hailey Sofa',
    },
    {
      id: 'id231',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
      text: 'Farmhouse Dining Table',
    },
    {
      id: 'id232',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Evelyn Coffee Table',
    },
    {
      id: 'id233',
      imgURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
      text: 'Slope Nomad Leather Sofa',
    },
    {
      id: 'id234',
      imgURL:
        'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
      text: 'Chair and Table',
    },
  ];

  const data = [
    {
      'key': '0',
      'title': 'Title 1',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
      'thumbnails': {
        w160: 'http://placekitten.com/160/161',
      },
      'filename': 'http://placekitten.com/2048/1920',
    },
    {
      'key': '1',
      'title': 'Title 2',
      'description': 'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
      'thumbnails': {
        w160: 'http://placekitten.com/160/164',
      },
      'filename': 'http://placekitten.com/2041/1922',
    },
    {
      'key': '2',
      'title': 'Title 3',
      'description': 'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
      'thumbnails': {
        w160: 'http://placekitten.com/160/167',
      },
      'filename': 'http://placekitten.com/2039/1920',
    },
  ];
  const [index, setIndex] = useState('none');
  const [eventName, setEventName] = useState('none');
  const [selectedOption, setSelectedOption] = useState('none');
  const {getUserAvatar} = useUser();
  const [tag, setTag] = useState({});
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const options = ['Edit', 'Logout'];

  const {user, setIsLoggedIn, isEditProfile, setIsEditProfile} =
    React.useContext(MainContext);

  const loadAvatar = async () => {
    const tag = await getUserAvatar('avatar_' + user.user_id).then(
      (tagArray) => tagArray[0]
    );
    setTag(tag);
    setAvatar('https://media.mw.metropolia.fi/wbma/uploads/' + tag.filename);
  };


  const onPopupEvent = (eventName, index) => {
    if (index >= 0) setSelectedOption(options[index]);
    setIndex(index);
    setEventName(eventName);
    // console.log('Event Name: ' + eventName);
    console.log('Index: ' + index);
    // console.log('Selected Option: ' + selectedOption);
    if (index === 0) setIsEditProfile(!isEditProfile);
    else if (index === 1) logout();
    /*index === 1
      ? console.log('Edit Profile')
      : setIsEditProfile(!isEditProfile);
    index === 2 ? console.log('Logout') : logout();*/
  };

  const renderItem = ({item, i}) => {
    return (
      <ProfileMediaCard
        item={item}
        style={{marginLeft: i % 2 === 0 ? 0 : 12}}
      />
    );
  };

  const logout = async () => {
    console.log('User logout');
    /*    setIsLoggedIn(false);

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('Error while logging out: ' + error);
    }*/
  };

  useEffect(() => {
    loadAvatar();
  }, [user.user_id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          paddingTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Icon
          size={16}
          raised
          name="arrow-left"
          type="font-awesome-5"
          onPress={() => {}}
        />
        <View>
          <Avatar
            rounded
            source={{
              uri: 'https://randomuser.me/api/portraits/women/40.jpg',
            }}
            size="large"
          />
          <View
            style={{
              top: 45,
              left: 45,
              position: 'absolute',
              boarderRadius: 16,
            }}
          >
            <Icon
              size={16}
              raised
              reverse
              name="plus"
              type="font-awesome-5"
              color={'rgba(78, 116, 289, 1)'}
              onPress={() => {}}
              containerStyle={{padding: 0, margin: 0}}
            />
          </View>
        </View>
        <View>
          <PopupMenu options={options} onPress={onPopupEvent}>
            <Icon size={16} raised name="ellipsis-v" type="font-awesome-5" />
          </PopupMenu>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>101K</Text>
          <Text>Following</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold', marginBottom: 8}}>200M</Text>
          <Text>Followers </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{fontWeight: 'bold'}}>@Catherine007</Text>
      </View>
      <View
        style={{
          marginTop: 8,
          marginBottom: 8,
          marginLeft: '10%',
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          // /!* backgroundColor: 'rgba(78, 116, 289, 1)',*!/
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          My name is Catherine. I like dancing in the rain and travelling all
          around the world.
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          title="Follow"
          buttonStyle={{
            height: 48,
            width: 120,
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 36,
          }}
          titleStyle={{
            fontSize: 13,
            color: 'white',
          }}
          containerStyle={{elevation: 20}}
          onPress={() => {
            // navigation.navigate('Single', singleMedia);
          }}
        />
        <Button
          title="Messages"
          size={'lg'}
          buttonStyle={{
            height: 48,
            width: 120,
            backgroundColor: 'white',
            borderRadius: 36,
            paddingVertical: 5,
          }}
          titleStyle={{
            fontSize: 13,
            color: 'black',
          }}
          containerStyle={{elevation: 20}}
          onPress={() => {
            // navigation.navigate('Single', singleMedia);
          }}
        />
      </View>
      <MasonryList
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 18,
          alignSelf: 'stretch',
        }}
        /* style={{
          borderWidth: 8,
          borderColor: 'white',
          borderRadius: 8,
        }}*/
        containerStyle={{
          // borderWidth: 8,
          marginTop: 16,
          // borderColor: 'white',
        }}
        onEndReached={() => console.log('onEndReached')}
        numColumns={2}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default ViewProfile;
