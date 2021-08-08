import styled from 'vue-styled-components'

const listItemProps = {
  color: String,
}

export const StyledListItem = styled('li', listItemProps)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 0.125rem solid #${(props) => props.color || '4B97F2'};
  color: #${(props) => props.color || '4B97F2'};
`
