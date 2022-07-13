import styled from '@emotion/styled'

export const TextButton = styled.button`
  color: #8c8c8c;
  font-size: 12px;
  min-width: max-content;

  :hover {
    color: #1a202c;
  }
`

export const Actions = styled.div`
  display: flex;
  flex: 1;

  & > :first-of-type {
    margin-left: auto;
  }

  & > * + * {
    margin-left: 8px;
  }
`
