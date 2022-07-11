/**
 * @param {*} name 图片名称
 * @returns 获取图片链接
 */
export const getImgJpgSrc = name => {
  const path = `../assets/image/${name}.jpg`
  const modules = import.meta.globEager('../assets/image/*.jpg')
  return modules[path].default
}
/**
 * @param {*} name 图片名称
 * @returns 获取图片链接
 */
export const getImgPngSrc = name => {
  const path = `../assets/image/${name}.png`
  const modules = import.meta.globEager('../assets/image/*.png')
  return modules[path].default
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
// 判断是否移动端
export function goPAGE() {
  var ua = navigator.userAgent.toLowerCase()
  var mobile = /mobile/gi.test(ua)
  return mobile
}

/**
 * 生成唯一得id值
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
