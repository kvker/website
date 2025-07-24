import matter from 'gray-matter'
import { marked } from 'marked'
import { defaultMongoDB } from '../services/mongodb.js'

const websiteDB = defaultMongoDB.client.db("website")
/**
 * 获取所有博客文章
 * @returns {Promise<Array>} 文章列表
 */
export async function getArticles({
  page = 1,
  pageSize = 10,
  mongoQuery = {},
}) {
  const blogs = await websiteDB.collection("blogs")
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

export async function postArticles(articleList = []) {
  const now = new Date()
  const date = now.toISOString().split('T')[0]

  const blogs = articleList.map(i => {
    const slug = date.replace(/-/g, '/') + '/' + i.title.replace(/\.md$/, '').replace(/\s/g, '-')
    return {
      slug,
      date,
      createdAt: now,
      updatedAt: now,
      content: `---
title: '${i.title}'
date: '${date}'
tags:
${i.tags ? i.tags.map(tag => `  - '${tag}'`).join('\n') : ''}
description: '${i.description || ''}'
summary: '${i.summary || ''}'
author: '污斑兔'
cover: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
readTime: '10 min'
category: '${i.category || '技术教程'}'
---

${i.content}`
    }
  })
  const result = await websiteDB.collection("blogs")
    .insertMany(blogs)
  return result
}