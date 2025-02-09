var express = require('express')
var router = express.Router()
var fs = require('fs').promises
var path = require('path')
var matter = require('gray-matter')
var { marked } = require('marked')

const BLOG_DIR = path.join(__dirname, '../public/blogs')

/**
 * 获取所有博客文章
 * @returns {Promise<Array>} 文章列表
 */
async function onGetAllArticles() {
  const articles = []

  // 递归遍历博客目录
  async function scanDir(dir) {
    const files = await fs.readdir(dir)

    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = await fs.stat(fullPath)

      if (stat.isDirectory()) {
        await scanDir(fullPath)
      } else if (path.extname(file) === '.md') {
        // 读取文件内容
        const content = await fs.readFile(fullPath, 'utf-8')
        // 解析 frontmatter
        const { data, content: markdown } = matter(content)
        // 生成 HTML
        const html = marked(markdown)

        // 从文件路径生成 URL slug
        const relativePath = path.relative(BLOG_DIR, fullPath)
        const slug = relativePath
          .replace(/\.md$/, '')
          .split(path.sep)
          .join('/')

        articles.push({
          ...data,
          slug,
          content: html,
          formattedDate: new Date(data.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\//g, '-')
        })
      }
    }
  }

  await scanDir(BLOG_DIR)

  // 按日期倒序排序
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

/* 文章列表页 */
router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1
    const pageSize = 10
    const articles = await onGetAllArticles()
    const totalPages = Math.ceil(articles.length / pageSize)
    const paginatedArticles = articles.slice((page - 1) * pageSize, page * pageSize)

    res.render('articles', {
      title: '污斑兔的个人主页 - 独立开发者-Web全栈-无代码游戏开发-爱好Coding',
      description: '独立开发者污斑兔的技术博客，分享Web开发、Node.js、Vue等技术文章。',
      keywords: '技术博客,Web开发,Node.js,Vue,独立开发',
      author: '污斑兔',
      articles: paginatedArticles,
      categories: [], // 暂时不使用分类
      currentPage: page,
      totalPages: totalPages
    })
  } catch (err) {
    next(err)
  }
})

/* 文章详情页 */
router.get('/:year/:month/:day/:slug', async function(req, res, next) {
  try {
    const { year, month, day, slug } = req.params
    const articles = await onGetAllArticles()
    const filePath = `${year}/${month}/${day}/${slug}`
    const article = articles.find(a => a.slug === filePath)

    if (!article) {
      return next()
    }

    const currentIndex = articles.findIndex(a => a.slug === filePath)
    const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
    const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

    res.render('article', {
      title: `${article.title} - 污斑兔的个人主页`,
      description: article.summary,
      keywords: article.keywords || '技术博客,Web开发,Node.js,Vue,独立开发',
      author: '污斑兔',
      article,
      prevArticle,
      nextArticle
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router