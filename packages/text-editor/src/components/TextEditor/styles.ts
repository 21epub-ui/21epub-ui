import styled from '@emotion/styled'
import { editorStyles, editorTypefaces } from '../../config'

export const Editor = styled.div`
  height: 100%;
  outline: none;
  color: ${editorStyles.color};
  font-family: ${editorStyles.fontFamily};
  font-size: ${editorStyles.fontSize};
  line-height: ${editorStyles.lineHeight};

  hr {
    color: #999;
    margin: 12px 0;
  }

  .editor-ltr {
    text-align: left;
  }

  .editor-rtl {
    text-align: right;
  }

  .editor-paragraph {
    margin: 0;
  }

  .editor-quote {
    margin: 8px 0;
    padding-left: 15px;
    border-left: 5px solid #f0f0f0;
  }

  .editor-image {
    display: inline-block;
    position: relative;
  }

  .editor-h1,
  .editor-h2,
  .editor-h3 {
    font-weight: bold;
    margin: 8px 0;
    padding: 0;
  }

  .editor-h1 * {
    font-size: 16pt !important;
  }

  .editor-h2 * {
    font-size: 14pt !important;
  }

  .editor-h3 * {
    font-size: 13pt !important;
  }

  .editor-ol,
  .editor-ul {
    padding: 0;
    margin: 0;
  }

  .editor-ol {
    list-style-position: inside;
  }

  .editor-ol1 {
    list-style-type: decimal;
  }

  .editor-ol2 {
    list-style-type: lower-alpha;
  }

  .editor-ol3 {
    list-style-type: lower-roman;
  }

  .editor-ul {
    list-style-type: none;
  }

  .editor-ul > .editor-li::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    border-radius: 50px;
    width: 0.25em;
    height: 0.25em;
    margin: 0 0.375em;
    background-color: currentColor;
  }

  .editor-li-nested {
    margin-left: 20px;
    list-style-type: none;
  }

  .editor-li-nested:after,
  .editor-li-nested:before {
    display: none !important;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underline-strikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    padding: 2px 4px;
    font-family: ${editorTypefaces.monospace};
    font-size: 85%;
    background-color: #f0f0f0;
  }
`
