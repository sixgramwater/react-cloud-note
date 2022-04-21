import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import {
  AiFillFolderOpen,
  AiOutlineMore,
  AiFillFileMarkdown,
  AiFillFileText,
} from "react-icons/ai";
import cx from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { timeFormat } from "../../utils";
import MoreMenu from "./moreMenu";

type EntryType = {
  name: string;
  dir: boolean;
  type: number;
  created: number;
  fileId: string;
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
  const { name, dir, type, fileId, created } = props;
  const { entryId, fileId: fId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const moreIconRef = useRef<HTMLDivElement>(null);
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
      navigate(`/${entryId}/dir/${fileId}`);
    } else {
      navigate(`/${entryId}/markdown/${fileId}`);
    }
  };
  const handleClickMore = (e: React.MouseEvent<any>) => {
    if (!moreIconRef.current) return;
    e.stopPropagation();
    const { left, top } = moreIconRef.current.getBoundingClientRect();
    // const height = 
    const el = document.getElementById('root');
    const height = el!.clientHeight;
    const maxTop = height - 360;
    let newTop = Math.min(maxTop, top);
    posRef.current = { left, top: newTop };

    setShowMenu(true);
    // console.log('more')
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
        <div className={styles.filename}>{name}</div>
        <div
          className={styles.filemore}
          onClick={(e) => handleClickMore(e)}
          ref={moreIconRef}
        >
          <AiOutlineMore />
          {showMenu && <MoreMenu onClickOutside={handleCloseMenu} style={{left: `${posRef.current.left+24}px`, top: `${posRef.current.top}px`}}/>}
        </div>
      </div>
      <div className={styles.dateSize}>
        <span className={styles.fileDate}>{timeFormat(created)}</span>
      </div>
    </div>
  );
};

export default ListItem;
