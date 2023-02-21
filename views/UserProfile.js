import React, {useContext} from 'react';
import {ModifyProfile} from '../components';
import {MainContext} from '../contexts/MainContext';
import ViewProfile from '../components/ViewProfile';

const UserProfile = () => {
  const {isEditProfile} = useContext(MainContext);
  return isEditProfile ? <ModifyProfile /> : <ViewProfile />;
}
export default UserProfile;
