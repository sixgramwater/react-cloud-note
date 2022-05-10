import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import MdEditor from "../../components/editor/mdEditor";
import styles from "./index.module.scss";
import TitleInput from "./titleInput";
import { AiOutlineMore } from "react-icons/ai";
import Fallback from "../fallback";
import Editor from "../../components/editor";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchEntryById, syncFileDownload, syncFilePush, updateEntryName } from "../../api";
import { entryItem } from "../../store/appSlice";
import { message } from "antd";

const Detail = () => {
  const { fileId, fileType } = useParams();
  const [currentEntryItem, setCurrentEntryItem] = useState<entryItem>();
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);
  const bodyStringRef = useRef<string | null>();
  const curEntryList = useAppSelector(state=>state.app.curEntryList);
  const [initialBodyString, setInitialBodyString] = useState<
    string | undefined
  >();
  // const [fileLoading, setFileLoading] = useState(false);
  useEffect(() => {
    if (!fileId || !fileType) return;
    syncFileDownload(fileId).then((value) => {
      setInitialBodyString(value);
      bodyStringRef.current = value;
      // console.log(value);
    });
    return () => {
      setInitialBodyString(undefined);
      bodyStringRef.current = null;
    };
  }, [fileId]);

  useEffect(() => {
    if (!fileId) return;
    const item = curEntryList.find(item => item.fileId === fileId);
    setCurrentEntryItem(item);
    // fetchEntryById(fileId)
    //   .then((value) => {
    //     setCurrentEntryItem(value);
    //     dispatch({
    //       type: "app/addEntryItem",
    //       payload: value,
    //     });
    //     // console.log(value);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [fileId, curEntryList]);
  // const currentEntryItem = useAppSelector((state) =>
  //   state.app.entryList
  // ).find(entry => entry.fileId === fileId);

  console.log(currentEntryItem);
  const handleClickTitle = () => {
    setShowInput(true);
  };
  // const entryName = currentEntryItem ? currentEntryItem.name : 'error'
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    if (!currentEntryItem) return;
    console.log(currentEntryItem.name);
    setFileName(currentEntryItem.name);
  }, [currentEntryItem]);

  const handleModifyTitle = (value: string) => {
    setShowInput(false);
    if(!fileId) return;
    if(value === '') {
      message.error('标题不能为空');
      return;
    }
    // console.log(value);
    
    updateEntryName(fileId, value).then(res => {
      dispatch({
        type: 'app/updateCurEntryList',
        payload: {
          fileId,
          name: value
        }
      })
      setFileName(value);
      message.success('修改成功');
    }).catch(err => {
      message.error('修改失败');
    })
  };

  const handleChangeBodyString = useCallback((value: string) => {
    bodyStringRef.current = value;
  }, []);

  const handleSave = () => {
    if (!fileId || !bodyStringRef.current) return;
    syncFilePush(fileId, bodyStringRef.current)
      .then((value) => {
        console.log(value);
        message.success("保存成功");
      })
      .catch((err) => {
        message.error("保存失败");
      });
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
            {!showInput ? (
              <span onClick={handleClickTitle}>{fileName}</span>
            ) : (
              <TitleInput defaultValue={fileName} onBlur={handleModifyTitle} />
            )}
            {/* <form className={styles.inputForm}>
              <input type="text" value={filename} className={styles.input}/>
            </form> */}
          </div>
        </div>
        <div className={styles.btnContainer}>
          {!isDir && <Button onClick={handleSave}>保存</Button>}

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
        {isDir || initialBodyString === undefined ? (
          <Fallback />
        ) : (
          <Editor
            onChange={handleChangeBodyString}
            initialValue={initialBodyString}
          />
        )}

        {/* <Editor/> */}

        {/* <MdEditor/> */}
      </div>
      {/* {fileId} */}
    </div>
  );
};

export default Detail;
