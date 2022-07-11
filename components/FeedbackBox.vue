<template>
  <div class="feedback b--r m-b-20" @click="feedbackFlag = true">
    <img
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/2a66e021-0a42-4b30-82ff-4394644605cd.png"
      alt=""
    />
  </div>
  <Mymodel
    v-model="feedbackFlag"
    okText="提 交"
    title="反馈"
    :confirmLoading="btnDisable"
    @ok="handleOk"
  >
    <div class="modal-type">
      <span>类型 ：</span>
      <MySelect
        placeholder="空空如也"
        :options="options"
        v-model="formData.type"
        @change="handleChange"
      />
    </div>
    <div class="modal-text">
      <span>描述 ：</span>
      <MyTextarea
        style="width: 400px"
        v-model.trim="formData.desc"
        placeholder="请输入你要反馈的信息"
        :rows="4"
      />
    </div>
  </Mymodel>
</template>

<script setup>
import { ajaxPost } from '../utils/ajax.js'
import message from '../utils/message.js'
import { parseTime } from '../utils/index.js'
const options = ref([
  {
    value: '建议',
    label: '建议'
  },
  {
    value: '添加网站',
    label: '添加网站'
  }
])
const formData = reactive({
  type: '建议',
  desc: ''
})
const btnDisable = ref(false)
const feedbackFlag = ref(false)
onMounted(() => {})

function handleOk() {
  if (formData.desc == '') {
    message.warning('请输入反馈信息')
    return
  }
  btnDisable.value = true
  const params = JSON.parse(JSON.stringify(formData))
  params.create_time = parseTime(+new Date())
  ajaxPost('https://39734fbc-b241-4d89-ad87-0befd655e266.bspapp.com/setFeedbackInfo', params).then(res => {
    if (res?.success == false) {
      message.warning('接口超时，请重试')
      btnDisable.value = false
      return
    }
    feedbackFlag.value = false
    formData.desc = ''
    message.success('反馈成功，预计24小时后会处理')
  })
}
function handleChange(e) {
  if (e === '添加网站') {
    formData.desc = '/*加到那个模块，比如模块：教程*/\n模块：\n网站链接：'
  } else {
    formData.desc = ''
  }
}
</script>

<style lang="less" scoped>
.modal-text,
.modal-type {
  margin-top: 15px;
  display: flex;
  span {
    line-height: 32px;
    width: 55px;
    flex-shrink: 0;
  }
}
.feedback {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
</style>
