<template>
  <StyledList :listStyle="listStyle"
              @drop="$emit('drop', $event)"
              @dragover.prevent
              @dragenter.prevent
  >
    <slot />
  </StyledList>
</template>

<script lang="ts">
import { StyledList } from "../styled-components/List"

export default {
  props: {
    listStyle: {
      type: String,
      default: 'none',
    },
  },
  components: {
    StyledList,
  },
}
</script>
