/**
 * 博客文章AI生成工具 - Alpine.js 数据和方法
 * @author 污斑兔
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('blogatrix', () => ({
    // 响应式数据
    inputContent: '',
    outputContent: '',
    isProcessing: false,
    showSuccessToast: false,
    showErrorToast: false,
    toastMessage: '',

    /**
     * 切换主题
     */
    onToggleTheme() {
      const html = document.documentElement
      const currentTheme = html.getAttribute('data-theme')
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'
      html.setAttribute('data-theme', newTheme)
      
      // 保存主题偏好
      localStorage.setItem('theme', newTheme)
      
      this.onShowToast('主题已切换', 'success')
    },

    /**
     * 清空输入内容
     */
    onClearInput() {
      this.inputContent = ''
      this.outputContent = ''
      this.onShowToast('输入内容已清空', 'success')
    },

    /**
     * 加载示例内容
     */
    onLoadExample() {
      this.inputContent = `今天天气很好，我去公园散步了。

看到了很多人在锻炼身体，有跑步的，有打太极的，还有遛狗的。空气很清新，心情也变得很好。

公园里有一片小湖，湖水清澈见底，倒映着蓝天白云。湖边有几棵柳树，柳枝随风轻摆，像是在跳舞。

突然想起小时候经常和父母一起来这里玩，那时候总是很开心。现在虽然长大了，但每次来这里都能找回那种纯真的快乐。

生活就是这样，有时候需要慢下来，感受身边的美好。`
      
      this.onShowToast('示例内容已加载', 'success')
    },

    /**
     * 随笔转博客
     */
    async onConvertToBlog() {
      if (!this.inputContent.trim()) {
        this.onShowToast('请先输入内容', 'error')
        return
      }

      this.isProcessing = true
      
      try {
        // 调用随笔转博客接口
        const response = await fetch('/articles/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.inputContent
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.error) {
          throw new Error(result.error)
        }

        // 显示处理结果
        this.outputContent = result.data.content || '处理完成，但未返回内容'
        
        this.onShowToast('随笔转博客完成', 'success')
      } catch (error) {
        this.onShowToast('处理失败，请重试', 'error')
        console.error('随笔转博客失败:', error)
      } finally {
        this.isProcessing = false
      }
    },

    /**
     * 博客加工
     */
    async onProcessBlog() {
      if (!this.inputContent.trim()) {
        this.onShowToast('请先输入内容', 'error')
        return
      }

      this.isProcessing = true
      
      try {
        // 调用博客加工接口
        const response = await fetch('/articles/generate-with-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.inputContent
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.error) {
          throw new Error(result.error)
        }

        // 显示处理结果
        this.outputContent = result.data.content || '处理完成，但未返回内容'
        
        this.onShowToast('博客加工完成', 'success')
      } catch (error) {
        this.onShowToast('处理失败，请重试', 'error')
        console.error('博客加工失败:', error)
      } finally {
        this.isProcessing = false
      }
    },

    /**
     * 博客信息抽取
     */
    async onExtractInfo() {
      if (!this.inputContent.trim()) {
        this.onShowToast('请先输入内容', 'error')
        return
      }

      this.isProcessing = true
      
      try {
        // 调用博客信息抽取接口
        const response = await fetch('/articles/generate-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.inputContent
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        
        if (result.error) {
          throw new Error(result.error)
        }

        // 显示处理结果
        this.outputContent = result.data.content || '处理完成，但未返回内容'
        
        this.onShowToast('信息抽取完成', 'success')
      } catch (error) {
        this.onShowToast('处理失败，请重试', 'error')
        console.error('信息抽取失败:', error)
      } finally {
        this.isProcessing = false
      }
    },

    /**
     * 复制输出内容
     */
    async onCopyOutput() {
      if (!this.outputContent) {
        this.onShowToast('没有可复制的内容', 'error')
        return
      }

      try {
        await navigator.clipboard.writeText(this.outputContent)
        this.onShowToast('内容已复制到剪贴板', 'success')
      } catch (error) {
        // 降级方案
        const textArea = document.createElement('textarea')
        textArea.value = this.outputContent
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.onShowToast('内容已复制到剪贴板', 'success')
      }
    },

    /**
     * 下载处理结果
     */
    onDownloadResult() {
      if (!this.outputContent) {
        this.onShowToast('没有可下载的内容', 'error')
        return
      }

      try {
        const blob = new Blob([this.outputContent], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `blogatrix-result-${new Date().toISOString().slice(0, 10)}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        this.onShowToast('文件下载成功', 'success')
      } catch (error) {
        this.onShowToast('下载失败，请重试', 'error')
        console.error('下载失败:', error)
      }
    },



    /**
     * 显示Toast通知
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success/error)
     */
    onShowToast(message, type) {
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

    /**
     * 初始化
     */
    init() {
      // 恢复主题偏好
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme)
      }
      
      console.log('博客文章AI生成工具已初始化')
    }
  }))
}) 