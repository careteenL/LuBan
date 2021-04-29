import React from 'react'
import './Editor.scss'
import { EditorConfig, EditorValue } from './Editor.utils'

interface IProps {
  value: EditorValue,
  config: EditorConfig,
  onChange: (value: EditorValue) => void,
}

export const Editor: React.FC<IProps> = (props) => {
  const {
    config,
  } = props
  return (
    <div className="editor">
      <div className="editor-menu">
        {config.componentArray.map((component, index) => (
          <div className="editor-menu_item" key={index}>
            <div className="editor-menu_item--name">
              {component.name}
            </div>
            {component.preview()}
          </div>
        ))}
      </div>
      <div className="editor-head">head</div>
      <div className="editor-operator">operator</div>
      <div className="editor-body">body</div>
    </div>
  )
}