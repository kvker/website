/**
 * 全局工具函数集合
 * @fileoverview 提供常用的工具函数和全局变量
 */

/**
 * 为不支持queueMacrotask的浏览器提供polyfill
 * queueMacrotask用于将任务添加到宏任务队列中
 */
// @ts-ignore
if(!window.queueMacrotask) {
  /**
   * 将函数添加到宏任务队列
   * @param {Function} f - 要执行的函数
   * @returns {number} setTimeout的返回值，可用于clearTimeout
   */
  // @ts-ignore
  window.queueMacrotask = f => setTimeout(f, 0)
}

/**
 * 检查值是否不为null或undefined
 * @param {*} value - 要检查的值
 * @returns {boolean} 如果值不为null且不为undefined则返回true，否则返回false
 * @example
 * isNotNull(0) // true
 * isNotNull('') // true
 * isNotNull(null) // false
 * isNotNull(undefined) // false
 */
function isNotNull(value) {
  return value !== undefined && value !== null
}

/**
 * 根据索引获取中文星期名称
 * @param {number} [index=0] - 星期索引，0-6分别对应周一到周日
 * @returns {string} 对应的中文星期名称（一、二、三、四、五、六、日）
 * @example
 * getWeekday(0) // '一' (周一)
 * getWeekday(1) // '二' (周二)
 * getWeekday(6) // '日' (周日)
 * getWeekday() // '一' (默认返回周一)
 */
function getWeekday(index = 0) {
  return ['一', '二', '三', '四', '五', '六', '日'][index]
}