import styled from '@emotion/styled'

interface TextButtonProps {
  disabled?: boolean
}

export const TextButton = styled.button<TextButtonProps>`
  color: #8c8c8c;
  font-size: 12px;
  min-width: max-content;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  :hover {
    color: ${({ disabled }) => (disabled ? '#8c8c8c' : '#1a202c')};
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
