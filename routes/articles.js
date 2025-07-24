// @ts-check

import express from 'express'
import { getArticles, getArticleCount, postArticles } from '../services/blogs.js'
import { onLlmGenerateBlog, onLlmGenerateBlogInfo } from '../services/llm.js'

const router = express.Router()

/* 文章列表页 */
router.get('/', async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = 10
    const articles = await getArticles({
      page,
      pageSize,
    })
    const totalCount = await getArticleCount()
    const totalPages = Math.ceil(totalCount / pageSize)

    res.render('articles', {
      title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
      description: '独立开发者污斑兔的技术博客，分享Web开发、Node.js、Vue等技术文章。',
      keywords: '技术博客,Web开发,Node.js,Vue,独立开发',
      author: '污斑兔',
      articles,
      categories: [], // 暂时不使用分类
      currentPage: page,
      totalPages,
    })
  } catch(err) {
    next(err)
  }
})

/* 文章详情页 */
router.get('/:year/:month/:day/:slug', async function (req, res, next) {
  try {
    const { year, month, day, slug } = req.params
    const articles = await getArticles({
      mongoQuery: {
        slug: `${year}/${month}/${day}/${slug}`, // 数据库的slug是年/月/日/slug
      },
      page: 1,
      pageSize: 1
    })

    const article = articles[0]
    if(!article) {
      return next()
    }

    const currentIndex = articles.findIndex(a => a.slug === 'filePath')
    const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
    const nextArticle = (currentIndex < articles.length - 1 && currentIndex >= 0) ? articles[currentIndex + 1] : null

    res.render('article', {
      title: `${article.title} - 污斑兔的个人主页`,
      description: article.summary,
      keywords: article.keywords || '技术博客,Web开发,Node.js,Vue,独立开发',
      author: '污斑兔',
      article,
      prevArticle,
      nextArticle
    })
  } catch(err) {
    next(err)
  }
})

// 处理随笔转博客
router.post('/generate', async (req, res) => {
  const { content } = req.body
  try {
    // 直接调用 AI 处理
    const llmContent = await onLlmGenerateBlog({ text: content })
    let result = await onLlmGenerateBlogInfo({ text: llmContent })
    result.content = llmContent
    result = await postArticles([result])
    res.json({
      data: result
    })
  } catch(error) {
    console.error('generate blog error: ', error.message)
    res.status(503).json({ error })
  }
})

// 处理博客加工
router.post('/generate-with-content', async function (req, res, next) {
  const { content } = req.body
  if(!content) {
    return res.json({
      error: '内容不能为空'
    })
  }

  try {
    // 直接调用 AI 处理
    let result = await onLlmGenerateBlogInfo({ text: content })
    result.content = content
    result = await postArticles([result])
    res.json({
      data: result
    })
  } catch(error) {
    console.error('generate blog error: ', error.message)
    res.status(503).json({
      error
    })
  }
})

// 处理博客信息
router.post('/generate-info', async (req, res) => {
  const { content } = req.body
  try {
    let result = await onLlmGenerateBlogInfo({ text: content })
    result.content = content
    res.json({
      data: result
    })
  } catch(error) {
    console.error('generate blog info error: ', error.message)
    res.status(503).json({ error })
  }
})

export default router