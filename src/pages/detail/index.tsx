import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import MdEditor from "../../components/editor/mdEditor";
import styles from "./index.module.scss";
import TitleInput from "./titleInput";
import { AiOutlineMore } from "react-icons/ai";
import Fallback from "../fallback";
import Editor from "../../components/editor";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchEntryById } from "../../api";
import { entryItem } from "../../store/appSlice";

const Detail = () => {
  const { fileId, fileType } = useParams();
  const [currentEntryItem, setCurrentEntryItem] = useState<entryItem>();
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    if(!fileId) return;
    fetchEntryById(fileId).then(value => {
      setCurrentEntryItem(value);
      dispatch({
        type: 'app/addEntryItem',
        payload: value,
      })
      // console.log(value);
    }).catch(err => {
      console.log(err);
    })
  }, [fileId])
  // const currentEntryItem = useAppSelector((state) =>
  //   state.app.entryList
  // ).find(entry => entry.fileId === fileId);

  console.log(currentEntryItem)
  const handleClickTitle = () => {
    setShowInput(true);
  }
  // const entryName = currentEntryItem ? currentEntryItem.name : 'error'
  const [fileName, setFileName] = useState('');
  useEffect(() => {
    if(!currentEntryItem)  return;
    console.log(currentEntryItem.name);
    setFileName(currentEntryItem.name);
  }, [currentEntryItem])
  
  const handleModifyTitle = (value: string) => {
    console.log(value);
    setShowInput(false);
    setFileName(value);
  };
  const isDir = fileType === "dir";
  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div className={styles.title}>
          {/* {
            fileName
          } */}
          {/* <TitleInput defaultValue={fileName} onBlur={handleModifyTitle} /> */}
          <div className={styles.titleContainer}>
            {
              !showInput ?
              <span onClick={handleClickTitle}>{fileName}</span>
              :
              <TitleInput defaultValue={fileName} onBlur={handleModifyTitle} />
            }
            {/* <form className={styles.inputForm}>
              <input type="text" value={filename} className={styles.input}/>
            </form> */}
          </div>
        </div>
        <div className={styles.btnContainer}>
          {!isDir && <Button>保存</Button>}

          {/* <Button >
            保存
          </Button> */}
        </div>
        <div className={styles.toolbarContainer}>
          <Button type="primary">分享</Button>
          <div className={styles.icons}>
            <i className={styles.iconMore}>
              <AiOutlineMore />
            </i>
            {/* <i className={styles.icon}><AiOutlineMore/></i> */}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {/* <Fallback/> */}
        {isDir ? <Fallback /> : <Editor />}

        {/* <Editor/> */}

        {/* <MdEditor/> */}
      </div>
      {/* {fileId} */}
    </div>
  );
};

export default Detail;
