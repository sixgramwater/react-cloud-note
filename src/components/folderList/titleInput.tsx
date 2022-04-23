import React, { forwardRef, useRef, useState } from 'react';
import styles from './index.module.scss';

export interface ITitleInputProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  defaultValue?: string;
}

const TitleInput: React.FC<ITitleInputProps> = (props) => {
  const {
    onChange,
    onBlur,
    defaultValue,
  } = props;

  const [input, setInput] = useState(defaultValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: any) => {
    setInput(e.target.value);
    onChange && onChange(e.target.value);
  }
  const handleBlur = () => {
    onBlur && onBlur(input);
  }

  const handleFocus = () => {
    
  }

  return (
    <div className={styles.titleContainer}>
      <form className={styles.inputForm}>
        <input 
          type="text" 
          style={{
            outline: 'none',
            // border: '0',
          }}
          // value={input} 
          className={styles.input}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          defaultValue={defaultValue}
          ref={inputRef}
          autoFocus
        />
      </form>
    </div>
  )
}

export default TitleInput;

