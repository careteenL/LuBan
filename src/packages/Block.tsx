import React, { CSSProperties, useMemo } from 'react'
import { EditorBlock, EditorConfig } from './Editor.utils'

interface IProps {
  block: EditorBlock,
  config: EditorConfig,
}

export const Block: React.FC<IProps> = (props) => {
  const {
    block,
    config,
  } = props
  const styles: CSSProperties = useMemo(() => {
    return {
      top: `${block.top}px`,
      left: `${block.left}px`,
    }
  }, [block.left, block.top])

  const component = config.componentMap[block.componentKey]
  let render: any
  if (!!component) {
    render = component.render()
  }
  return (
    <div className="editor-block" style={styles}>
      {render}
    </div>
  )
}
