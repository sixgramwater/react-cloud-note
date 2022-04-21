import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { listPageByParentId } from "../../api";
import { useNavigate } from "react-router-dom";
// import { AntTreeNodeProps } from 'antd/lib/tree';

const { DirectoryTree } = Tree;

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children?: DataNode[];
}

export interface IDictTreeProps {
  titleRender?: (nodeData: any) => React.ReactNode;
  onSelect?: (keys: string) => void;
}
const intialData = [
  {
    title: "我的文件夹",
    key: "0",
  },
];
const DictTree: React.FC<IDictTreeProps> = (props) => {
  const navigate = useNavigate();
  const { titleRender, onSelect } = props;
  const rootEntryId = useAppSelector((state) => state.app.rootEntryId);
  const dispatch = useAppDispatch();
  
  const [data, setData] = useState(intialData);
  // console.log(data);
  const handleSelect = (keys: any[]) => {
    if(keys.length === 0)  return;
    const fileId = keys[0] === '0' ? rootEntryId : keys[0];
    navigate(`/${fileId}/`)
    onSelect && onSelect(fileId);
    // console.log(keys);
  }
  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[]
  ): DataNode[] => {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  };

  // 通过key获取应该加载哪个节点下的children
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>((resolve, reject) => {
      let id = key === '0' ? rootEntryId : key;
      listPageByParentId(id).then((value) => {
        // if(value.count !== 0)
        // dispatch({
        //   type: "app/addEntryItem",
        //   payload: value,
        // });
        const { count, entries } = value;
        if(count === 0) {
          resolve();
        }
        const dirList = entries.filter((item: any) => item.dir);
        const nodeList = dirList.map((entry: any) => {
          return {
            title: entry.name,
            key: entry.fileId,
            isLeaf: !entry.dir,
          };
        });
        // console.log(nodeList);
        setTimeout(()=>{
        setData((origin) => updateTreeData(origin, key, nodeList));
          
        },0)
        resolve();
        // setTimeout(()=>{
        //   resolve(); 
        // }, 200)
      });
    });
    // return listPageByParentId(key).then((value) => {
    //   dispatch({
    //     type: "app/addEntryItem",
    //     payload: value,
    //   });
    //   const dirList = value.filter((item: any) => item.dir);
    //   const nodeList = dirList.map((entry: any) => {
    //     return {
    //       title: entry.name,
    //       key: entry.fileId,
    //       isLeaf: !entry.dir,
    //     };
    //   });
    //   setData((origin) => updateTreeData(origin, key, nodeList));
    // });
    // return new Promise<void>(resolve => {
    //   setTimeout(() => {
    //     setData(origin =>
    //       updateTreeData(origin, key, [
    //         { title: 'Child Node', key: `${key}-0` },
    //         { title: 'Child Node', key: `${key}-1` },
    //       ])
    //     )
    //     resolve()
    //   }, 1000)
    // })
  };

  return (
    <Tree
      loadData={onLoadData}
      treeData={data}
      titleRender={titleRender}
      onSelect={handleSelect}
      // blockNode={true}
    />
  );
};

export default DictTree;
