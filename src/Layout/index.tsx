import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import styles from './index.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftSidebar}>
        <Sidebar/>
      </div>
      <Outlet/>
    </div>
  )
}

export default Layout;