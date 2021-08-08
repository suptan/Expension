<template>
  <StyledListItem draggable
                  @dragstart="$emit('dragstart', $event)"
                  @dragenter="$emit('dragenter', $event)"
                  @click="$emit('click')"
  >
    <slot />
  </StyledListItem>
</template>

<script lang="ts">
import { StyledListItem } from '../styled-components/ListItem'

export default {
  components: {
    StyledListItem,
  },
}
</script>
