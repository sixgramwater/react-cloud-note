import React, { CSSProperties, useEffect, useLayoutEffect, useState, useRef } from 'react'
import cx from 'classnames';
import styles from './index.module.scss';
import { getProcessor } from './process';
import './preview.scss';
import type H from 'highlight.js';
// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'github-markdown-css';
import type { Plugin } from 'unified'
// import 'highlight.js/styles/github.css';


export interface PreviewProps {
  value: string;
  style?: CSSProperties;
  onHast?: (tree: any, file: any) => void;
}
hljs.registerLanguage('javascript', javascript);

const Preview: React.FC<PreviewProps> = (props) => {
  const { value, style, onHast } = props;
  // const [parsedStr, setParsedStr] = useState('');
  const preRef = useRef<HTMLDivElement>(null);
  const hljsRef = useRef<typeof H>();
  
  const dispatchPlugin: Plugin = () => (tree, file) => {
    onHast && onHast(tree, file);
  }

  const processer = getProcessor({
    plugins: [
      {
        rehype: (p) => p.use(dispatchPlugin)
      }
    ]
  });
  const file = processer.processSync(value);
  const html = String(file);
  // const fileRef = useRef(null);
  // useEffect(() => {
  //   const processer = getProcessor();
  //   const file = processer.processSync(value);
    
  //   setParsedStr(String(file));
  // }, [value]);

  useLayoutEffect(() => {
    if(!preRef.current)  return;
    // console.log('trigger')
    const els = preRef.current.querySelectorAll<HTMLElement>('pre>code');
    if(els.length === 0)  return;
    // if(!hljsRef.current) {
    //   import('highlight.js').then(hljs => {
    //     hljsRef.current = hljs.default;
    //     els.forEach(el => {
    //       hljsRef.current?.highlightElement(el)
    //     })
    //   })
    // } else {
    //   els.forEach(el => {
    //     hljsRef.current?.highlightElement(el)
    //   })
    // }
    
    els.forEach(el => {
      // console.log(el);
      // setTimeout(()=>{
      //   // hljs.highlightElement(el)
      // }, 500)
      hljs.highlightElement(el)
    })

  }, [value])
  return (
    // <div className={styles.mdPreview} style={style} >
    <div className={cx(styles.mdContent, 'markdown-body')} ref={preRef} dangerouslySetInnerHTML={{__html: `${html}`}}></div>
    // </div>
  )
}

export default Preview;