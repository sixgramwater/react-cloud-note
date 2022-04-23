import React, { useState } from "react";
import styles from "./index.module.scss";
import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";
import cx from "classnames";
import { entryItem } from "../../store/appSlice";
import { searchFile } from "../../api";

export interface ISearchbarProps {
  onChange?: (input: string) => void;
  onClear?: () => void;
  onSearch?: (list: entryItem[], keywords: string) => void;
  onStartLoading?: () => void;
  onStopLoading?: () => void;
}

const Searchbar: React.FC<ISearchbarProps> = (props) => {
  const { onChange, onClear, onSearch, onStartLoading, onStopLoading } = props;
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const handleChange = (e: any) => {
    setInput(e.target.value);
    onChange && onChange(e.target.value);
  };
  const handleClickClear = () => {
    setInput("");
    onClear && onClear();
  };

  const handleFocus = () => {
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };

  const dropdownClass = cx(styles.searchbarDropDown, {
    [styles.show]: focused,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    onStartLoading && onStartLoading();
    searchFile(input).then(list => {
      console.log(list);
      onSearch && onSearch(list, input);
      onStopLoading && onStopLoading();
    })
    
  }
  return (
    <div className={styles.searchbar}>
      <i className={styles.searchIcon}>
        <AiOutlineSearch />
      </i>
      <form onSubmit={e=>handleSubmit(e)}>
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
          <AiFillCloseCircle />
        </i>
      </form>
      {/* <div className={dropdownClass}></div> */}
    </div>
  );
};

export default Searchbar;
