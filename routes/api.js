import express from 'express'
import sun from './apps/sun.js'
import onlyU from './apps/only-u/index.js'

const router = express.Router()

/**
 * 获取热门新闻接口
 * POST /api/apps/hotnews
 */
router.post('/apps/hotnews', async (req, res) => {
  try {
    // 动态导入fetch，兼容不同Node.js版本
    const fetch = (await import('node-fetch')).default

    const response = await fetch('https://newsnow.busiyi.world/api/s/entire', {
      method: 'POST',
      body: JSON.stringify({
        "sources": [
          "baidu",
          "bilibili-hot-search",
          // "chongbuluo-hot",
          // "cls-hot",
          // "coolapk",
          "douyin",
          "github-trending-today",
          // "hackernews",
          "hupu",
          // "ifeng",
          // "juejin",
          // "nowcoder",
          // "producthunt",
          // "sspai",
          // "thepaper",
          "tieba",
          "toutiao",
          // "wallstreetcn-hot",
          "weibo",
          // "xueqiu-hotstock",
          "zhihu"
        ]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    res.json(data)
  } catch(error) {
    console.error('获取热门新闻失败:', error)
    res.status(500).json({
      success: false,
      message: '获取热门新闻失败',
      error: error.message
    })
  }
})

router.use('/apps/sun', sun)
router.use('/apps/only-u', onlyU)

export default router 