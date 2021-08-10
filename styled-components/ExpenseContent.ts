import styled from 'vue-styled-components'

export const StyledExpenseContent = styled.div`
  display: flex;
  height: 100%;

  &> .ant-form {
    display: flex;
    flex-direction: column;
    flex: auto;
    min-height: 0;

    &> .ant-row:last-child {
      display: flex;
      flex-grow: 1;
      align-items: flex-end;

      &> div {
        flex: auto;
      }
    }
  }
`