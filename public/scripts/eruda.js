const isTest = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname.includes('192.168')
if(isTest) {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/eruda@3.4.3/eruda.min.js'
  document.head.appendChild(script)
  script.onload = () => {
    eruda.init()
  }
}