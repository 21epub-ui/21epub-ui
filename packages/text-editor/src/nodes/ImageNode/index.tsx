import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { mergeRegister } from '@lexical/utils'
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DecoratorNode,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
} from 'lexical'
import type { CSSProperties } from 'react'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import ImageResizer from '../../components/ImageResizer'

export interface ImagePayload {
  key?: NodeKey
  src: string
  title: string
  width?: number
  height?: number
}

type SelectionType = ReturnType<typeof $getSelection>

const imageCache = new Set()

const cacheImage = (src: string) => {
  if (imageCache.has(src)) return

  throw new Promise((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      imageCache.add(src)
      resolve(null)
    }
  })
}

const convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { alt: title, src } = domNode
    const { width, height } = domNode.getBoundingClientRect()
    const node = $createImageNode({
      src,
      title,
      width,
      height,
    })

    return { node }
  }

  return null
}

interface LazyImageProps extends Omit<ImagePayload, 'key'> {
  style: CSSProperties
  imageRef: { current: null | HTMLImageElement }
}

const LazyImage: React.FC<LazyImageProps> = ({
  style,
  src,
  title,
  width,
  height,
  imageRef,
  ...props
}) => {
  cacheImage(src)

  return (
    <img
      ref={imageRef}
      src={src}
      alt={title}
      style={{ width, height, ...style }}
      draggable="false"
      {...props}
    />
  )
}

interface ImageComponentProps extends Omit<ImagePayload, 'key'> {
  nodeKey: NodeKey
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  title,
  width,
  height,
  nodeKey,
}) => {
  const ref = useRef(null)

  const [selection, setSelection] = useState<SelectionType>(null)
  const [isResizing, setIsResizing] = useState(false)

  const [editor] = useLexicalComposerContext()

  const [isSelected, setIsSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        event.preventDefault()

        const node = $getNodeByKey(nodeKey)

        if ($isImageNode(node)) node.remove()

        setIsSelected(false)
      }

      return false
    },
    [isSelected, nodeKey, setIsSelected]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        setSelection(editorState.read(() => $getSelection()))
      }),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (isResizing) return true

          if (event.target === ref.current) {
            if (!event.shiftKey) clearSelection()
            setIsSelected(!isSelected)
            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_DELETE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        onDelete,
        COMMAND_PRIORITY_LOW
      )
    )
  }, [clearSelection, editor, isResizing, isSelected, onDelete, setIsSelected])

  const onDragStart = () => {
    setIsResizing(true)
    editor.getRootElement()?.style.setProperty('user-select', 'none')
  }

  const onResizeEnd = (newWidth: number, newHeight: number) => {
    setTimeout(() => setIsResizing(false))

    editor.getRootElement()?.style.setProperty('user-select', 'text')

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)

      if ($isImageNode(node)) node.setWidthAndHeight(newWidth, newHeight)
    })
  }

  const isFocused = $isNodeSelection(selection) && (isSelected || isResizing)

  const style = {
    outline: isFocused ? '2px solid var(--chakra-colors-gray-600)' : undefined,
  }

  return (
    <Suspense fallback={null}>
      <LazyImage
        style={style}
        src={src}
        title={title}
        width={width}
        height={height}
        imageRef={ref}
      />
      {isFocused && (
        <ImageResizer
          maxWidth={innerWidth}
          maxHeight={innerHeight}
          imageRef={ref}
          onResizeStart={onDragStart}
          onResizeEnd={onResizeEnd}
        />
      )}
    </Suspense>
  )
}

export type SerializedImageNode = Spread<
  Omit<ImagePayload, 'key'> & {
    type: 'image'
    version: 1
  },
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
  declare __src: string
  declare __title: string
  declare __width?: number
  declare __height?: number

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__title,
      node.__width,
      node.__height,
      node.__key
    )
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, title, width, height } = serializedNode
    const node = $createImageNode({ src, title, width, height })

    return node
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = this.createDOM(editor._config)

    const image = document.createElement('img')
    image.setAttribute('src', this.__src)
    image.setAttribute('alt', this.__title)
    image.style.setProperty('width', `${this.__width}px`)
    image.style.setProperty('height', `${this.__height}px`)

    element.appendChild(image)

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    }
  }

  constructor(
    src: string,
    title: string,
    width?: number,
    height?: number,
    key?: NodeKey
  ) {
    super(key)
    this.__src = src
    this.__title = title
    this.__width = width
    this.__height = height
  }

  exportJSON(): SerializedImageNode {
    return {
      title: this.getTitle(),
      src: this.getSrc(),
      width: this.__width,
      height: this.__height,
      type: 'image',
      version: 1,
    }
  }

  setWidthAndHeight(width: number, height: number): void {
    const writable = this.getWritable()
    writable.__width = width
    writable.__height = height
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')
    const className = config.theme.image

    if (className !== undefined) {
      span.className = className
    }

    return span
  }

  updateDOM(): false {
    return false
  }

  getSrc(): string {
    return this.__src
  }

  getTitle(): string {
    return this.__title
  }

  decorate(): JSX.Element {
    return (
      <ImageComponent
        src={this.__src}
        title={this.__title}
        width={this.__width}
        height={this.__height}
        nodeKey={this.getKey()}
      />
    )
  }
}

export const $createImageNode = ({
  src,
  title,
  width,
  height,
  key,
}: ImagePayload) => {
  return new ImageNode(src, title, width, height, key)
}

export const $isImageNode = (
  node: LexicalNode | null | undefined
): node is ImageNode => {
  return node instanceof ImageNode
}
