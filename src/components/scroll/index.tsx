import React, { CSSProperties } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export interface ScrollProps {
  children: React.ReactNode;
  autoHeight?: boolean;
  height?: CSSProperties;
}
const Scroll: React.FC<ScrollProps> = (props) => {
  const {
    children,
    autoHeight=true,
    height
  } = props;
  return (
    <Scrollbars
      // autoHeight
      // autoHeightMax={400}
      // autoHeight={autoHeight}
      height={800}
      // This will activate auto hide
      autoHide
      // Hide delay in ms
      autoHideTimeout={1000}
      // Duration for hide animation in ms.
      autoHideDuration={200}
      
      children={children}
    />
  )
}

export default Scroll