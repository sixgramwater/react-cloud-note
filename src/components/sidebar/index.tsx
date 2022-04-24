import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Nav from "../sidebar-nav";
import { FiPlus } from "react-icons/fi";
// import { Modal } from "antd";
import { NotebookOne, SeoFolder, User, Logout } from "@icon-park/react";
import { useLocation, useParams } from "react-router-dom";
import { AiFillFileMarkdown } from "react-icons/ai";
// import { Modal } from "antd";
import cx from "classnames";
import { useAppDispatch, useAppSelector, useClickOutside } from "../../hooks";
import { createEntryItem } from "../../api";
import { v4 as uuidv4 } from "uuid";
// import { randomUUID } from "crypto";
import { message, Modal } from "antd";
// import Modal from "../modal";

const CreateDropdown = ({
  show,
  onSelect,
}: {
  show?: Boolean;
  onSelect?: (type: number) => void;
}) => {
  // const { showDropdown } = props;
  const createDownClass = cx(styles.createDropdown, {
    [styles.show]: show,
  });

  // useClickOutside(ref, () => {
  //   onClickOutside && onClickOutside();
  // })
  const handleClick = (type: number) => {
    onSelect && onSelect(type);
  };
  return (
    <div className={createDownClass}>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={() => handleClick(1)}>
          <i className={styles.icon}>
            <NotebookOne theme="filled" size="22" fill="#5b89fe" />
          </i>
          <span>空白文档</span>
        </div>
        <div className={styles.menuItem} onClick={() => handleClick(2)}>
          <i className={styles.icon}>
            <AiFillFileMarkdown color="#38b5fd" size={22} />
          </i>
          <span>Markdown</span>
        </div>
        <div className={styles.menuItem} onClick={() => handleClick(0)}>
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

const PersonalDropdown = ({
  show,
  onClick,
}: {
  show: boolean;
  onClick: (type: number) => void;
}) => {
  const dropdownClass = cx(styles.createDropdown, styles.personal, {
    [styles.show]: show,
  });
  const handleClick = (type: number) => {
    onClick && onClick(type);
  };
  return (
    <div className={dropdownClass}>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={() => handleClick(1)}>
          <i className={styles.icon}>
            <User theme="outline" size="16" fill="#4e5a70"/>
            {/* <NotebookOne theme="filled" size="22" fill="#5b89fe" /> */}
          </i>
          <span>个人中心</span>
        </div>
        <div className={styles.menuItem} onClick={() => handleClick(2)}>
          <i className={styles.icon}>
          <Logout theme="outline" size="16" fill="#4e5a70"/>
            {/* <AiFillFileMarkdown color="#38b5fd" size={22} /> */}
          </i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const btnRef = useRef<HTMLDivElement>(null);
  const curEntryItem = useAppSelector((state) => state.app.curEntryItem);
  // const curEntryList = useAppSelector(state=>state.app.curEntryList)
  const avatarImg =
    "http://124.220.0.95:9999/document/2022/04/18/ad6ac38e61485a0679f1b36edd0b254c.png";
  const handleClickCreate = () => {
    const entryId = location.pathname.split("/")[1];
    setShowCreateMenu(true);

    // console.log(entryId);
  };
  const handleClickAvatar = () => {
    setTimeout(() => {
      setShowModal(true);
    });
    console.log(showModal);
  };
  useClickOutside(btnRef, () => {
    setShowCreateMenu(false);
    setShowModal(false);
  });

  const handleCreateFolder = () => {
    if (!curEntryItem) return;
    const parentId = curEntryItem.fileId;
    const fileId = uuidv4();
    const entryItem = {
      parentId: parentId as string,
      name: "新建文件夹",
      type: 0,
      dir: true,
      fileId,
    };
    console.log(entryItem);
    createEntryItem(entryItem)
      .then((value) => {
        message.success("创建成功");
        dispatch({
          type: "app/addCurEntryList",
          payload: value,
        });
      })
      .catch((err) => {
        message.error("创建失败");
      });
  };
  const handleCreateMarkdown = () => {
    if (!curEntryItem) return;
    const parentId = curEntryItem.fileId;
    const fileId = uuidv4();
    const entryItem = {
      parentId: parentId as string,
      name: "新建Markdown.md",
      type: 2,
      dir: false,
      fileId,
    };
    createEntryItem(entryItem)
      .then((value) => {
        message.success("创建成功");
        dispatch({
          type: "app/addCurEntryList",
          payload: value,
        });
      })
      .catch((err) => {
        message.error("创建失败");
      });
  };

  const handleSelect = (type: number) => {
    console.log(type);
    if (type === 0) {
      handleCreateFolder();
    } else if (type === 2) {
      handleCreateMarkdown();
    }
  };

  const handleClickPersonal = (type: number) => {
    // console.log(type);
    setShowModal(false);
    if(type === 1) {

    } else if(type === 2) {
      dispatch({
        type:'app/removeToken',
        payload: '',
      })
    }
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.siderHeader}>
          <div className={styles.personalContainer}>
            <div className={styles.avatarConatiner}>
              <div className={styles.avatar} onClick={handleClickAvatar}>
                <img src={avatarImg} alt="avatar" />
              </div>
              <PersonalDropdown
                show={showModal}
                onClick={handleClickPersonal}
              />
              
              {/* <Modal></Modal> */}
              {/* <div className=""></div> */}
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
              <CreateDropdown show={showCreateMenu} onSelect={handleSelect} />
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
