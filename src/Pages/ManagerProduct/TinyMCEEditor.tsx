import { Editor } from '@tinymce/tinymce-react';
import React from 'react'
interface TinyMCEEditorProps {
  value: string;
  onChange: (value: string) => void;
}
const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ value, onChange }) => {
  function  handleChangeEditor(content: string) {
        onChange(content)
  }
    
  return (
  <Editor value={value} onEditorChange={handleChangeEditor}/>
  )
}

export default TinyMCEEditor