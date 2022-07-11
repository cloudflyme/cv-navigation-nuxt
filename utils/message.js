function cdom(e) {
  return {
    dom: e && document.createElement(e),
    class(e) {
      return e && (this.dom.className = e), this.dom
    }
  }
}
function init() {
  let e = document.createElement('style')
  ;(e.id = 'm-meaasge-css'),
    (e.type = 'text/css'),
    e.appendChild(
      document.createTextNode(
        '.m-message-container{position:fixed;top:8px;width:100%;z-index:1010;box-sizing:border-box;pointer-events:none;}.m-message-box{padding:8px;text-align:center;}.m-message{color:#333;font-size:14px;display:inline-block;padding:10px 16px;background:#fff;border-radius:2px;box-shadow:0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d;}.m-message-icon{position:relative;top:3px;margin-right:8px;height:16px;font-size:16px;}.fade-in-bottom{animation:fade-in-bottom 0.3s cubic-bezier(0.39,0.575,0.565,1) both;}@keyframes fade-in-bottom{0%{transform:translateY(0px);opacity:1;}100%{transform:translateY(-10px);opacity:0;}}@keyframes fade-in-top{0%{transform:translateY(-10px);opacity:0;}100%{transform:translateY(0);opacity:1;}}.fade-in-top{animation:fade-in-top 0.3s cubic-bezier(0.39,0.575,0.565,1) both;}'
      )
    ),
    document.head.appendChild(e)
  document.body.appendChild(cdom('div').class('m-message-container'))
}
function createElement(e) {
  let t = document.querySelector('.m-message-container')
  const a = {
    type: 'success',
    duration: 3e3,
    content: 'This is a success message'
  }
  Object.assign(a, e)
  const { content: s, duration: n, type: i } = a,
    o = (cdom('div').dom, cdom('div').class('m-message-box')),
    c = cdom('div').class('m-message fade-in-top')
  setTimeout(() => {
    c.classList.remove('fade-in-top')
  }, 600)
  const d = cdom('span').class('m-message-icon')
  switch (i) {
    case 'success':
      d.innerHTML =
        '<svg focusable="false" width="1em" height="1em" fill="#52c41a" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg>'
      break
    case 'warning':
      d.innerHTML =
        '<svg focusable="false" width="1em" height="1em" fill="#faad14" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>'
      break
    case 'error':
      d.innerHTML =
        '<svg focusable="false" width="1em" height="1em" fill="#ff4d4f" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>'
      break
    case 'info':
      d.innerHTML =
        '<svg focusable="false" width="1em" height="1em" fill="#1890ff" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path></svg>'
  }
  const m = cdom('span').dom
  return (
    (m.innerHTML = s),
    c.appendChild(d),
    c.appendChild(m),
    o.appendChild(c),
    t.appendChild(o),
    setTimeout(() => {
      c.classList.add('fade-in-bottom')
    }, n - 300),
    setTimeout(() => {
      t.removeChild(o)
    }, n),
    d
  )
}
const message = {
  init,
  config(e) {
    createElement(e)
  },
  success(e) {
    createElement({ type: 'success', content: e })
  },
  error(e) {
    createElement({ type: 'error', content: e })
  },
  info(e) {
    createElement({ type: 'info', content: e })
  },
  warning(e) {
    createElement({ type: 'warning', content: e })
  }
}
export default message
