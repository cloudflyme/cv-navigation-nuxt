<template>
  <div
    class="MyPopver"
    @mouseenter="handleOk('hover', true)"
    @mouseleave="handleOk('hover', false)"
    @click.stop="handleOk('click', !visible)"
  >
    <slot></slot>
    <div :class="{ popver: true, show: visible }" @click.stop>
      <span class="popover-arrow"></span>
      <div class="inner" @click.stop="handleOk('hover', false)">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  trigger: {
    type: String,
    default: 'hover'
  }
})
const visible = ref(false)
function handleOk(t, b) {
  props.trigger === t && (visible.value = b)
}
</script>

<style lang="less" scoped>
.MyPopver {
  position: relative;
  .popver {
    margin-top: 6px;
    transform-origin: center top;
    position: absolute;
    left: -100%;
    z-index: 101;
    background: #fafafa;
    border-radius: 2px;
    transform: scale(0);
    transition: transform 0.3s;
  }
  .inner {
    padding: 10px;
    box-shadow: 0 2px 8px #00000026;
    display: flex;
    flex-wrap: wrap;
  }
  .popover-arrow {
    position: absolute;
    display: block;
    width: 8.48528137px;
    height: 8.48528137px;
    background: transparent;
    border-style: solid;
    border-width: 4.24264069px;
    top: -4px;
    border-top-color: #fff;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #fff;
    box-shadow: -2px -2px 5px #0000000f;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
  }
  .show {
    transform: scale(1);
  }
}
</style>
