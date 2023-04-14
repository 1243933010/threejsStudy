<template>
  <div>111</div>
</template>

<script lang="ts">
import { h, ref } from "vue";

export default {
  name: 'MyRenderComponent',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  render() {
    return h('div', `Hello ${this.message}`)
  }
}

</script>