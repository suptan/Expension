<template>
  <StyledList :list-style="listStyle"
              :width="width"
              @drop="$emit('drop', $event)"
              @dragover.prevent
              @dragenter.prevent
  >
    <slot />
  </StyledList>
</template>

<script lang="ts">
import { StyledList } from '../styled-components/List'

export default {
  components: {
    StyledList,
  },
  props: {
    listStyle: {
      type: String,
      default: 'none',
    },
    width: {
      type: String,
      default: undefined,
    },
  },
}
</script>
