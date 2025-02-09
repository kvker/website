var express = require('express')
var router = express.Router()

// 临时数据，后续会替换为数据库
const articles = [
  {
    id: 1,
    title: '如何使用 Node.js 和 Express 搭建个人博客',
    slug: 'how-to-build-blog-with-nodejs-express',
    summary: '本文将介绍如何使用 Node.js 和 Express 框架搭建一个简单的个人博客系统...',
    content: `
# 如何使用 Node.js 和 Express 搭建个人博客

## 前言
Node.js 和 Express 是构建 Web 应用的优秀组合...

## 技术栈
- Node.js
- Express
- EJS
- Tailwind CSS

## 实现步骤
1. 首先安装必要的依赖...
    `,
    date: '2024-03-20',
    formattedDate: '2024年03月20日',
    categories: [
      { name: 'Node.js', slug: 'nodejs' },
      { name: '后端开发', slug: 'backend' }
    ],
    keywords: 'Node.js,Express,博客系统,Web开发'
  }
]

const categories = [
  { name: 'Node.js', slug: 'nodejs', count: 1 },
  { name: '前端开发', slug: 'frontend', count: 0 },
  { name: '后端开发', slug: 'backend', count: 1 },
  { name: '全栈开发', slug: 'fullstack', count: 0 }
]

/* 文章列表页 */
router.get('/', function(req, res, next) {
  const page = parseInt(req.query.page) || 1
  const pageSize = 10
  const totalPages = Math.ceil(articles.length / pageSize)

  res.render('articles', {
    title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
    description: '独立开发者污斑兔的技术博客，分享Web开发、Node.js、Vue等技术文章。',
    keywords: '技术博客,Web开发,Node.js,Vue,独立开发',
    author: '污斑兔',
    articles: articles,
    categories: categories.map(c => ({
      ...c,
      active: false
    })),
    currentPage: page,
    totalPages: totalPages
  })
})

/* 分类页 */
router.get('/category/:slug', function(req, res, next) {
  const { slug } = req.params
  const filteredArticles = articles.filter(article =>
    article.categories.some(c => c.slug === slug)
  )

  res.render('articles', {
    title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
    description: '独立开发者污斑兔的技术博客，分享Web开发、Node.js、Vue等技术文章。',
    keywords: '技术博客,Web开发,Node.js,Vue,独立开发',
    author: '污斑兔',
    articles: filteredArticles,
    categories: categories.map(c => ({
      ...c,
      active: c.slug === slug
    })),
    currentPage: 1,
    totalPages: 1
  })
})

/* 文章详情页 */
router.get('/:slug', function(req, res, next) {
  const { slug } = req.params
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return next()
  }

  const currentIndex = articles.findIndex(a => a.slug === slug)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  res.render('article', {
    title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
    description: article.summary,
    keywords: article.keywords,
    author: '污斑兔',
    article,
    prevArticle,
    nextArticle
  })
})

module.exports = router