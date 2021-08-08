<template>
  <StyledMenu>
    <slot />
  </StyledMenu>
</template>

<script lang="ts">
import { StyledMenu } from '../styled-components/Menu'

export default {
  components: {
    StyledMenu,
  },
}
</script>
