<template>
  <StyledMain>
    <Nuxt />
  </StyledMain>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { StyledMain } from '~/styled-components/Main'

export default defineComponent({
  components: { StyledMain }
})
</script>
