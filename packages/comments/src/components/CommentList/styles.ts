import styled from '@emotion/styled'

export const Container = styled.div`
  overflow: auto;
  height: calc(100% - 42px);

  > * + * {
    border-top: 1px solid #f0f0f0;
  }
`
