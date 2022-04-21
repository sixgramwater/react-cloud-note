import React from 'react';
import styles from './index.module.scss';
import ListItem from './listItem';

export interface IFolerListProps {
  list?: EntryType[],
}

export type EntryType = {
  name: string,
  dir: boolean,
  type: number,
  created: number,
  fileId: string,
}

const FolderList: React.FC<IFolerListProps> = (props) => {
  const {list} = props;
  
  return (
    <div className={styles.folderList}>
      {
        list?.map(item => (
          <ListItem {...item} key={item.fileId}/>
        ))
      }
    </div>
  )
}

export default FolderList;