import React from 'react';
import Scroll from '../scroll';
import styles from './index.module.scss';
import ListItem from './listItem';

export interface IFolerListProps {
  list?: EntryType[],
  highlightText?: string;
}

export type EntryType = {
  name: string,
  dir: boolean,
  type: number,
  created: number,
  fileId: string,
  star: boolean,
}

const FolderList: React.FC<IFolerListProps> = (props) => {
  const {list, highlightText} = props;
  
  return (
    // <Scroll>
    <div className={styles.folderList}>
      {
        list?.map(item => (
          <ListItem {...item} key={item.fileId} highlightText={highlightText}/>
        ))
      }
    </div>
    
  )
}

export default FolderList;