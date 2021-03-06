import React from "react";
import styles from "./index.module.scss";
import {
  TextBold,
  TextItalic,
  H,
  H1,
  H2,
  H3,
  LevelFourTitle,
  LevelFiveTitle,
  Quote,
  LinkOne,
  Picture,
  Code,
  CodeBrackets,
  ListTwo,
  OrderedList,
  CheckCorrect,
  Strikethrough,
  LeftExpand,
  RightExpand,
  FullScreen,
} from "@icon-park/react";
import { Tooltip, Menu } from "antd";
import { Dropdown } from 'antd';
import cx from 'classnames';
// import TextBold from '@icon-park/react/lib/icons/TextBold';
// import TextItalic from '@icon-park/react/lib/icons/TextItalic';
// import H from '@icon-park/react/lib/icons/H';

// const HeadingMenu = 
//   (
//     <Menu>
//       <Menu.Item>
//         <i className={styles.menuIcon}>
//           <H1 theme="outline" size="18" fill="#333" />
//         </i>
//         <span className={styles.menuText}>
//           Heading 1
//         </span>
//       </Menu.Item>
//       <Menu.Item>
//         <i className={styles.menuIcon}>
//           <H2 theme="outline" size="18" fill="#333" />
//         </i>
//         <span className={styles.menuText}>
//           Heading 2
//         </span>
//       </Menu.Item>
//       <Menu.Item>
//         <i className={styles.menuIcon}>
//           <H3 theme="outline" size="18" fill="#333" />
//         </i>
//         <span className={styles.menuText}>
//           Heading 3
//         </span>
//       </Menu.Item>
//       <Menu.Item>
//         <i className={styles.menuIcon}>
//           <LevelFourTitle theme="outline" size="18" fill="#333" />
//         </i>
//         <span className={styles.menuText}>
//           Heading 4
//         </span>
//       </Menu.Item>
//       <Menu.Item>
//         <i className={styles.menuIcon}>
//           <LevelFiveTitle theme="outline" size="18" fill="#333" />
//         </i>
//         <span className={styles.menuText}>
//           Heading 5
//         </span>
//       </Menu.Item>
//     </Menu>
//   );

export interface ToolbarProps {
  activeTab: 'default'|'preview'|'write'
  onCommand?: (command: string) => void;
  onInsertPicture?: (file: File) => void;
  onChangeActiveTab: (tab: 'default'|'preview'|'write') => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onCommand, onInsertPicture, activeTab, onChangeActiveTab } = props;
  const handleClick = (command: string) => {
    // console.log(e.target);
    onCommand && onCommand(command);
  }
  const handleClickImage = () => {
    const fileInputEl = document.createElement('input');
    fileInputEl.setAttribute('type', 'file');
    fileInputEl.setAttribute('id', 'fileInput');
    fileInputEl.setAttribute('style', 'visibility:hidden;position:absolute;z-index:-1;height:0;');
    document.body.appendChild(fileInputEl);
    if(!onInsertPicture)  return;
    fileInputEl.onchange = (e) => {
      const file = fileInputEl.files![0];
      onInsertPicture(file);
    }
    fileInputEl.click();

  }
  const handleChangeActiveTab = (tab: 'default'|'preview'|'write') => {
    if(!onChangeActiveTab)  return;
    if(tab === activeTab) {
      onChangeActiveTab('default')
    } else {
      onChangeActiveTab(tab);
    }
  }
  return (
    <div className={styles.mdToolbar}>
      <div className={cx(styles.mdToolbarInner, styles.mdToolbarLeft)}>
        {/* <Dropdown overlay={HeadingMenu}> */}
        {/* <Dropdown overlay={HeadingMenu}> */}
        <div className={styles.toolbarIcon} onClick={()=>handleClick('heading')}>
          <Tooltip title="Heading">
            <H theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        {/* </Dropdown> */}
          
        {/* </Dropdown> */}
        <div className={styles.toolbarIcon} onClick={()=>handleClick('bold')}>
          <Tooltip title="Bold">
            <TextBold theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('italic')}>
          <Tooltip title="Italic">
            <TextItalic theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('strikethrough')}>
          <Tooltip title="Strikethrough">
            <Strikethrough theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>

        <div className={styles.toolbarIcon} onClick={()=>handleClick('quote')}>
          <Tooltip title="Quote">
            <Quote theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('link')}>
          <Tooltip title="Link">
            <LinkOne theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('code')}>
          <Tooltip title="Code">
            <Code theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('codeblock')}>
          <Tooltip title="Code Block">
            <CodeBrackets theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClickImage()}>
          <Tooltip title="Picture">
            <Picture theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('unorderedList')}>
          <Tooltip title="Unordered list">
            <ListTwo theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('orderedList')}>
          <Tooltip title="Ordered list">
            <OrderedList theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon} onClick={()=>handleClick('checklist')}>
          <Tooltip title="Task list">
            <CheckCorrect theme="outline" size="24" fill="#333" />
          </Tooltip>
        </div>
      </div>
      <div className={cx(styles.mdToolbarInner, styles.mdToolbarRight)}>
        <div className={cx(styles.toolbarIcon, {[styles.active]:activeTab === 'write'} )} onClick={()=>handleChangeActiveTab('write')}>
          <Tooltip title="Write only">
            <LeftExpand theme="outline" size="24" fill="#333"/>
          </Tooltip>
        </div>
        <div className={cx(styles.toolbarIcon, {[styles.active]:activeTab === 'preview'} )} onClick={()=>handleChangeActiveTab('preview')}>
          <Tooltip title="Preview only">
            <RightExpand theme="outline" size="24" fill="#333"/>
          </Tooltip>
        </div>
        <div className={styles.toolbarIcon}>
          <Tooltip title='full screen'>
            <FullScreen theme="outline" size="24" fill="#333"/>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Toolbar);
