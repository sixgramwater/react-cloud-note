import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/button';
import MdEditor from '../../components/editor/mdEditor';
import styles from './index.module.scss';
import TitleInput from './titleInput';
import { AiOutlineMore } from 'react-icons/ai';
import Fallback from '../fallback';
import Editor from '../../components/editor';

const Detail = () => {
  const { fileId } = useParams();
  const [fileName, setFileName] = useState('test.md');
  const handleModifyTitle = (value: string) => {
    console.log(value);
    setFileName(value);
  }
  const filename = 'test.md';
  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div className={styles.title}>
          <TitleInput 
            defaultValue={fileName}
            onBlur={handleModifyTitle}
          />
          {/* <div className={styles.titleContainer}>
            <form className={styles.inputForm}>
              <input type="text" value={filename} className={styles.input}/>
            </form>
          </div> */}
        </div>
        <div className={styles.btnContainer}>
          <Button>保存</Button>

          {/* <Button >
            保存
          </Button> */}
        </div>
        <div className={styles.toolbarContainer}>
          <Button type='primary'>分享</Button>
          <div className={styles.icons}>
            <i className={styles.iconMore}><AiOutlineMore/></i>
            {/* <i className={styles.icon}><AiOutlineMore/></i> */}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {/* <Fallback/> */}
        <Editor/>
        {/* <MdEditor/> */}
      </div>
      {/* {fileId} */}
    </div>
  )
}

export default Detail;