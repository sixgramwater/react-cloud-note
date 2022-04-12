import React from 'react';
import styles from './index.module.scss';
import { AiFillFolderOpen, AiOutlineMore, AiFillFileMarkdown, AiFillFileText } from 'react-icons/ai';
import cx from 'classnames'
import { useNavigate, useParams } from 'react-router-dom';
import { timeFormat } from '../../utils';

type EntryType = {
  name: string,
  dir: boolean,
  type: number,
  createTime: number,
  fileId: string,
}

const typeToName = [
  {
    type: 0,
    label: 'folder',
  },
  {
    type: 1,
    label: 'markdown'
  },
  {
    type: 2,
    label: 'note'
  }
]

const ListItem: React.FC<EntryType> = (props) => {
  const { 
    name,
    dir,
    type,
    fileId,
    createTime
  } = props;
  const { entryId } = useParams();
  const navigate = useNavigate();
  const renderListIcon = (type: number) => {
    // const label = typeToName[type].label;
    if(type === 0) {
      return (
        <AiFillFolderOpen style={{color: '#ffbb49', fontSize: '20px'}}/>
      )
    } else if(type === 1) {
      return (
        <AiFillFileMarkdown style={{color: '#38b6fc', fontSize: '20px'}}/>
      )
    } else if(type === 2) {
      return (
        <AiFillFileText style={{color: '#5b89fe', fontSize: '20px'}}/>
      )
    }
  }

  const handleClick = () => {
    navigate(`/${entryId}/${fileId}`)
  }
  return (
    <div className={styles.listItem} onClick={handleClick}>
      <div className={styles.title}>
        <div className={styles.icon}>
          {
            renderListIcon(type)
          }
          {/* <AiFillFolderOpen style={{color: '#ffbb49', fontSize: '20px'}}/> */}
        </div>
        <div className={styles.filename}>{name}</div>
        <div className={styles.filemore}>
          <AiOutlineMore/>
        </div>
      </div>
      <div className={styles.dateSize}>
        <span className={styles.fileDate}>
          {timeFormat(createTime)}
        </span>
      </div>
    </div>
  )
}

export default ListItem;