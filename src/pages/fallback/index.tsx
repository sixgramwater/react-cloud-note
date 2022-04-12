import React from 'react';
import styles from './index.module.scss';
import { FcOpenedFolder } from 'react-icons/fc';

const Fallback = () => {
  return (
    <div className={styles.fallback}>
      <i className={styles.icon}>
        <FcOpenedFolder/>

      </i>
    </div>
  )
}

export default Fallback;