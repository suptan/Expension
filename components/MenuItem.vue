<template>
  <StyledMenuItem :class="active ? 'active' : null" @click="$emit('click')">
    <slot />
  </StyledMenuItem>
</template>

<script lang="ts">
import { StyledMenuItem } from '../styled-components/MenuItem'

export default {
  components: {
    StyledMenuItem,
  },
  props: {
    active: {
      type: Boolean,
    }
  }
}
</script>
