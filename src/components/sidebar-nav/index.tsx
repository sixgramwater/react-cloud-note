import React, { useState } from 'react';
import styles from './index.module.scss';
import { AiOutlineStar, AiOutlineAppstore, AiOutlineFolder, AiOutlineShareAlt, AiOutlineDelete } from 'react-icons/ai';
import DictTree from '../dictTree';
import { useLocation, useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { useAppSelector } from '../../hooks';

const Nav = () => {
  const location = useLocation();
  const path = location.pathname.split('/');
  const activePath = path.length >= 2? path[1] : null;
  const rootEntryId = useAppSelector(state=>state.app.rootEntryId);
  console.log(activePath);
  // const [active, setActive] = useState('');
  const navigate = useNavigate();
  const navItemClass = (path: string) => cx(styles.navItem, {
    [styles.active]: path === activePath
  })
  const navTreeItemClass = (path: string) => cx(styles.navTreeItem, {
    [styles.active]: path === activePath
  })
  const handleNavigate = (path: string) => {
    // setActive(path);
    navigate(`/${path}`);
  }
  const titleRender = (node: any) => {
    const { title, key } = node;
    const mappedKey = key === '0' ? rootEntryId : key;
    return (
      <div className={navTreeItemClass(mappedKey)} key={mappedKey}>
        <AiOutlineFolder className={styles.icon}/>
        <div className={styles.navItemContent}>{title}</div>
      </div>
    )
  }
  return (
    <div className={styles.navlist}>
      <div className={navItemClass('recent')} onClick={()=>handleNavigate('recent')}>
        <AiOutlineAppstore className={styles.icon}/>
        <div className={styles.navItemContent}>最近</div>
      </div>
      <div className={navItemClass('star')} onClick={()=>handleNavigate('star')}>
        <AiOutlineStar className={styles.icon}/>
        <div className={styles.navItemContent}>收藏</div>
      </div>
      <div className={navItemClass('share')} onClick={()=>handleNavigate('share')}>
        <AiOutlineShareAlt className={styles.icon}/>
        <div className={styles.navItemContent}>分享</div>
      </div>
      <div className={navItemClass('trash')} onClick={()=>handleNavigate('trash')}>
        <AiOutlineDelete className={styles.icon}/>
        <div className={styles.navItemContent}>回收站</div>
      </div>
      {/* <div className={styles.navItem}>
        <AiOutlineFolder className={styles.icon}/>
        <div className={styles.navItemContent}>我的文件夹</div>
      </div> */}
      <div className={styles.navTree}>
        <DictTree
          titleRender={titleRender}
        />
      </div>
      {/* <div className={styles.navItem}>
        <AiOutlineDelete className={styles.icon}/>
        <div className={styles.navItemContent}>回收站</div>
      </div> */}
      {/* <div className={styles.navItem}> */}
        
      {/* </div> */}
    </div>
  )
}

export default Nav;