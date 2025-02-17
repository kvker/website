const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execAsync = util.promisify(exec)

const BLOG_DIR = path.join(__dirname, '../public/blogs')

/**
 * 生成博客文件名
 * @param {Object} params 参数对象
 * @param {string} params.title 文章标题
 * @returns {Promise<string>} 文件路径
 */
async function onGenerateBlogPath({ title }) {
  // 获取当前日期
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  // 将标题转换为合法的文件名
  const filename = title
    .toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-z0-9]+/g, '-') // 将非中文、字母、数字字符替换为短横线
    .replace(/^-+|-+$/g, '') // 去除首尾的短横线
    + `-${Date.now()}.md`

  // 构建完整路径
  const dirPath = path.join(BLOG_DIR, String(year), month, day)
  const filePath = path.join(dirPath, filename)

  // 确保目录存在
  await fs.mkdir(dirPath, { recursive: true })

  return filePath
}

/**
 * 提交到Git仓库
 * @param {string} filePath 文件路径
 * @param {string} commitMessage 提交信息
 */
async function onGitCommit({ filePath, commitMessage }) {
  try {
    const relativePath = path.relative(process.cwd(), filePath)
    await execAsync(`git add "${relativePath}"`)
    await execAsync(`git commit -m "${commitMessage}"`)
    await execAsync(`git push`)
    return true
  } catch (error) {
    console.error('Git commit failed:', error)
    return false
  }
}

/**
 * 创建新博客文章
 */
router.post('/create-blog', async (req, res) => {
  try {
    const { title, content, tags, description, summary, category } = req.body

    // 验证必要字段
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' })
    }

    // 生成文件路径
    const filePath = await onGenerateBlogPath({ title })

    // 构建文章frontmatter
    const now = new Date().toISOString().split('T')[0]
    const frontmatter = `---
title: '${title}'
date: '${now}'
tags:
${tags ? tags.map(tag => `  - '${tag}'`).join('\n') : ''}
description: '${description || ''}'
summary: '${summary || ''}'
author: '污斑兔'
cover: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
readTime: '10 min'
category: '${category || '技术教程'}'
---

${content}`

    // 写入文件
    await fs.writeFile(filePath, frontmatter, 'utf-8')

    // 提交到Git
    const commitSuccess = await onGitCommit({
      filePath,
      commitMessage: `feat(blog): add new article - ${title}`
    })

    res.json({
      success: true,
      data: {
        path: filePath,
        gitCommitted: commitSuccess
      }
    })
  } catch (error) {
    console.error('Create blog failed:', error)
    res.status(500).json({ error: '创建博客失败' })
  }
})

module.exports = router