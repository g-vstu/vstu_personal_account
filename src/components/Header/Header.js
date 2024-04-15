import React from 'react';
import {useSelector} from "react-redux";

import {HeaderTitle} from "./HeaderTitle";
import {Search} from "../Search";

import {shortenName} from "../../assets/utils/functions";

import eyeIcon from './../../assets/images/headerIcons/Eye.svg';
import bellIcon from './../../assets/images/headerIcons/Bell.svg';
import avatarIcon from './../../assets/images/headerIcons/img-human.svg';
import './style.css';
import {MenuButton} from "../MenuButton";

export const Header = ({userRole}) => {
  const userName = useSelector((state) => state.auth.userInfo.fio)

  return (
    <header className="header">
      <HeaderTitle
        blockName="header-block-title"
        logoImg="header-logo"
        titleText="header-text"
      />
      <Search
        blockClass="header-search-block"
        inputClass="header-search_input"
        iconClass="header-search_icon"
      />
      <div className="header-block">
        <img className="header-icon" src={eyeIcon} alt="icon"/>
        <img className="header-icon" src={bellIcon} alt="icon"/>
        <div className="header-block_userInfo">
          <img className="header-user_img" src={avatarIcon} alt="Avatar icon"/>
          <div className="header-user_info">
            <p>{shortenName(userName)}</p>
            <p className="header-email">abazovskaya@mail.ru</p>
          </div>
        </div>
        <MenuButton userRole={userRole}/>
      </div>
    </header>
  );
};
