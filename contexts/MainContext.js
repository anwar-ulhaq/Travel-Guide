import React, {useState} from 'react';
import PropTypes from 'prop-types';

const MainContext = React.createContext({});

const MainProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // TODO empty user state when login functionality is added.
  const [user, setUser] = useState({
    user_id: 2693,
    username: 'anwar.ulhaq',
    email: 'anwar.ulhaq@metropolia.fi',
    full_name: 'Anwar Ulhaq',
  });
  const [update, setUpdate] = useState(true);
  const [commentUpdate, setCommentUpdate] = useState(0);
  const [isEditProfile, setIsEditProfile] = useState(false);


  return (
    <MainContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        update,
        setUpdate,
        commentUpdate,
        setCommentUpdate,
        isEditProfile,
        setIsEditProfile,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export {MainContext, MainProvider};
