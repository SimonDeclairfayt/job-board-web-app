<template>
  <div class="modal">
    <div class="modal-content">
      <button @click="$emit('close')">Close</button>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: Boolean,
  },
};
</script>
