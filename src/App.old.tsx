import React, { useRef, useState } from 'react'
import { useCallbackRef } from './packages/hook/useCallbackRef'

function App() {
  const [pos, setPos] = useState({
    top: 0,
    left: 0,
  })

  const posRef = useRef(pos)
  posRef.current = pos

  const moveDraggier = (() => {
    const dragData = useRef({
      startTop: 0,
      startLeft: 0,
      startX: 0,
      startY: 0,
    })
    const mousedown = useCallbackRef((e: React.MouseEvent<HTMLElement>) => {
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      dragData.current = {
        startLeft: pos.left,
        startTop: pos.top,
        startX: e.clientX,
        startY: e.clientY,
      }
    })
    const mousemove = useCallbackRef((e: MouseEvent) => {
      // console.log(JSON.stringify(pos))
      console.log({
        pos: `${pos.left}_${pos.top}`,
        // ref: `${posRef.current.left}_${posRef.current.top}`,
      })
      const {
        startLeft,
        startTop,
        startX,
        startY,
      } = dragData.current
      const durX = e.clientX - startX
      const durY = e.clientY - startY
      setPos({
        top: startTop + durY,
        left: startLeft + durX,
      })
    })
    const mouseup = useCallbackRef((e: MouseEvent) => {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    })
    return {
      mousedown,
    }
  })()

  return (
    <div className="app-home">
      <div style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'green',
        position: 'relative',
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        display: 'inline-block',
        color: '#fff',
        fontSize: '18px',
        cursor: 'move',
      }}
      onMouseDown={moveDraggier.mousedown}
      >
        快拖拽我
      </div>
    </div>
  )
}

export default App
