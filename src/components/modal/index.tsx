import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { AiOutlineClose } from "react-icons/ai";
import styles from './index.module.scss';

// export interface IModalProps {

//   // children?: React.ReactNode;

// }

export interface IPortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<IPortalProps> = (props) => {
  const { children } = props;
  let containerRef = useRef<HTMLDivElement | null>(null);
  if(!containerRef.current) {
    containerRef.current = document.createElement('div');
    const rootContainer = document.getElementById('root');
    rootContainer?.appendChild(containerRef.current);
    // document.body.appendChild(containerRef.current);
  }
  useEffect(() => {
    return () => {
      if(containerRef.current) {
        const rootContainer = document.getElementById('root');
        rootContainer?.removeChild(containerRef.current);
        // document.body.removeChild(containerRef.current);
      }
    }
  }, [])
  return ReactDOM.createPortal(children, containerRef.current)
}

export interface IModalProps {
  visible: boolean;
  onOk?: () => void;
  onCancal?: () => void;
  onClose?: () => void;
  title?: string;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  width?: number;
  children: any
}

const Modal: React.FC<IModalProps> = (props) => {
  const {
    visible,
    title,
    children,
  } = props;
  // const [show, setShow] = useState(false);
  return (
    <Portal>
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.title}>个人信息</span>
          <div className={styles.closeIcon}>
            <i className={styles.icon}>
              <AiOutlineClose/>
            </i>
          </div>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>

        </div>
      </div>
      {/* <div className={styles.mask}></div> */}
    </div>
    </Portal>
  )
}

export default Modal;