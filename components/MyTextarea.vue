<template>
  <span class="my-textarea">
    <textarea
      :rows="rows"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :readonly="readonly"
    ></textarea>
    <span
      v-show="!readonly && modelValue != false && modelValue.length > 0"
      class="remove"
      title="清除"
      @click="handleRemove"
      >x</span
    >
  </span>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'change'])
defineProps({
  rows: {
    type: [String, Number],
    default: 3
  },
  placeholder: {
    type: String,
    default: '空空如也'
  },
  modelValue: String
})
const readonly = useAttrs().readonly
function handleRemove() {
  emit('update:modelValue', '')
  emit('change', '')
}
function handleInput(e) {
  const d = e.target.value
  emit('update:modelValue', d)
  emit('change', d)
}
</script>

<style lang="less" scoped>
.my-textarea {
  width: 100%;
  height: auto;
  display: inline-block;
  position: relative;
  textarea {
    box-sizing: border-box;
    outline: none;
    border: 1px solid #d9d9d9;
    padding: 4px 11px;
    width: 100%;
    max-width: 100%;
    resize: vertical;
    height: auto;
    min-height: 32px;
    line-height: 1.5715;
    vertical-align: bottom;
    transition: all 0.3s, height 0s;
  }
  textarea::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  textarea:hover {
    border-color: #40a9ff;
  }
  .remove {
    cursor: pointer;
    position: absolute;
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    top: 11px;
    right: 6px;
    line-height: 9px;
    text-align: center;
    vertical-align: top;
  }
}
</style>
