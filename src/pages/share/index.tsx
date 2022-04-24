import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { positionValues } from "react-custom-scrollbars";
import { useParams } from "react-router-dom";
import { fetchEntryById, syncFileDownload } from "../../api";
import Preview from "../../components/editor/previewer";
import Toc from "../../components/editor/toc";
import Scroll from "../../components/scroll";
import { findStartIndex, throttleByTimestamp } from "../../utils";
import styles from "./index.module.scss";

const SharePage = () => {
  const { fileId } = useParams();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const hastRef = useRef<any>();
  const [hast, setHast] = useState();
  const previewRef = useRef<HTMLDivElement>(null);
  const previewPos = useRef<number[]>([]);
  const [curBlockIndex, setCurBlockIndex] = useState(0);
  const [tocLeft, setTocLeft] = useState(0);
  useEffect(() => {
    if (!fileId) return;
    fetchEntryById(fileId).then((value) => {
      const { name } = value;
      setTitle(name);
      // console.log(value);
    });
  }, [fileId]);

  useEffect(() => {
    if (!fileId) return;
    syncFileDownload(fileId).then((value) => {
      // const { bodyString } = value;
      // console.log(bodyString);
      setText(value);
    });
  }, [fileId]);

  useLayoutEffect(() => {
    setTimeout(() => {
      updateBlockPosition();
    }, 100);
  }, [text]);

  // const memoHast = useMemo(()=>hastRef.current, [hastRef.current]);
  useEffect(() => {
    if (!previewRef.current) return;
    document.addEventListener("scroll", handlePreviewScroll, {
      passive: true,
    });
  }, []);

  useLayoutEffect(() => {
    if (!previewRef.current) return;
    const { width, left, right } = previewRef.current.getBoundingClientRect();
    setTocLeft(width + left + 40);
  }, []);
  const updateBlockPosition = () => {
    // console.log('update ')
    if (!previewRef.current) return;
    // debugger
    previewPos.current = [];
    const body = previewRef.current.childNodes[0];
    if (!(body instanceof HTMLElement)) return;
    const rightNodes = [...(body.childNodes as any)].filter(
      (v: any) => v instanceof HTMLElement
    );
    for (let i = 0; i < rightNodes.length; i++) {
      const rightNode = rightNodes[i];
      const right = rightNode.offsetTop / previewRef.current.scrollHeight;
      // const right =
      //   (rightNode.offsetTop - body.offsetTop) /
      //   (previewRef.current.scrollHeight - previewRef.current.clientHeight);

      if (right >= 1) {
        break;
      }
      previewPos.current.push(right);
    }
    previewPos.current.push(1);
    // console.log(previewPos.current)
  };

  const handleClick = useCallback((index: number) => {
    if (!previewRef.current) return;
    const headings = previewRef.current.querySelectorAll("h1,h2,h3,h4,h5,h6");
    headings[index].scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  const handleScroll = throttleByTimestamp((value: positionValues) => {
    if (!previewPos.current || !previewRef.current) return;
    const curBlockIndex = findStartIndex(value.top, previewPos.current);
    setCurBlockIndex(curBlockIndex);
    // console.log(value);
  }, 100);
  const handlePreviewScroll = throttleByTimestamp(() => {
    if (!previewPos.current || !previewRef.current) return;
    // updateBlockPosition();
    // debugger
    const curBlockIndex = findStartIndex(
      document.documentElement.scrollTop / previewRef.current.scrollHeight,
      previewPos.current
    );
    // const curBlockIndex = findStartIndex(
    //   previewRef.current.scrollTop /
    //     (previewRef.current.scrollHeight),
    //   previewPos.current
    // );
    // console.log(curBlockIndex);
    setCurBlockIndex(curBlockIndex);
  }, 100);

  const handleHast = useCallback((tree: any, file: any) => {
    // if()
    // hastRef.current = tree;
    // console.log(tree);
    setTimeout(() => {
      setHast(tree);
    }, 0);
    // console.log()
  }, []);

  return (
    <div className={styles.sharePage}>
      <div className={styles.bg}></div>
      <div className={styles.pageHeader}>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.pageContent}>
        <Scroll onScroll={handleScroll}>
          <div className={styles.mainContainer}>
            <div className={styles.pageContentContainer}>
              {/* <Scroll> */}
              <div className={styles.preview} ref={previewRef}>
                <Preview value={text} onHast={handleHast} />
              </div>
              {/* </Scroll> */}
            </div>
            <div className={styles.asideContainer}>
              <div className={styles.tocContainer}>
                <Toc
                  hast={hast}
                  currentBlockIndex={curBlockIndex}
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
        </Scroll>
      </div>
      <div className={styles.pageFooter}></div>
    </div>
  );
};

export default SharePage;
