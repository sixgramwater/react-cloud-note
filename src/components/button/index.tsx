import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

export interface IButtonProps {
  onClick?: () => void;
  type?: 'default' | 'primary',
  height?: number,
  width?: number,
  children?: any
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    onClick,
    type,
    height,
    width,
    children
  } = props;
  const handleClick = () => {
    onClick && onClick();
  }
  const btnClass = cx(styles.btn, {
    [styles.primary]: type === 'primary'
  })
  return (
    <div className={btnClass} onClick={handleClick} style={{height: `${height}px`, width: `${width}px`}}>
      <span>{children}</span>
    </div>
  )
}

export default Button;