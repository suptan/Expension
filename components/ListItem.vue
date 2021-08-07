<template>
  <StyledListItem>
      <slot />
      <CrossOutlined />
  </StyledListItem>
</template>

<script lang="ts">
import { StyledListItem } from "../styled-components/ListItem"

export default {
  components: {
    StyledListItem,
  },
}
</script>
