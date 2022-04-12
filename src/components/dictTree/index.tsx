import React, { useState } from 'react';
import { Tree } from 'antd';
// import { AntTreeNodeProps } from 'antd/lib/tree';

const { DirectoryTree } = Tree;


interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children?: DataNode[];
}

const intialData = [
  {
    title: '我的文件夹',
    key: '0',
  },
];


export interface IDictTreeProps {
  titleRender?: (nodeData: any) => React.ReactNode

}


const DictTree: React.FC<IDictTreeProps> = (props) => {
  const { 
    titleRender
  } = props;
  const [data, setData] = useState(intialData);

  const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] => {
    return list.map(node => {
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
  }

  // 通过key获取应该加载哪个节点下的children
  const onLoadData = ({ key, children }: any) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setData(origin => 
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ])
        )
        resolve()
      }, 1000)
    })
  }

  return (
    <Tree 
      loadData={onLoadData} 
      treeData={data} 
      titleRender={titleRender}
      // blockNode={true}
    />
  )
  
}

export default DictTree;