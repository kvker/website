import matter from 'gray-matter'
import { marked } from 'marked'
import { defaultMongoDB } from '../services/mongodb.js'

/**
 * 获取所有博客文章
 * @returns {Promise<Array>} 文章列表
 */
export async function getArticles({
  page = 1,
  pageSize = 10,
  mongoQuery = {},
}) {
  const blogs = await defaultMongoDB.client.db("website").collection("blogs")
    .find(mongoQuery)
    .sort({ date: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()
  const articles = blogs.map(blog => {
    const { data, content: markdown } = matter(blog.content)
    const html = marked(markdown)
    // console.log(data)
    return {
      ...data,
      slug: blog.slug,
      content: html,
      formattedDate: new Date(data.date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-')
    }
  })

  // 按日期倒序排序
  return articles
}

export async function getArticleCount() {
  const count = await defaultMongoDB.client.db("website").collection("blogs").countDocuments()
  return count
}