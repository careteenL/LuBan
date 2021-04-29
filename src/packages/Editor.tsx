import React from 'react'
import './Editor.scss'

export const Editor: React.FC<{}> = () => {
  return (
    <div className="editor">
      <div className="editor-menu">menu</div>
      <div className="editor-head">head</div>
      <div className="editor-operator">operator</div>
      <div className="editor-body">body</div>
    </div>
  )
}