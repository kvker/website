import express from 'express'
import { getArticles, getArticleCount } from '../services/blogs.js'

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

export default router