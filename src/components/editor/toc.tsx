import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import cx from "classnames";

export interface ITocProps {
  hast: any;
  onClick?: (index: number) => void;
  currentBlockIndex: number;
}

const Toc: React.FC<ITocProps> = (props) => {
  const { hast, onClick, currentBlockIndex } = props;
  const [items, setItems] = useState<any>([]);
  const itemsRef = useRef<any[]>([]);
  const [minLevel, setMinLevel] = useState(6);
  const [curHeadingIndex, setCurHeadingIndex] = useState(0);
  // const minLevelRef = useRef<number>(6);
  // const [minLevel, setMinLevel]
  // const [curHeadingIndex]
  // console.log(currentBlockIndex);
  const stringfyNode = (node: any) => {
    return node.children[0].value;
  };

  const activeClass = (index: number) =>
    cx(styles.tocItem, {
      [styles.active]: index === curHeadingIndex,
    });
  
  const handleClick = (index: number) => {
    onClick && onClick(index);
  }
  useEffect(() => {
    if (!hast) return;
    const items: any = [];
    let minLevelTemp = 6;
    hast.children
      .filter((v: any) => v.type === "element")
      .forEach((node: any, index: number) => {
        if (node.tagName[0] === "h" && !!node.children.length) {
          const i = node.tagName[1];
          minLevelTemp = Math.min(minLevelTemp, i);
          // setTimeout(() => setMinLevel(minLevelTemp), 10);
          // console.log(node)
          items.push({
            level: i,
            text: stringfyNode(node),
            // text: typeof node.value === 'string' ? node.value : 'unkonwn',
          });
          if (currentBlockIndex >= index) {
            setCurHeadingIndex(items.length - 1);
          }
        }
      });
    setMinLevel(minLevelTemp);
    setItems(items);
    // console.log(itemsRef.current);

    // console.log(hast)
  }, [hast, currentBlockIndex]);

  return (
    <div className={styles.toc}>
      <ul>
        {items.map((item: any, index: any) => (
          <li
            className={activeClass(index)}
            onClick={()=>handleClick(index)}
            key={index}
            style={{ paddingLeft: `${(item.level - minLevel) * 16 + 8}px` }}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toc;
