import React, { useState } from "react";
import styles from "./index.module.scss";
import Nav from "../sidebar-nav";
import { FiPlus } from "react-icons/fi";
import { Modal } from "antd";
// import { Modal } from "antd";

const Sidebar = () => {
  const handleClickAvatar = () => {
    setShowModal(true);
    console.log(showModal);
  };
  const [showModal, setShowModal] = useState(false);
  const avatarImg = "http://124.220.0.95:9999/document/2022/04/18/ad6ac38e61485a0679f1b36edd0b254c.png";
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.siderHeader}>
          <div className={styles.personalContainer}>
            <div className={styles.avatarConatiner}>
              <div className={styles.avatar} onClick={handleClickAvatar}>
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
            <div className={styles.btn}>
              <div className={styles.button}>
                <FiPlus />
                <span>新建</span>
              </div>
            </div>
          </div>
          <div className={styles.nav}>
            <Nav />
          </div>
          <div className={styles.footer}></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
