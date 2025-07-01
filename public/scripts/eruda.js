const isTest = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.includes('192.168')
let eruda = null
const initEruda = () => {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/eruda@3.4.3/eruda.min.js'
  document.head.appendChild(script)
  script.onload = () => {
    window.eruda.init()
  }
}
if(isTest) {
  initEruda()
}

// 快速点击5次, 开启eruda
let clickCount = 0
let clickTimer = null
document.addEventListener('click', (e) => {
  clickCount++
  if(clickTimer) return
  clickTimer = setTimeout(() => {
    if(clickCount >= 5 && !window.eruda) {
      initEruda()
    }
    clearTimeout(clickTimer)
    clickTimer = null
    clickCount = 0
  }, 1000)
})