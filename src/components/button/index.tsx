import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';

export interface IButtonProps {
  onClick?: () => void;
  type?: 'default' | 'primary',
  children?: any
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    onClick,
    type,
    children
  } = props;
  const handleClick = () => {
    onClick && onClick();
  }
  const btnClass = cx(styles.btn, {
    [styles.primary]: type === 'primary'
  })
  return (
    <div className={btnClass} onClick={handleClick}>
      <span>{children}</span>
    </div>
  )
}

export default Button;