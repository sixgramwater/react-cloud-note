import React from "react";
import styles from "./index.module.scss";
import Button from "../button";

const EmptyFolder = () => {
  const handleCreateNewNote = () => {};
  return (
    <div className={styles.emptyFolder}>
      <div className={styles.emptyContent}>
        <span className={styles.text}>当前文件夹为空</span>
        <Button type="primary" onClick={handleCreateNewNote} width={100}>
          新建笔记
        </Button>
      </div>

      {/* <div className={styles.}></div> */}
    </div>
  );
};

export default EmptyFolder;
