<template>
  <StyledListItem><slot /></StyledListItem>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { StyledListItem } from "../styled-components/ListItem"

export default {
  props: {
    close: {
      type: Function as PropType<() => void>,
    },
    removeable: Boolean,
  },
  components: {
    StyledListItem,
  },
}
</script>
