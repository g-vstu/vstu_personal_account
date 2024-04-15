import React from 'react';
import {Outlet} from 'react-router-dom';

import {Header} from '../../components/Header';
import {SideBar} from '../../components/Sidebar';

export const MainLayout = ({children , role}) => {
  return (
    <div className="container">
      <SideBar userRole={role}/>
      <div className="content-container">
        <Header userRole={role}/>
        <main className="content">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
