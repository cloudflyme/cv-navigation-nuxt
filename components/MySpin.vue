<template>
  <div class="my-spin">
    <span class="my-spin-dot">
      <i class="my-spin-dot-item" />
      <i class="my-spin-dot-item" />
      <i class="my-spin-dot-item" />
      <i class="my-spin-dot-item" />
    </span>
    <div v-if="tip" class="my-spin-text">{{ tip }}</div>
  </div>
</template>

<script setup>
defineProps(['tip'])
</script>

<style lang="less" scoped>
@keyframes antSpinMove {
  100% {
    opacity: 1;
  }
}
@keyframes antRotate {
  100% {
    transform: rotate(405deg);
  }
}
.my-spin {
  font-size: 14px;
  display: inline-block;
  text-align: center;
  &-dot {
    display: inline-block;
    font-size: 20px;
    width: 1em;
    height: 1em;
    position: relative;
    transform: rotate(45deg);
    animation: antRotate 1.2s infinite linear;
  }
  &-dot-item {
    position: absolute;
    width: 9px;
    height: 9px;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
    transform-origin: 50% 50%;
    opacity: 0.3;
    animation: antSpinMove 1s infinite linear alternate;
  }
  &-dot-item:nth-child(1) {
    top: 0;
    left: 0;
  }
  &-dot-item:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: 0.4s;
  }
  &-dot-item:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
  }
  &-dot-item:nth-child(4) {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
  }
  &-text {
    color: #1890ff;
    line-height: 1.5715;
  }
}
</style>
