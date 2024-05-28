<template>
  <div class="modal">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-modal">
        <img src="../assets/close.svg" alt="Close button" />
      </button>
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

<style scoped>
.modal {
  padding: 20px;
  border-radius: 20px;
}
.modal-content {
  position: relative;
}
.close-modal {
  cursor: pointer;
  border-radius: 100%;
  border: none;
  background-color: #ebeef3;
  height: 24px;
  width: 24px;
  position: absolute;
  top: 0;
  right: 0;
}
.close-modal img {
  width: 12px;
  height: 12px;
}
</style>
