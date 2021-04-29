import React, { CSSProperties, useMemo } from 'react'
import { Block } from './Block'
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
    value,
  } = props

  const containerStyles: CSSProperties = useMemo(() => {
    return {
      width: value.container.width,
      height: value.container.height,
    }
  }, [value.container.height, value.container.width])

  return (
    <div className="editor">
      <div className="editor-menu">
        {config.componentArray.map((component, index) => (
          <div className="editor-menu-item" key={index}>
            <div className="editor-menu-item-name">
              {component.name}
            </div>
            {component.preview()}
          </div>
        ))}
      </div>
      <div className="editor-head">head</div>
      <div className="editor-operator">operator</div>
      <div className="editor-body">
        <div className="editor-container" style={containerStyles}>
          {value.blocks.map((block, index) => (
            <Block 
              key={index}
              block={block}
              config={config}
            />
          ))}
        </div>
      </div>
    </div>
  )
}