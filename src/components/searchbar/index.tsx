import React, { useState } from 'react';
import styles from './index.module.scss';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import cx from 'classnames';

export interface ISearchbarProps {
  onchange?: (input: string) => void;

}

const Searchbar = () => {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const handleChange = (e: any) => {
    setInput(e.target.value);
  }
  const handleClickClear = () => {
    setInput('');
  }

  const handleFocus = () => {
    setFocused(true);
  }
  const handleBlur = () => {
    setFocused(false);
  }

  const dropdownClass = cx(styles.searchbarDropDown, {
    [styles.show]: focused
  })
  return (
    <div className={styles.searchbar}>
      <i className={styles.searchIcon}>
        <AiOutlineSearch/>
      </i>
      <form>
        <input 
          type="text" 
          className={styles.input} 
          value={input} 
          onChange={handleChange} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="搜索全部笔记"
        />
        <i className={styles.clearIcon} onClick={handleClickClear}>
          <AiFillCloseCircle/>
        </i>
      </form>
      <div className={dropdownClass} >

      </div>
    </div>
  )
}

export default Searchbar;