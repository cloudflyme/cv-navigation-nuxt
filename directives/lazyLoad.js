// 懒加载图片
const vLazyload  = {
  created(el, binding) {
    if (binding.value && binding.value.indexOf('http') > -1) {
      el.setAttribute('data-src', binding.value)
    } else {
      el.setAttribute('src', binding.value)
    }
  },
  mounted(el) {
    if (el.dataset.src) {
      const config = {
        rootMargin: '200px 0px 0px 0px',
        threshold: 0
      }
      let observer = new IntersectionObserver((entries, self) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          let img = entry.target
          let src = img.dataset.src
          if (src) {
            img.src = src
          }
          // 解除观察
          self.unobserve(entry.target)
        }
      }, config)
      observer.observe(el)
    }
    
  }
}
export default vLazyload
