import React from "react";
import styles from "./index.module.scss";
import { FcOpenedFolder } from "react-icons/fc";
import cx from "classnames";

export interface FallbackProps {
  // icon?: React.ReactElement;
  children?: React.ReactElement;
  color?: string;
  hasBorder?: boolean;
}
const Fallback: React.FC<FallbackProps> = (props) => {
  const { children, color, hasBorder = false } = props;
  const fallbackClass = cx(styles.fallback, {
    [styles.hasBorder]: hasBorder,
  });
  return (
    <div className={fallbackClass}>
      <i className={styles.icon} style={color ? { color } : {}}>
        {children ?? <FcOpenedFolder />}
      </i>
    </div>
  );
};

export default Fallback;
