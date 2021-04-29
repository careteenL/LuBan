import React, { useState } from 'react'
import { config } from './config'
import { Editor } from './packages/Editor'
import { EditorValue } from './packages/Editor.utils'

function App() {

  const [editorValue, setEditorValue] = useState<EditorValue>({
    container: {
      height: 700,
      width: 1000,
    },
    blocks: [],
  })

  return (
    <div className="app-home">
      <Editor value={editorValue} config={config} onChange={setEditorValue}></Editor>
    </div>
  )
}

export default App
