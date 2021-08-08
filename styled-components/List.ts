import styled from 'vue-styled-components'

type ListProps = {
  listStyle?: string
  width?: string
}

const listProps = {
  listStyle: String,
  width: String
}

export const StyledList = styled('ul', listProps)`
  list-style: ${(props: ListProps) => (props.listStyle || 'none')};
  width: ${(props: ListProps) => (props.width || 'auto')};
`