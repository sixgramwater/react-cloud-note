import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  AiFillFolderOpen,
  AiOutlineMore,
  AiFillFileMarkdown,
  AiFillFileText,
  AiFillStar,
} from "react-icons/ai";
import cx from "classnames";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { timeFormat } from "../../utils";
import MoreMenu from "./moreMenu";
import { starFile, updateEntryName } from "../../api";
import TitleInput from "./titleInput";
import { message } from "antd";
import { useAppDispatch } from "../../hooks";

type EntryType = {
  name: string;
  dir: boolean;
  type: number;
  created: number;
  fileId: string;
  star: boolean;
};

const typeToName = [
  {
    type: 0,
    label: "folder",
  },
  {
    type: 1,
    label: "markdown",
  },
  {
    type: 2,
    label: "note",
  },
];

const ListItem: React.FC<EntryType> = (props) => {
  const { name, dir, type, fileId, created, star } = props;
  const { entryId, fileId: fId } = useParams();
  const { pathname } = useLocation();
  const firstPath = pathname.split("/")[1] ?? "";
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moreIconRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState(false);
  const posRef = useRef<{ left: number; top: number }>({ left: 0, top: 0 });
  const renderListIcon = (type: number) => {
    // const label = typeToName[type].label;
    if (type === 0) {
      return (
        <AiFillFolderOpen style={{ color: "#ffbb49", fontSize: "20px" }} />
      );
    } else if (type === 2) {
      return (
        <AiFillFileMarkdown style={{ color: "#38b6fc", fontSize: "20px" }} />
      );
    } else if (type === 1) {
      return <AiFillFileText style={{ color: "#5b89fe", fontSize: "20px" }} />;
    }
  };

  const handleClick = () => {
    if (dir) {
      navigate(`/${firstPath}/dir/${fileId}`);
    } else {
      navigate(`/${firstPath}/markdown/${fileId}`);
    }
  };

  const handleClickMore = (e: React.MouseEvent<any>) => {
    if (!moreIconRef.current) return;
    e.stopPropagation();
    const { left, top } = moreIconRef.current.getBoundingClientRect();
    // const height =
    const el = document.getElementById("root");
    const height = el!.clientHeight;
    const maxTop = height - 360;
    let newTop = Math.min(maxTop, top);
    posRef.current = { left, top: newTop };

    setShowMenu(true);
    // console.log('more')
  };

  const handleRename = () => {
    // console.log("log");

    setTimeout(() => {
      setShowMenu(false);
      setShowInput(true);
    }, 0);

    // setShowMenu(false);
    // setTimeout(() => {
    //   setShowInput(true);
    // }, 0);
  };

  const handleModifyName = (value: string) => {
    setShowInput(false);
    if (!fileId) return;
    if (value === "") {
      message.error("标题不能为空");
      return;
    }

    updateEntryName(fileId, value)
      .then((res) => {
        dispatch({
          type: "app/updateCurEntryList",
          payload: {
            fileId,
            name: value,
          },
        });
        message.success("修改成功");
      })
      .catch((err) => {
        message.error("修改失败");
      });
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleDBClick = () => {
    if (!dir) return;
    navigate(`/${fileId}/`);
  };

  const listItemClass = cx(styles.listItem, {
    [styles.active]: fId === fileId,
  });
  return (
    <div
      className={listItemClass}
      onClick={handleClick}
      onDoubleClick={handleDBClick}
    >
      <div className={styles.title}>
        <div className={styles.icon}>
          {renderListIcon(type)}
          {/* <AiFillFolderOpen style={{color: '#ffbb49', fontSize: '20px'}}/> */}
        </div>
        <div className={styles.filename}>
          {showInput ? (
            <TitleInput defaultValue={name} onBlur={handleModifyName} />
          ) : (
            name
            // <span onClick={handleShowTitle}>{name}</span>
          )}
          {/* {name} */}
        </div>
        {star && (
          <div className={styles.fileStar}>
            <AiFillStar color="#ffbb49" />
          </div>
        )}

        <div
          className={styles.filemore}
          onClick={(e) => handleClickMore(e)}
          ref={moreIconRef}
        >
          <AiOutlineMore />
          {showMenu && (
            <MoreMenu
              onClickOutside={handleCloseMenu}
              style={{
                left: `${posRef.current.left + 24}px`,
                top: `${posRef.current.top}px`,
              }}
              onClose={() => setShowMenu(false)}
              entryItem={{
                name,
                dir,
                type,
                fileId,
                created,
                star,
              }}
              onRename={handleRename}
              // onSelect={handleSelect}
            />
          )}
        </div>
      </div>
      <div className={styles.dateSize}>
        <span className={styles.fileDate}>{timeFormat(created)}</span>
      </div>
    </div>
  );
};

export default ListItem;
