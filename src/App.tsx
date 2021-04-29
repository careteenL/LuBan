import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { config } from './config'
import { Editor } from './packages/Editor'
import { EditorValue } from './packages/Editor.utils'

function App() {

  const [editorValue, setEditorValue] = useState<EditorValue>({
    container: {
      height: 700,
      width: 1000,
    },
    blocks: [
      {
        componentKey: 'text',
        top: 100,
        left: 100,
        adjustPostion: true,
      },
      {
        componentKey: 'button',
        top: 200,
        left: 200,
        adjustPostion: true,
      },
      {
        componentKey: 'input',
        top: 300,
        left: 300,
        adjustPostion: true,
      },
    ],
  })

  return (
    <div className="app-home">
      <Editor value={editorValue} config={config} onChange={setEditorValue}></Editor>
    </div>
  )
}

export default App
