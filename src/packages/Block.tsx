import classNames from 'classnames'
import React, { CSSProperties, useEffect, useMemo, useRef } from 'react'
import { EditorBlock, EditorConfig } from './Editor.utils'
import { useUpdate } from './hook/useUpdate'

interface IProps {
  block: EditorBlock,
  config: EditorConfig,
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export const Block: React.FC<IProps> = (props) => {
  const {
    block,
    config,
    onMouseDown,
  } = props

  const { forceUpdate } = useUpdate()

  const elRef = useRef({} as HTMLDivElement)

  useEffect(() => {
    if (block.adjustPostion) {
      const { height, width } = elRef.current.getBoundingClientRect()
      block.adjustPostion = false
      block.top = block.top - height / 2
      block.left = block.left - width / 2
      forceUpdate()
    }
  }, [])

  const styles: CSSProperties = useMemo(() => {
    return {
      top: `${block.top}px`,
      left: `${block.left}px`,
      opacity: block.adjustPostion ? '0' : ''
    }
  }, [block.left, block.top, block.adjustPostion])

  const classes = useMemo(() => {
    return classNames([
      'editor-block', {
        'editor-block-focus': block.focus,
      },
    ])
  }, [block.focus])

  const component = config.componentMap[block.componentKey]
  let render: any
  if (!!component) {
    render = component.render()
  }
  return (
    <div 
      className={classes}
      style={styles} 
      ref={elRef}
      onMouseDown={onMouseDown}
    >
      {render}
    </div>
  )
}
