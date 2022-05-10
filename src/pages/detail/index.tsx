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
import {
  fetchEntryById,
  syncFileDownload,
  syncFilePush,
  updateEntryName,
} from "../../api";
import { entryItem } from "../../store/appSlice";
import { message, Modal } from "antd";
import DotLoader from "../../components/loader";

interface shareModalProps {
  fileId: string;
  visible?: boolean;
  handleClose?: () => void;
}
const ShareModal: React.FC<shareModalProps> = (props) => {
  const { fileId, visible = false, handleClose } = props;
  const link = `https://react-cloud-note.vercel.com/share/${fileId}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const handleStopShare = () => {
    handleClose && handleClose();
    setLoading(true);
  };
  const handlePaste = () => {
    navigator.clipboard.writeText(link).then(() => {
      message.success("成功复制到剪贴板");
    });
  };
  useEffect(() => {
    if(!visible)  return;
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [visible]);
  return (
    <Modal visible={visible} title="分享" onCancel={handleClose} footer={null}>
      {/* <div className={styles.loadingShare}>
          {loading}
          <DotLoader />
        </div> */}
      {loading ? (
        <div className={styles.loadingShare}>
          {/* loading */}
          <DotLoader />
        </div>
      ) : (
        <div className={styles.shareDialog}>
          <div className={styles.shareLink}>
            <input
              type="text"
              readOnly
              onClick={() => inputRef.current?.select()}
              ref={inputRef}
              value={link}
            />
          </div>
          <div className={styles.shareBtn}>
            <Button onClick={handleStopShare}>停止分享</Button>
            <Button type="primary" onClick={handlePaste}>
              复制链接
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

const Detail = () => {
  const { fileId, fileType } = useParams();
  const [currentEntryItem, setCurrentEntryItem] = useState<entryItem>();
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const bodyStringRef = useRef<string | null>();
  const curEntryList = useAppSelector((state) => state.app.curEntryList);
  const [initialBodyString, setInitialBodyString] = useState<
    string | undefined
  >();
  const [saveLoading, setSaveLoading] = useState(false);
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
    const item = curEntryList.find((item) => item.fileId === fileId);
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
    if (!fileId) return;
    if (value === "") {
      message.error("标题不能为空");
      return;
    }
    // console.log(value);

    updateEntryName(fileId, value)
      .then((res) => {
        dispatch({
          type: "app/updateCurEntryList",
          payload: {
            fileId,
            name: value,
          },
        });
        setFileName(value);
        message.success("修改成功");
      })
      .catch((err) => {
        message.error("修改失败");
      });
  };
  const handleShowShare = () => {
    setShowShareDialog(true);
  };
  const handleChangeBodyString = useCallback((value: string) => {
    bodyStringRef.current = value;
  }, []);

  const handleSave = () => {
    if (!fileId || !bodyStringRef.current) return;
    setSaveLoading(true);
    setTimeout(()=>{
      fun();
    }, 1500)
    const fun = () =>{
      syncFilePush(fileId, bodyStringRef.current!)
      .then((value) => {
        console.log(value);
        message.success("保存成功");
        setSaveLoading(false);
      })
      .catch((err) => {
        message.error("保存失败");
        setSaveLoading(false);
      });
    }
    
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
          {!isDir && <Button onClick={handleSave} className={styles.btn} loading={saveLoading} height={34}>保存</Button>}

          {/* <Button >
            保存
          </Button> */}
        </div>
        <div className={styles.toolbarContainer}>
          {fileId && (
            <ShareModal
              visible={showShareDialog}
              fileId={fileId}
              handleClose={() => setShowShareDialog(false)}
            />
          )}
          <Button type="primary" onClick={handleShowShare} className={styles.btn}>
            分享
          </Button>
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
            onSave={handleSave}
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
