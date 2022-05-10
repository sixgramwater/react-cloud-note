import React from "react";
import styles from "./index.module.scss";
import cx from "classnames";
import DotLoader from "../loader";

export interface IButtonProps {
  onClick?: () => void;
  type?: "default" | "primary";
  height?: number;
  width?: number;
  children?: any;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { onClick, type, height, width, children, className, loading=false } = props;
  const handleClick = () => {
    onClick && onClick();
  };
  const btnClass = cx(styles.btn, className, {
    [styles.primary]: type === "primary",
  });
  return (
    <div
      className={btnClass}
      onClick={handleClick}
      style={{ height: `${height}px`, width: `${width}px` }}
    >
    {loading ? <div className={styles.buttonLoading}><DotLoader height="32px" size="16px"/></div> : <span>{children}</span>}
    </div>
  );
};

export default Button;
