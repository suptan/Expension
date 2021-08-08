<template>
  <StyledListItem :draggable="draggable"
                  :color="color"
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
  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    }
  }
}
</script>
