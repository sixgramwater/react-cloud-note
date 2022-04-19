import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Nav from "../sidebar-nav";
import { FiPlus } from "react-icons/fi";
// import { Modal } from "antd";
import { NotebookOne, SeoFolder } from "@icon-park/react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillFileMarkdown } from "react-icons/ai";
// import { Modal } from "antd";
import cx from 'classnames';
import { useClickOutside } from "../../hooks";

const CreateDropdown = ({show}: {show?: Boolean, onClickOutside?: Function}) => {
  // const { showDropdown } = props;
  const createDownClass = cx(styles.createDropdown, {
    [styles.show]: show
  })
  
  // useClickOutside(ref, () => {
  //   onClickOutside && onClickOutside();
  // })
  return (
    <div className={createDownClass}>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <i className={styles.icon}>
            <NotebookOne theme="filled" size="22" fill="#5b89fe" />
          </i>
          <span>空白文档</span>
        </div>
        <div className={styles.menuItem}>
          <i className={styles.icon}>
            <AiFillFileMarkdown color="#38b5fd" size={22} />
          </i>
          <span>Markdown</span>
        </div>
        <div className={styles.menuItem}>
          <i className={styles.icon}>
            <SeoFolder theme="filled" size="22" fill="#ffb55e" />
          </i>
          {/* #ffb55e */}
          <span>新建文件夹</span>
        </div>
      </div>
      {/* <div className=""></div> */}
    </div>
  );
};

const Sidebar = () => {
  const handleClickAvatar = () => {
    setShowModal(true);
    console.log(showModal);
  };
  const [showModal, setShowModal] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const location = useLocation();
  const btnRef = useRef<HTMLDivElement>(null)
  const avatarImg =
    "http://124.220.0.95:9999/document/2022/04/18/ad6ac38e61485a0679f1b36edd0b254c.png";
  const handleClickCreate = () => {
    const entryId = location.pathname.split("/")[1];
    setShowCreateMenu(true)

    // console.log(entryId);
  };
  
  useClickOutside(btnRef, () => {
    setShowCreateMenu(false);
  })
  const handleCloseDropdown = () => {
    // console.log('click outside')
    // setShowCreateMenu(false);
  }
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
            <div className={styles.btn} ref={btnRef}>
             
              <div className={styles.button} onClick={handleClickCreate}>
                <FiPlus />
                <span>新建</span>
              </div>
              <CreateDropdown show={showCreateMenu}/>
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
