import React from 'react';
import styles from './index.module.scss';
import { AiOutlineStar, AiFillAppstore, AiOutlineFolder } from 'react-icons/ai';
import DictTree from '../dictTree';

const Nav = () => {
  const titleRender = (node: any) => {
    const { title, key } = node;
    return (
      <div className={styles.navTreeItem} key={key}>
        <AiOutlineFolder className={styles.icon}/>
        <div className={styles.navItemContent}>{title}</div>
      </div>
    )
  }
  return (
    <div className={styles.navlist}>
      <div className={styles.navItem}>
        <AiFillAppstore className={styles.icon}/>
        <div className={styles.navItemContent}>最新</div>
      </div>
      <div className={styles.navItem}>
        <AiOutlineStar className={styles.icon}/>
        <div className={styles.navItemContent}>收藏</div>
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
      {/* <div className={styles.navItem}> */}
        
      {/* </div> */}
    </div>
  )
}

export default Nav;