import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <img id='user-profile-icon' onClick={openMenu} src={user.profilePicture}/>
      {showMenu && (
        <ul id="icon-dropdown">
          <li onClick={() => history.push(`/user/${user.id}`)}>{user.username}</li>
          <li onClick={logout}>Log out</li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
