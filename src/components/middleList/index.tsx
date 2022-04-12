import React from 'react';
import { useParams } from 'react-router-dom';
import FolderList from '../folderList';
import Searchbar from '../searchbar';
import styles from './index.module.scss';

const MiddleList = () => {
  const { entryId }= useParams();
  return (
    <div className={styles.list}>
      <div className={styles.listSearch}>
        <Searchbar/>
      </div>
      <div className={styles.listDetail}>
        <div className={styles.listHeader}></div>
        <div className={styles.listView}>
          <FolderList />
        </div>
      </div>
      {/* {entryId} */}
    </div>
  )
}

export default MiddleList;