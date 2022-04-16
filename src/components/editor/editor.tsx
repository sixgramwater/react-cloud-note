import React, {
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
import { debounce, throttle, throttleByTimestamp } from "../../utils";
import { useThrottle } from "../../hooks";
import Preview from "./previewer";
import { commandList } from "./command";

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
const Editor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  let cmRef = useRef<cmInstance>();
  const hastRef = useRef();
  const vfileRef = useRef();
  const [editorHeight, setEditorHeight] = useState(400);
  const [input, setInput] = useState(mdValue);
  // const
  useEffect(() => {
    console.log(input);
  }, [input]);
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
      const { line: curLine, ch: curPos } = cursor; // 获取光标位置
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
  }, [])
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
      debounced(ins.getValue());
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
      <Toolbar onCommand={handleCommand} />
      <div className={styles.mdBody} id="mdBody">
        <div
          className={styles.mdEditor}
          ref={editorRef}
          style={{ maxHeight: `${editorHeight}px` }}
        ></div>
        {/* <div className={styles.mdViewer}></div> */}
        <Preview value={input} style={{ maxHeight: `${editorHeight}px` }}
          onHast={handleHast}
        />
      </div>
    </div>
  );
};

export default Editor;
