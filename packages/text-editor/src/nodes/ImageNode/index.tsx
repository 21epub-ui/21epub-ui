import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { mergeRegister } from '@lexical/utils'
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
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
import type { HTMLAttributes } from 'react'
import { Suspense, useCallback, useEffect, useRef } from 'react'

export interface ImagePayload {
  key?: NodeKey
  src: string
  title: string
}

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
    const node = $createImageNode({ src, title })
    return { node }
  }
  return null
}

interface LazyImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  title: string
  imageRef: { current: null | HTMLImageElement }
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  title,
  imageRef,
  ...props
}) => {
  cacheImage(src)

  return (
    <img src={src} alt={title} ref={imageRef} draggable="false" {...props} />
  )
}

interface ImageComponentProps {
  src: string
  title: string
  nodeKey: NodeKey
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  title,
  nodeKey,
}) => {
  const ref = useRef(null)

  const [selected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const [editor] = useLexicalComposerContext()

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (selected && $isNodeSelection($getSelection())) {
        event.preventDefault()

        const node = $getNodeByKey(nodeKey)

        if ($isImageNode(node)) node.remove()

        setSelected(false)
      }
      return false
    },
    [selected, nodeKey, setSelected]
  )

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (event) => {
          if (event.target !== ref.current) return false

          if (!event.shiftKey) clearSelection()
          setSelected(!selected)

          return true
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
  }, [clearSelection, editor, selected, nodeKey, onDelete, setSelected])

  const style = {
    boxShadow: selected ? 'var(--chakra-shadows-outline)' : undefined,
  }

  return (
    <Suspense fallback={null}>
      <LazyImage style={style} src={src} title={title} imageRef={ref} />
    </Suspense>
  )
}

export type SerializedImageNode = Spread<
  {
    title: string
    src: string
    type: 'image'
    version: 1
  },
  SerializedLexicalNode
>

export class ImageNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__title, node.__key)
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { title, src } = serializedNode
    const node = $createImageNode({ src, title })

    return node
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img')
    element.setAttribute('src', this.__src)
    element.setAttribute('alt', this.__title)

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

  constructor(src: string, title: string, key?: NodeKey) {
    super(key)
    this.__src = src
    this.__title = title
  }

  exportJSON(): SerializedImageNode {
    return {
      title: this.getTitle(),
      src: this.getSrc(),
      type: 'image',
      version: 1,
    }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')
    const theme = config.theme
    const className = theme.image
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
        nodeKey={this.getKey()}
      />
    )
  }
}

export const $createImageNode = ({ src, title, key }: ImagePayload) => {
  return new ImageNode(src, title, key)
}

export const $isImageNode = (
  node: LexicalNode | null | undefined
): node is ImageNode => {
  return node instanceof ImageNode
}
