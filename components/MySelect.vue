<template>
  <div class="MySelect">
    <div class="input-box" @click.stop="getFocus">
      <input
        ref="ipt"
        @keyup.enter="visible = false"
        :value="modelValue"
        type="text"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <svg
        :style="{ transform: visible ? 'rotate(180deg)' : '' }"
        viewBox="64 64 896 896"
        data-icon="down"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
        ></path>
      </svg>
    </div>

    <div :class="`list ${visible ? 'show' : ''}`" @click.stop>
      <div
        :class="`list-item ${selectIndex === index ? 'list-item-active' : ''}`"
        v-for="(item, index) in options"
        :key="index"
        @click="selectVal(item.value)"
        @mouseenter="selectIndex = index"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  placeholder: {
    type: String,
    default: '空空如也'
  },
  options: Array,
  modelValue: String
})
const visible = ref(false)
const ipt = ref(null)
const selectIndex = ref(-1)

onMounted(() => {
  setIndex()
})
function setIndex(val = props.modelValue) {
  if (Array.isArray(props.options)) {
    let fi = -1
    let i = 0
    while (i < props.options.length) {
      const item = props.options[i]
      if (item.value === val) {
        fi = i
        break
      }
      i++
    }
    selectIndex.value = fi
  }
}
document.addEventListener('click', function () {
  if (visible.value) visible.value = false
})
function getFocus() {
  ipt.value.focus()
  visible.value = !visible.value
}
function handleInput(e) {
  const d = e.target.value
  setIndex(d)
  emit('update:modelValue', d)
  emit('change', d)
}
function selectVal(d) {
  visible.value = !visible.value
  emit('update:modelValue', d)
  emit('change', d)
}
</script>

<style lang="less" scoped>
.MySelect {
  .list {
    padding: 5px 0;
  }
  .list-item {
    line-height: 25px;
    height: 25px;
    padding: 0 12px;
  }
  .list-item:hover,
  .list-item-active {
    background-color: #e6f7ff;
  }
  width: 198px;
  position: relative;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 4px;
  .input-box {
    position: relative;
  }
  cursor: pointer;
  input {
    width: 163px;
    margin-right: 24px;
    margin-left: 11px;
    height: 30px;
    line-height: 30px;
    background: none;
    outline: none;
    border: none;
  }
  input::-webkit-input-placeholder {
    color: #bfbfbf;
  }
  svg {
    transition: transform 0.3s;
    position: absolute;
    top: 8px;
    right: 11px;
    color: rgba(0, 0, 0, 0.25);
  }
  .list {
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
