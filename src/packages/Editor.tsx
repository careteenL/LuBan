import React, { CSSProperties, useMemo, useRef } from 'react'
import { Block } from './Block'
import { createBlock, EditorBlock, EditorCompoent, EditorConfig, EditorValue } from './Editor.utils'
import { useCallbackRef } from './hook/useCallbackRef'
import './Editor.scss'

interface IProps {
  value: EditorValue,
  config: EditorConfig,
  onChange: (value: EditorValue) => void,
}

export const Editor: React.FC<IProps> = (props) => {
  const {
    config,
    value,
    onChange,
  } = props

  const containerRef = useRef({} as HTMLDivElement)

  const containerStyles: CSSProperties = useMemo(() => {
    return {
      width: value.container.width,
      height: value.container.height,
    }
  }, [value.container.height, value.container.width])

  const focusData = useMemo(() => {
    const focus: EditorBlock[] = []
    const unFocus: EditorBlock[] = []
    value.blocks.forEach(block => {
      (block.focus ? focus : unFocus).push(block)
    })
    return {
      focus,
      unFocus,
    }
  }, [value.blocks])

  const methods = {
    updateBlocks: (blocks: EditorBlock[]) => {
      onChange({
        ...value,
        blocks: [
          ...blocks,
        ],
      })
    },
    clearFocus: (external?: EditorBlock) => {
      (!!external ? focusData.focus.filter((item: EditorBlock) => item !== external) : focusData.focus).forEach((block: EditorBlock) => {
        block.focus = false
      })
      methods.updateBlocks(value.blocks)
    }
  }

  const menuDraggier = (() => {
    const dragData = useRef({
      dragComponent: null as null | EditorCompoent,
    })
    const container = {
      dragenter: useCallbackRef((e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'move'
      }),
      dragover: useCallbackRef((e: DragEvent) => {
        e.preventDefault()
      }),
      dragleave: useCallbackRef((e: DragEvent) => {
        e.dataTransfer!.dropEffect = 'none'
      }),
      drop: useCallbackRef((e: DragEvent) => {
        onChange({
          ...value,
          blocks: [
            ...value.blocks,
            createBlock({
              top: e.offsetY,
              left: e.offsetX,
              component: dragData.current.dragComponent!,
            })
          ]
        })
      }),
    }
    const block = {
      dragStart: useCallbackRef((e: React.DragEvent<HTMLDivElement>, dragComponent: EditorCompoent) => {
        containerRef.current.addEventListener('dragenter', container.dragenter)
        containerRef.current.addEventListener('dragover', container.dragover)
        containerRef.current.addEventListener('dragleave', container.dragleave)
        containerRef.current.addEventListener('drop', container.drop)
        dragData.current.dragComponent = dragComponent
      }),
      dragEnd: useCallbackRef((e: React.DragEvent<HTMLDivElement>) => {
        containerRef.current.removeEventListener('dragenter', container.dragenter)
        containerRef.current.removeEventListener('dragover', container.dragover)
        containerRef.current.removeEventListener('dragleave', container.dragleave)
        containerRef.current.removeEventListener('drop', container.drop)
      }),
    }
    return block
  })()

  const focusHandler = (() => {
    const block = (e: React.MouseEvent<HTMLDivElement>, currentBlock: EditorBlock) => {
      if (e.shiftKey) {
        if (focusData.focus.length <= 1) {
          currentBlock.focus = true
        } else {
          currentBlock.focus = !currentBlock.focus
        }
        methods.updateBlocks(value.blocks)
      } else {
        if (!currentBlock.focus) {
          currentBlock.focus = true
          methods.clearFocus(currentBlock)
        }
      }
    }
    const container = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return
      if (!e.shiftKey) {
        methods.clearFocus()
      }
    }

    return {
      block,
      container,
    }
  })()

  return (
    <div className="editor">
      <div className="editor-menu">
        {config.componentArray.map((component, index) => (
          <div 
            className="editor-menu-item" 
            key={index}
            draggable
            onDragStart={e => menuDraggier.dragStart(e, component)}
            onDragEnd={menuDraggier.dragEnd}
          >
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
        <div 
          className="editor-container" 
          style={containerStyles} 
          ref={containerRef}
          onMouseDown={focusHandler.container}
        >
          {value.blocks.map((block, index) => (
            <Block 
              key={index}
              block={block}
              config={config}
              onMouseDown={e => focusHandler.block(e, block)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}