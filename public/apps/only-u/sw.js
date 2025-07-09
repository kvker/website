self.addEventListener('install', event => {
  console.log('Service Worker installing.')
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating.')
})

self.addEventListener('fetch', event => {
  // 可以先不缓存，只是响应 fetch 请求
})