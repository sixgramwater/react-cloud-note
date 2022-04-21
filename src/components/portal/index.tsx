import * as ReactDOM from 'react-dom';
import { useRef, useEffect } from "react";

export interface PortalProps {
  children?: React.ReactNode;
}
const Portal: React.FC<PortalProps> = (props) => {
  const { children } = props;
  let containerRef = useRef<HTMLDivElement | null>(null);
  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    // 将 container 节点添加到 document.body
    document.body.appendChild(containerRef.current);
  }
  // 当组件销毁时，移除 container 节点
  useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);
  return ReactDOM.createPortal(children, containerRef.current)
}

export default Portal;