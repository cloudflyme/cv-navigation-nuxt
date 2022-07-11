<template>
  <div
    class="Mydropdown"
    @mouseenter="handleOk('hover', true)"
    @mouseleave="handleOk('hover', false)"
    @click.stop="handleOk('click', !modelValue)"
  >
    <slot></slot>
    <div :class="{ dropdown: true, show: modelValue }" @click.stop>
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  trigger: {
    type: String,
    default: 'hover'
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  if (['click', ''].includes(props.trigger)) {
    document.addEventListener('click', function () {
      props.modelValue && emit('update:modelValue', false)
    })
  }
})
function handleOk(t, b) {
  props.trigger === t && emit('update:modelValue', b)
}
</script>

<style lang="less" scoped>
.Mydropdown {
  position: relative;
  .dropdown {
    margin-top: 6px;
    width: 100%;
    transform-origin: center top;
    position: absolute;
    z-index: 99;
    background: #fafafa;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    transform: scale(0);
    transition: transform 0.3s;
  }
  .show {
    transform: scale(1);
  }
}
</style>
