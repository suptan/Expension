<template>
  <StyledHeader>
    <slot />
  </StyledHeader>
</template>

<script lang="ts">
import { StyledHeader } from '../styled-components/Header'

export default {
  components: {
    StyledHeader,
  },
}
</script>
