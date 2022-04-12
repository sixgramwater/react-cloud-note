import React from 'react';
import styles from './index.module.scss';
import Nav from '../sidebar-nav';
import { FiPlus } from 'react-icons/fi';

const Sidebar = () => {
  const avatarImg = "https://note.youdao.com/web/images/dummy_user.jpg"
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.siderHeader}>
          <div className={styles.personalContainer}>
            <div className={styles.avatarConatiner}>
              <div className={styles.avatar}>
                <img src={avatarImg} alt="avatar" />
              </div>
            </div>
            <div className={styles.nameContainer}>
              <span className={styles.name}>sixgramwater</span>
            </div>
          </div>
        </div>
        <div className={styles.siderLayout}>
          <div className={styles.operator}>
            <div className={styles.btn} >
              <div className={styles.button}>
                <FiPlus/>
                <span>新建</span>
              </div>
            </div>
          </div>
          <div className={styles.nav}>
            <Nav/>
          </div>
          <div className={styles.footer}></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;