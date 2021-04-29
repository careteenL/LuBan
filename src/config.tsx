import React from 'react'
import { Button, Input } from 'antd'
import { createConfig } from './packages/Editor.utils'

export const config = createConfig()

config.registryComponent('text', {
  name: '文本',
  preview: () => <span>预览文本</span>,
  render: () => <span>预览文本</span>,
})

config.registryComponent('button', {
  name: '按钮',
  preview: () => <Button type="primary">预览按钮</Button>,
  render: () => <Button type="primary">预览按钮</Button>,
})

config.registryComponent('input', {
  name: '输入框',
  preview: () => <Input />,
  render: () => <Input />,
})
