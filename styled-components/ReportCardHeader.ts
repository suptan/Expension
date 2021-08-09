import styled from 'vue-styled-components'

const reportCardHeaderProps = {
  color: String,
}

export const StyledReportCardHeader = styled('div', reportCardHeaderProps)`
  display: inline-flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem 0;
  border-bottom: 0.375rem solid #${props => props.color || '4B97F2'};
  color: #${(props) => props.color || '4B97F2'};

  & span:last-child {
    font-size: 1.5rem;
  }
`