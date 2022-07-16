import styled from '@emotion/styled'
import { editorStyles } from '../../config'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.375rem;
  background-color: white;

  .editor-ltr {
    text-align: left;
  }

  .editor-rtl {
    text-align: right;
  }

  .editor-paragraph {
    margin: 0;
    color: ${editorStyles.color};
    font-family: ${editorStyles.fontFamily};
    font-size: ${editorStyles.fontSize};
    line-height: ${editorStyles.lineHeight};
  }

  .editor-quote {
    margin: 8px 0;
    padding-left: 15px;
    border-left: 5px solid #f0f0f0;
  }

  .editor-h1,
  .editor-h2,
  .editor-h3 {
    font-weight: bold;
    margin: 8px 0;
    padding: 0;
  }

  .editor-h1 {
    font-size: 16pt;
  }

  .editor-h2 {
    font-size: 14pt;
  }

  .editor-h3 {
    font-size: 13pt;
  }

  .editor-ol,
  .editor-ul {
    padding: 0;
    margin: 0;
  }

  .editor-ol1 {
    list-style-position: inside;
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
    content: '•';
    margin-right: 0.5em;
    font-family: monospace;
    vertical-align: middle;
    border-radius: 50px;
  }

  .editor-li-nested {
    margin-left: 20px;
    list-style-type: none;
  }

  .editor-li-nested:after,
  .editor-li-nested:before {
    display: none;
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
    font-family: monospace;
    font-size: 85%;
    background-color: #f0f0f0;
  }
`
