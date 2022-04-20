import React, { CSSProperties, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import styles from "./index.module.scss";
// import Portal from '../portal';
import cx from "classnames";
import Portal from "../portal";
import { useClickOutside } from "../../hooks";

// ReactDOM.createPortal()
export interface MoreMenuProps {
  style?: CSSProperties;
  className?: string;
  onClickOutside?: () => void;
}
const MoreMenu: React.FC<MoreMenuProps> = (props) => {
  const { style, className, onClickOutside } = props;
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    onClickOutside && onClickOutside();
  });
  const moreMenuClass = cx(styles.moreMenu, className);
  return (
    <Portal>
      <div className={moreMenuClass} style={style} ref={ref}>
        <div className={styles.menuList}>
          <div className={styles.menuItem}>
            <span>新建</span>
          </div>
          <div className={styles.menuItem}>
            <span>复制</span>
          </div>
          <div className={styles.menuItem}>
            <span>移动</span>
          </div>
          <div className={styles.menuItem}>
            <span>重命名</span>
          </div>
          <div className={styles.menuItem}>
            <span>删除</span>
          </div>
          <div className={styles.menuItem}>
            <span>加星</span>
          </div>
          <div className={styles.menuItem}>
            <span>置顶</span>
          </div>
          <div className={styles.menuItem}>
            <span>查看历史版本</span>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default MoreMenu;
