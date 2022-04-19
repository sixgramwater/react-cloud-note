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
  created: number,
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
    created
  } = props;
  const { entryId, fileId: fId } = useParams();
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
    if(dir) {
      navigate(`/${entryId}/dir/${fileId}`)
    } else {
      navigate(`/${entryId}/markdown/${fileId}`)
    }
  }

  const handleDBClick = () => {
    if(!dir)  return;
    navigate(`/${fileId}/`);
  }

  const listItemClass = cx(styles.listItem, {
    [styles.active]: fId === fileId
  })
  return (
    <div className={listItemClass} onClick={handleClick} onDoubleClick={handleDBClick}>
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
          {timeFormat(created)}
        </span>
      </div>
    </div>
  )
}

export default ListItem;