import React, { CSSProperties, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import styles from "./index.module.scss";
// import Portal from '../portal';
import cx from "classnames";
import Portal from "../portal";
import { useClickOutside } from "../../hooks";
import { EntryType } from ".";
import { starFile } from "../../api";
import { message } from "antd";
import { useDispatch } from "react-redux";

// ReactDOM.createPortal()
export interface MoreMenuProps {
  style?: CSSProperties;
  className?: string;
  onClickOutside?: () => void;
  entryItem?: EntryType;
  onClose?: ()=>void;
  onRename?: ()=>void;
  // onSelect: (key: string) => void;
}
const MoreMenu: React.FC<MoreMenuProps> = (props) => {
  const { style, className, onClickOutside, entryItem, onClose, onRename } = props;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  useClickOutside(ref, () => {
    onClickOutside && onClickOutside();
  });
  const handleRename = () => {
    onRename && onRename();
    // onClose && onClose();
  }
  // const handleSelect = (key: string) => {
  //   // onSelect && onSelect(key);
  // }
  const handleStar = () => {
    if (!entryItem) return;
    const { fileId, star } = entryItem;
    starFile(fileId, true)
      .then((res) => {
        onClose && onClose()
        dispatch({
          type: 'app/updateCurEntryList',
          payload: {
            fileId,
            star: true
          }
        })
        message.success("收藏成功");
      })
      .catch((err) => {
        message.error("收藏失败");
      });
  };

  const handleUnstar = () => {
    if (!entryItem) return;
    const { fileId, star } = entryItem;
    starFile(fileId, false)
      .then((res) => {
        onClose && onClose()

        dispatch({
          type: 'app/updateCurEntryList',
          payload: {
            fileId,
            star: false
          }
        })
        message.success("取消收藏成功");
      })
      .catch((err) => {
        message.error("取消收藏失败");
      });
  };
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
          <div className={styles.menuItem} onClick={handleRename}>
            <span>重命名</span>
          </div>
          <div className={styles.menuItem}>
            <span>删除</span>
          </div>
          {!entryItem?.star ? (
            <div className={styles.menuItem} onClick={handleStar}>
              <span>加星</span>
            </div>
          ) : (
            <div className={styles.menuItem} onClick={handleUnstar}>
              <span>取消加星</span>
            </div>
          )}
          
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
