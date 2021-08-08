import styled from 'vue-styled-components'

type ListProps = {
  listStyle?: string
}

const listProps = {
  listStyle: String,
}

export const StyledList = styled('ul', listProps)`
  list-style: ${(props: ListProps) => (props.listStyle || 'none')};
`