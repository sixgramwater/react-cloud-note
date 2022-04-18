import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import Toolbar from "./toolbar";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "./editor.scss";
import "codemirror/mode/markdown/markdown";
import {
  debounce,
  findStartIndex,
  throttle,
  throttleByTimestamp,
} from "../../utils";
import { useThrottle } from "../../hooks";
import Preview from "./previewer";
import { commandList } from "./command";
import { imageUpload } from "../../api";
import cx from "classnames";

type cmInstance = ReturnType<typeof CodeMirror>;

const mdValue = `
## Markdown Basic Syntax

I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type \`nano\`.

My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).
1. First item
2. Second item
3. Third item

> Dorothy followed her through many of the beautiful rooms in her castle.
`;

export interface PosRefType {
  editPos: number[];
  previewPos: number[];
}

export interface EditorProps {
  uploadImages?: (files: File[]) => Promise<any>;
  onChange?: (value: string) => void;
  placeholder?: string;
}
const Editor: React.FC<EditorProps> = (props) => {
  const { uploadImages, onChange, placeholder } = props;
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  let cmRef = useRef<cmInstance>();
  const hastRef = useRef<any>();
  const vfileRef = useRef();
  const posRef = useRef<PosRefType>();
  const [editorHeight, setEditorHeight] = useState(400);
  const [input, setInput] = useState(placeholder ?? mdValue);
  const [activeTab, setActiveTab] = useState<"default" | "write" | "preview">(
    "default"
  );

  const editClass = cx(styles.mdEditor, {
    [styles.hide]: activeTab === "preview",
    [styles.full]: activeTab === "write",
  });

  const previewClass = cx(styles.mdPreview, {
    [styles.full]: activeTab === "preview",
    [styles.hide]: activeTab === "write",
  });
  // let editStyle = `width: 50%`;
  // let previewStyle = `width: 50%`;
  // if(activeTab === 'write') {
  //   editStyle = `width: 100%`;
  //   previewStyle = `display: none`;
  // } else if(activeTab === 'preview') {
  //   editStyle = `display: none`;
  //   previewStyle = `width: 100%`;
  // }
  // const {} =
  // const
  useEffect(() => {
    if (!cmRef.current) return;
    cmRef.current.on("scroll", handleEditorScroll);
    cmRef.current.on("paste", async (_, e) =>
      handleImages(e, e.clipboardData?.items)
    );
    cmRef.current.on("drop", async (_, e) =>
      handleImages(e, e.dataTransfer?.items)
    );
    // cmRef.current.addKeyMap()
    console.log("listen");
  }, []);
  // useEffect(() => {
  //   console.log(input);
  // }, [input]);
  const handleImages = (
    e: Event,
    itemList: DataTransferItemList | undefined
  ) => {
    const files = Array.from(itemList ?? [])
      .map((item) => {
        if (item.type.startsWith("image/")) {
          return item.getAsFile();
        }
      })
      .filter((f) => f != null);
    if (files.length === 0) {
      console.log("no supported files");
      return;
    }
    // now only support single image file upload
    const file = files[0] as File;
    console.log(file);
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("md5", Math.random().toFixed(8));
    imageUpload(fileFormData).then((res) => {
      if (res.code === "00000") {
        console.log(res.data);
        const fileUrl = `http://124.220.0.95:9999/document/${res.data.fileUrl}`;
        const cursor = cmRef.current!.getCursor();
        let { ch, line } = cursor;
        cmRef.current!.setCursor({ ch: 0, line: line + 1 });
        cmRef.current!.replaceSelection(`\n![img](${fileUrl})\n`);
      } else {
        console.log(res.msg);
      }
    });
    // console.log(files);
    // imageUpload(itemList[0])
  };

  const handleInsertPicture = (file: File) => {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("md5", Math.random().toFixed(8));
    imageUpload(fileFormData).then((res) => {
      if (res.code === "00000") {
        console.log(res.data);
        const fileUrl = `http://124.220.0.95:9999/document/${res.data.fileUrl}`;
        const cursor = cmRef.current!.getCursor();
        let { ch, line } = cursor;
        cmRef.current!.setCursor({ ch: 0, line: line + 1 });
        cmRef.current!.replaceSelection(`\n![img](${fileUrl})\n`);
      } else {
        console.log(res.msg);
      }
    });
  };
  const handleChangeActiveTab = (tab: "default" | "write" | "preview") => {
    setActiveTab(tab);
  };
  const handleEditorScroll = throttleByTimestamp(() => {
    console.log("scroll");
    if (!cmRef.current || !previewRef.current) return;
    updateBlockPostiton();
    const info = cmRef.current!.getScrollInfo();
    const leftRatio = info.top / (info.height - info.clientHeight);
    console.log(leftRatio);
    const startIndex = findStartIndex(leftRatio, posRef.current!.editPos);
    const editPs = posRef.current!.editPos;
    const previewPs = posRef.current!.previewPos;
    // debugger
    const rightRatio =
      ((leftRatio - editPs[startIndex]) *
        (previewPs[startIndex + 1] - previewPs[startIndex])) /
        (editPs[startIndex + 1] - editPs[startIndex]) +
      previewPs[startIndex];
    console.log(rightRatio);
    previewRef.current!.scrollTo(
      0,
      rightRatio *
        (previewRef.current!.scrollHeight - previewRef.current!.clientHeight)
    );
  }, 500);

  const updateBlockPostiton = () => {
    console.log("before upload");
    if (!cmRef.current || !previewRef.current || !hastRef.current) return;

    posRef.current = {
      editPos: [],
      previewPos: [],
    };
    const scrollInfo = cmRef.current.getScrollInfo();
    // console.log(scrollInfo);
    // console.log(hastRef.current);
    const body = previewRef.current.childNodes[0];
    // console.log(body);
    if (!(body instanceof HTMLElement)) return;
    const leftNodes = hastRef.current.children.filter(
      (v: any) => v.type === "element"
    );
    // @ts-ignore
    const rightNodes = [...body.childNodes].filter(
      (v: any) => v instanceof HTMLElement
    );
    for (let i = 0; i < leftNodes.length; i++) {
      const leftNode = leftNodes[i];
      const rightNode = rightNodes[i];
      // if there is no position info, move to the next node
      if (!leftNode.position) {
        continue;
      }
      const left =
        cmRef.current.heightAtLine(leftNode.position.start.line - 1, "local") /
        (scrollInfo.height - scrollInfo.clientHeight);
      const right =
        (rightNode.offsetTop - body.offsetTop) /
        (previewRef.current.scrollHeight - previewRef.current.clientHeight);

      if (left >= 1 || right >= 1) {
        break;
      }
      posRef.current.editPos.push(left);
      posRef.current.previewPos.push(right);
    }
    posRef.current.editPos.push(1);
    posRef.current.previewPos.push(1);
    console.log(posRef.current);
  };

  const handleCommand = (command: string) => {
    if (!cmRef.current) return;
    // const commandList = ['bold', 'italic', 'code'];
    const commandObj = commandList.find((item) => item.command === command);
    if (!commandObj) return;
    // handleNormalCommand(commandObj.matchStr);
    if (commandObj.type === 0) {
      // heading
      handleSimpleCommand(commandObj.matchStr);
    } else if (commandObj.type === 1) {
      handleNormalCommand(commandObj.matchStr);
    } else if (commandObj.type === 2) {
      handleMultiCommand(commandObj.matchStr);
    } else if (commandObj.type === 3) {
      handleLink();
    } else if (commandObj.type === 4) {
      handleCodeBlock();
    }
  };
  //
  const handleSimpleCommand = (matchStr: string) => {
    if (!cmRef.current) return;
    const cm = cmRef.current;
    cm.focus();
    // const changePos = matchStr.length;
    // let preAlready = false;
    if (cm.somethingSelected()) {
      const selected = cm.getSelection();
      cm.replaceSelection(`${matchStr} ${selected}`);
    } else {
      const cursor = cm.getCursor();
      const { line: curLine } = cursor; // 获取光标位置
      const line = cm.getLine(curLine);
      // cm.getRange()
      cm.replaceRange(
        `${matchStr} ${line}`,
        { line: curLine, ch: 0 },
        { line: curLine, ch: line.length }
      );
      // cm.getRange({ line: curLine, ch: curPos - changePos }, cursor) ===
      //   matchStr && (preAlready = true)
      // if(preAlready) {
      //   // cm.replaceRange()
      // }
    }
  };

  const handleNormalCommand = (matchStr: string) => {
    if (!cmRef.current) return;
    const cm = cmRef.current;
    cm.focus();
    const changePos = matchStr.length;
    let preAlready = false,
      aftAlready = false;
    if (cm.somethingSelected()) {
      const selected = cm.getSelection();
      cm.replaceSelection(`${matchStr}${selected}${matchStr}`);
    } else {
      const cursor = cm.getCursor();
      const { line: curLine, ch: curPos } = cursor; // 获取光标位置
      // 判断前后是否有matchStr
      if (
        cm.getRange({ line: curLine, ch: curPos - changePos }, cursor) ===
        matchStr
      ) {
        preAlready = true;
      }
      if (
        cm.getRange(cursor, { line: curLine, ch: curPos + changePos }) ===
        matchStr
      ) {
        aftAlready = true;
      }
      if (aftAlready && preAlready) {
        // 去除前后的matchStr
        cm.replaceRange("", cursor, { line: curLine, ch: curPos + changePos });
        cm.replaceRange("", { line: curLine, ch: curPos - changePos }, cursor);
        cm.setCursor({ line: curLine, ch: curPos - changePos });
      } else if (!preAlready && !aftAlready) {
        // 前后都没有matchStr
        cm.replaceSelection(matchStr + matchStr);
        cm.setCursor({ line: curLine, ch: curPos + changePos });
      }
    }
  };

  const handleMultiCommand = (matchStr: string) => {
    if (!cmRef.current) return;
    const cm = cmRef.current;
    cm.focus();
    if (cm.somethingSelected()) {
      const selectContent = cm.listSelections()[0];
      let { anchor, head } = selectContent;
      if (head.line >= anchor.line && head.sticky === "before") {
        [head, anchor] = [anchor, head];
      }
      let preLine = head.line;
      let aftLine = anchor.line;
      if (preLine !== aftLine) {
        // 选中了多行，在每行前加上匹配字符
        let pos = matchStr.length;
        for (let i = preLine; i <= aftLine; i++) {
          cm.setCursor({ line: i, ch: 0 });
          cm.replaceSelection(matchStr);
          if (i === aftLine) {
            pos += cm.getLine(i).length;
          }
        }
        cm.setCursor({ line: aftLine, ch: pos });
        cm.focus();
      } else {
        const preStr = cm.getRange({ line: preLine, ch: 0 }, head);
        if (preStr === matchStr) {
          cm.replaceRange("", { line: preLine, ch: 0 }, head);
        } else {
          const selectVal = cm.getSelection();
          let replaceStr = `\n\n${matchStr}${selectVal}\n\n`;
          cm.replaceSelection(replaceStr);
          cm.setCursor({
            line: preLine + 2,
            ch: (matchStr + selectVal).length,
          });
        }
      }
      // console.log(selectContent);
    } else {
      const cursor = cm.getCursor();
      let { line: curLine, ch: curPos } = cursor; // 获取光标位置
      let preStr = cm.getRange({ line: curLine, ch: 0 }, cursor);
      let preBlank = "";
      if (/^( |\t)+/.test(preStr)) {
        // 有序列表标识前也许会有空格或tab缩进
        const matched = preStr.match(/^( |\t)+/);
        if (matched) {
          preBlank = matched[0];
        }
      }
      curPos && (matchStr = `\n${preBlank}${matchStr}`) && ++curLine;
      cm.replaceSelection(matchStr);
      cm.setCursor({ line: curLine, ch: matchStr.length });
    }
  };

  const handleLink = () => {
    if (!cmRef.current) return;
    const cm = cmRef.current;
    cm.focus();
    if (cm.somethingSelected()) {
      const selected = cm.getSelection();
      cm.replaceSelection(`[${selected}](url)`);
    } else {
      const cursor = cm.getCursor();
      let { line: curLine, ch: curPos } = cursor; // 获取光标位置
      const lineLen = cm.getLine(curLine).length;
      let lineStr = cm.getLine(curLine);
      // let preStr = cm.getRange({ line: curLine, ch: 0 }, cursor);
      // let aftStr = cm.getRange(cursor, { line: curLine, ch: lineLen });
      // console.log(aftStr);
      let preSpaceIndex = -1;
      let aftSpaceIndex = -1;
      for (let i = curPos; i >= 0; i--) {
        if (lineStr[i] === " ") {
          preSpaceIndex = i;
          break;
        }
      }
      for (let i = curPos; i < lineLen; i++) {
        if (lineStr[i] === " ") {
          aftSpaceIndex = i;
          break;
        }
      }
      preSpaceIndex = preSpaceIndex === -1 ? 0 : preSpaceIndex + 1;
      aftSpaceIndex = aftSpaceIndex === -1 ? lineLen : aftSpaceIndex;
      const rangeText = cm.getRange(
        { line: curLine, ch: preSpaceIndex },
        { line: curLine, ch: aftSpaceIndex }
      );

      cm.replaceRange(
        `[${rangeText}](url)`,
        { line: curLine, ch: preSpaceIndex },
        { line: curLine, ch: aftSpaceIndex }
      );
    }
  };

  const handleCodeBlock = () => {
    if (!cmRef.current) return;
    const cm = cmRef.current;
    cm.focus();
    const cursor = cm.getCursor();
    const { line: curLine } = cursor;
    cm.setCursor({ line: curLine + 1, ch: 0 });
    cm.replaceSelection(`\n\`\`\`\n\n\`\`\``);
    cm.setCursor({ line: curLine + 2, ch: 0 });
  };
  const handleHast = useCallback((tree: any, file: any) => {
    hastRef.current = tree;
    vfileRef.current = file;
    // console.log(hastRef.current);
    // console.log(tree);
  }, []);
  // const throttleUpdateFn = (value: string) => throttle(()=>{
  //   setInput(value);
  // }, 500);
  // const throttled = useCallback((value: string) => {
  //   return throttle(()=>setInput(value), 500);
  // }, []);
  // const throttled = throttleByTimestamp(setInput, 300);
  const debounced = debounce(setInput, 500);
  useLayoutEffect(() => {
    if (!editorRef.current) return;
    cmRef.current = CodeMirror(editorRef.current, {
      value: mdValue,
      mode: "markdown",
      lineWrapping: true,
      tabSize: 2,
    });
    cmRef.current.on("change", (ins) => {
      // console.log(ins.getValue())
      const value = ins.getValue();
      debounced(value);
      onChange && onChange(value);
      // throttled(ins.getValue());
      // throttle(() => setInput(ins.getValue()), 1000)();
      // console.log(ins.getValue());
      // throttleUpdateFn(ins.getValue())();
      // console.log(ins);
    });
  }, []);

  useEffect(() => {
    const body = document.getElementById("mdBody");
    if (body) {
      const { height } = body.getBoundingClientRect();
      setEditorHeight(height);
    }

    document.addEventListener("resize", () => {
      const body = document.getElementById("mdBody");
      if (body) {
        const { height } = body.getBoundingClientRect();
        setEditorHeight(height);
      }
    });
  }, []);

  return (
    <div className={styles.md}>
      <Toolbar
        activeTab={activeTab}
        onCommand={handleCommand}
        onInsertPicture={handleInsertPicture}
        onChangeActiveTab={handleChangeActiveTab}
      />
      <div className={styles.mdBody} id="mdBody">
        <div
          className={editClass}
          ref={editorRef}
          style={{ maxHeight: `${editorHeight}px` }}
        ></div>
        {/* <div className={styles.mdViewer}></div> */}
        <div
          className={previewClass}
          style={{ maxHeight: `${editorHeight}px` }}
          ref={previewRef}
        >
          <Preview value={input} onHast={handleHast} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
