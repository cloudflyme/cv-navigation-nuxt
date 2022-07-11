<template>
  <teleport to="#__nuxt">
    <div class="my-model">
      <div class="mask" @mousewheel.prevent v-show="visible" @click.stop="handleCancel">
        <div
          @click.stop
          class="my-model-mian"
          :style="{
            width: width + 'px',
            opacity: animation ? '1' : '0',
            top: animation ? '100px' : '95px'
          }"
        >
          <div class="model-header">
            <span>{{ title }}</span>
            <svg
              @click="handleCancel"
              viewBox="64 64 896 896"
              data-icon="close"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              class=""
            >
              <path
                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              ></path>
            </svg>
          </div>
          <div class="model-body">
            <slot></slot>
          </div>
          <div class="model-footer">
            <span class="my-cancel" @click="handleCancel">{{
              cancelText
            }}</span>
            <span :class="{'my-primary': true, 'disable': confirmLoading}" @click="handleOK">{{ okText }}</span>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'ok'])
const props = defineProps({
  width: {
    type: [String, Number],
    default: 520
  },
  title: {
    type: String,
    default: 'Title'
  },
  cancelText: {
    type: String,
    default: '取 消'
  },
  okText: {
    type: String,
    default: '确 定'
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  modelValue: Boolean
})
const visible = ref(false)
const animation = ref(false)
onMounted(() => {})
watch(
  props,
  val => {
    if (val.modelValue) {
      visible.value = val.modelValue
      setTimeout(() => {
        animation.value = true
      }, 50)
    } else {
      animation.value = false
      setTimeout(() => {
        visible.value = false
      }, 100)
    }
  },
  { immediate: true }
)
function handleOK() {
  if (!props.confirmLoading) {
    emit('ok')
  }
}
function handleCancel() {
  animation.value = false
  setTimeout(() => {
    visible.value = false
    emit('update:modelValue', false)
  }, 100)
}
</script>

<style lang="less" scoped>
.my-cancel,
.my-primary {
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  line-height: 32px;
  display: inline-block;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  text-align: center;
  height: 32px;
  padding: 0 15px;
}
.my-cancel {
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #d9d9d9;
}

.my-cancel:hover {
  color: #40a9ff;
  background-color: #fff;
  border-color: #40a9ff;
}

.my-primary {
  border: 1px solid #1890ff;
  background: #1890ff;
  color: #fff;
  margin-left: 10px;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}

.my-primary:hover {
  color: #fff;
  background-color: #40a9ff;
  border-color: #40a9ff;
}
.model {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    color: rgba(0, 0, 0, 0.65);
    border-bottom: 1px solid #e8e8e8;
    span {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
    }
    svg {
      cursor: pointer;
    }
  }
  &-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5;
  }
  &-footer {
    height: 53px;
    padding: 10px 16px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #e8e8e8;
  }
}
.mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: #00000073;
  width: 100vw;
  height: 100vh;
}
.my-model-mian {
  border-radius: 4px;
  background: #fff;
  transition: all 0.05s ease-in;
  position: relative;
  top: 100px;
  margin: 0 auto;
  border: 0;
  box-shadow: 0 4px 12px #00000026;
  pointer-events: auto;
}

.disable {
  color: #fff;
  background-color: #40a9ff;
  border-color: #40a9ff;
  cursor: not-allowed;
}
</style>
