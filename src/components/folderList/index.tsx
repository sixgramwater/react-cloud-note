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
  const list2 = [
    {
      name: '学习',
      dir: true,
      type: 0,
      createTime: Date.now(),
      fileId: '12312'
    },
    {
      name: '笔记',
      dir: true,
      type: 0,
      createTime: Date.now(),
      fileId: '123123123'
    },
    {
      name: '娱乐',
      dir: true,
      type: 0,
      createTime: Date.now(),
      fileId: '1231231231244',
    },
    {
      name: '学习记录.md',
      dir: false,
      type: 1,
      createTime: Date.now(),
      fileId: '8999004',

    },
    {
      name: '课堂笔记',
      dir: false,
      type: 2,
      createTime: Date.now(),
      fileId: '8999004asdsd',

    }
  ]
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