import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { Dropdown } from "antd";

export default function MdEditor() {
  const [value, setValue] = React.useState<string | undefined>("**Hello world!!!**");
  const handleChange = (value: string | undefined) => {
    setValue(value);
  }
  return (
    <div className="container">
      {/* <MDEditor
        value={value}
        onChange={handleChange}
      />
      <MDEditor.Markdown source={value} /> */}
    </div>
  );
}