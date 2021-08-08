<template>
  <StyledPageTitle>
    <slot />
  </StyledPageTitle>
</template>

<script lang="ts">
import { StyledPageTitle } from '../styled-components/PageTitle'

export default {
  components: {
    StyledPageTitle,
  },
}
</script>
