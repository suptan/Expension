import styled from 'vue-styled-components'

const listItemProps = {
  color: String,
  clickable: Boolean,
}

export const StyledListItem = styled('li', listItemProps)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 0.125rem solid #${(props) => props.color || '4B97F2'};
  color: #${(props) => props.color || '4B97F2'};
  cursor: ${(props) => props.clickable ? 'pointer' : 'auto'};

  &:hover,
  &:focus {
    color: #40a9ff;
    border-bottom-color: #40a9ff;
  }
`
