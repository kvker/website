/**
 * HTML转Markdown工具 - Alpine.js版本
 * 作者：污斑兔
 * 版本：2.0.0
 */

// Alpine.js数据和方法定义
document.addEventListener('alpine:init', () => {
  Alpine.data('html2md', () => ({
    // 响应式数据
    htmlInput: '',
    markdownOutput: '',
    isConverting: false,
    theme: 'light',
    showSuccessToast: false,
    showErrorToast: false,
    toastMessage: '',
    debounceTimer: null,

    // 示例HTML代码
    exampleHtml: `<h1>欢迎使用HTML转Markdown工具</h1>
<p>这是一个<strong>示例</strong>HTML代码，展示了各种HTML标签的转换效果。</p>

<h2>功能特性</h2>
<ul>
  <li>支持多种HTML标签转换</li>
  <li>本地处理，保护隐私</li>
  <li>响应式设计，支持多设备</li>
</ul>

<h3>代码示例</h3>
<pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>

<h4>链接示例</h4>
<p>访问 <a href="https://example.com">示例网站</a> 了解更多信息。</p>

<h5>图片示例</h5>
<p><img src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" alt="示例图片" width="200"></p>

<h6>表格示例</h6>
<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>标记语言</td>
      <td>超文本标记语言</td>
    </tr>
    <tr>
      <td>Markdown</td>
      <td>轻量级标记语言</td>
      <td>易于阅读和编写的标记语言</td>
    </tr>
  </tbody>
</table>

<blockquote>
  <p>这是一个引用块，用于突出显示重要信息。</p>
</blockquote>`,

    // 初始化
    init() {
      console.log('HTML转Markdown工具已加载 (Alpine.js版本)')
      this.onInitTheme()
      this.onBindKeyboardShortcuts()
      this.onLoadExample()
    },

    // 初始化主题
    onInitTheme() {
      this.theme = localStorage.getItem('html2md-theme') || 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    // 切换主题
    onToggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('html2md-theme', this.theme)
      this.onShowToast('主题已切换', 'success')
    },

    // 绑定键盘快捷键
    onBindKeyboardShortcuts() {
      document.addEventListener('keydown', (event) => {
        // Ctrl+Enter 转换
        if (event.ctrlKey && event.key === 'Enter') {
          event.preventDefault()
          this.onConvertHtml()
        }
        
        // Ctrl+S 保存
        if (event.ctrlKey && event.key === 's') {
          event.preventDefault()
          this.onDownloadMarkdown()
        }
      })
    },

    // 清空输入
    onClearInput() {
      this.htmlInput = ''
      this.markdownOutput = ''
      this.onShowToast('输入已清空', 'success')
    },

    // 加载示例
    onLoadExample() {
      this.htmlInput = this.exampleHtml
      this.onConvertHtml()
      this.onShowToast('示例代码已加载', 'success')
    },

    // 监听HTML输入变化
    // onHtmlInputChange() {
    //   // 防抖处理，避免频繁转换
    //   clearTimeout(this.debounceTimer)
    //   this.debounceTimer = setTimeout(() => {
    //     if (this.htmlInput.trim()) {
    //       this.onConvertHtml()
    //     }
    //   }, 500)
    // },

    // 转换HTML为Markdown
    async onConvertHtml() {
      if (this.isConverting) {
        return
      }

      const htmlContent = this.htmlInput.trim()

      if (!htmlContent) {
        this.markdownOutput = ''
        this.onShowToast('请输入HTML代码', 'error')
        return
      }

      try {
        this.isConverting = true

        // 使用html2md库进行转换
        const markdownContent = html2md(htmlContent, {
          ignoreTags: [],
        })

        // 输出转换结果
        this.markdownOutput = markdownContent
        this.onShowToast('转换完成', 'success')

      } catch (error) {
        console.error('转换失败:', error)
        this.onShowToast('转换失败: ' + error.message, 'error')
      } finally {
        this.isConverting = false
      }
    },

    // 复制输出内容
    async onCopyOutput() {
      if (!this.markdownOutput.trim()) {
        this.onShowToast('没有可复制的内容', 'error')
        return
      }

      try {
        // 使用现代浏览器的Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(this.markdownOutput)
          this.onShowToast('内容已复制到剪贴板', 'success')
        } else {
          // 降级到传统方法
          this.onCopyTextFallback(this.markdownOutput)
        }
      } catch (error) {
        console.error('复制失败:', error)
        this.onShowToast('复制失败', 'error')
      }
    },

    // 复制文本的降级方法
    onCopyTextFallback(text) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        document.execCommand('copy')
        this.onShowToast('内容已复制到剪贴板', 'success')
      } catch (error) {
        console.error('复制失败:', error)
        this.onShowToast('复制失败', 'error')
      } finally {
        document.body.removeChild(textArea)
      }
    },

    // 下载Markdown文件
    onDownloadMarkdown() {
      if (!this.markdownOutput.trim()) {
        this.onShowToast('没有可下载的内容', 'error')
        return
      }

      try {
        const content = this.markdownOutput
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `converted-${new Date().getTime()}.md`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)

        this.onShowToast('文件下载成功', 'success')
      } catch (error) {
        console.error('下载失败:', error)
        this.onShowToast('下载失败', 'error')
      }
    },

    // 显示Toast通知
    onShowToast(message, type = 'success') {
      this.toastMessage = message
      
      if (type === 'success') {
        this.showSuccessToast = true
        setTimeout(() => {
          this.showSuccessToast = false
        }, 3000)
      } else {
        this.showErrorToast = true
        setTimeout(() => {
          this.showErrorToast = false
        }, 3000)
      }
    },

    // 格式化HTML代码
    onFormatHtml() {
      if (!this.htmlInput.trim()) {
        this.onShowToast('没有可格式化的内容', 'error')
        return
      }

      try {
        // 简单的HTML格式化
        let html = this.htmlInput
          .replace(/>\s+</g, '><') // 移除标签间的空白
          .replace(/></g, '>\n<') // 在标签间添加换行
          .replace(/^\s+|\s+$/g, '') // 移除首尾空白

        this.htmlInput = html
        this.onShowToast('HTML代码已格式化', 'success')
      } catch (error) {
        console.error('格式化失败:', error)
        this.onShowToast('格式化失败', 'error')
      }
    },

    // 统计字符数
    onCountCharacters() {
      const htmlCount = this.htmlInput.length
      const markdownCount = this.markdownOutput.length
      const message = `HTML: ${htmlCount} 字符, Markdown: ${markdownCount} 字符`
      this.onShowToast(message, 'success')
    }
  }))
}) 