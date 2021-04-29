// 容器内每个元素的数据类型
export interface EditorBlock {
  componentKey: string,
  top: number,
  left: number,
}

// 编辑器编辑的数据类型
export interface EditorValue {
  container: {
    width: number,
    height: number,
  },
  blocks: EditorBlock[],
}

// 编辑器中预定义组件的类型
export interface EditorCompoent {
  key: string,
  name: string,
  preview: () => JSX.Element,
  render: () => JSX.Element,
}

// 创建编辑器预设配置对象
export function createConfig() {
  const componentMap: {
    [key: string]: EditorCompoent,
  } = {}
  const componentArray: EditorCompoent[] = []

  function registryComponent(key: string, option: Omit<EditorCompoent, 'key'>) {
    if (componentMap[key]) {
      const index = componentArray.indexOf(componentMap[key])
      componentArray.splice(index, 1)
    }
    const newComponent = {
      key,
      ...option,
    }
    componentArray.push(newComponent)
    componentMap[key] = newComponent
  }

  return {
    componentMap,
    componentArray,
    registryComponent,
  }
}

export type EditorConfig = ReturnType<typeof createConfig>

interface CreateBlock {
  top: number,
  left: number,
  component: EditorCompoent,
}

export function createBlock({
  top,
  left,
  component,
}: CreateBlock): EditorBlock {
  return {
    top,
    left,
    componentKey: component.key,
  }
}
