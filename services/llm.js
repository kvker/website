import axios from 'axios'

export async function onOcr({ url }) {
  // console.log('onOcr', { url })
  const { data: ocrRet } = await axios
    .post(process.env.BAILIAN_URL, {
      model: 'qwen-vl-ocr',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: url,
              min_pixels: 3136,
              max_pixels: 1003520
            },
            {
              type: 'text',
              text: 'Read all the text in the image.'
            }
          ]
        }
      ]
    }, {
      headers: {
        Authorization: 'Bearer ' + process.env.BAILIAN_KEY
      }
    })
  const content = ocrRet.choices[0].message.content || ''
  // console.log('ocr coontent: ', content)
  return content
}

export async function onLlmGenerateBlog({ text }) {
  // console.log('onLlmGenerateBlog', { text })
  const { data: llmRet } = await axios
    .post(process.env.GLM_URL, {
      model: 'glm-4-plus',
      messages: [
        {
          role: 'system',
          content: `你是一名专业的博客写作高手，我将给你随笔的内容，你帮我润色为博客文章。
要求如下：
1. 不要包含任何其他内容，不要包含指引性文字，如“以下内容”，“以下为博客内容”，“以下为博客标题”，“以下为博客标签”，“以下为博客SEO建议”，“上述”等你作为AI的回复，只要回复结果即可。
2. 博客内容字数不要少于1000字。
3. 博客内容要符合行业特点，写出对应行业风格的博客内容。

请直接输出专业的博客内容吧，请输出：\n\n`
        },
        {
          role: 'user',
          content: text
        }
      ],
      response_format: {
        type: 'text'
      },
      max_tokens: 4096
    }, {
      headers: {
        Authorization: 'Bearer ' + process.env.GLM_KEY
      }
    })
  // console.log('llmRet', llmRet)
  const content = llmRet.choices[0].message.content
  // console.log('content: ', content)
  return content
}

export async function onLlmGenerateBlogInfo({ text }) {
  // console.log('onLlmGenerateBlogInfo', { text })
  const { data: llmRet } = await axios
    .post(process.env.GLM_URL, {
      model: 'glm-4-plus',
      messages: [
        {
          role: 'system',
          content: `你是一名专业的博客写作高手，我将给你博客的内容，你帮我梳理出关键信息。
你需要从博客的内容分析出是哪个行业的，然后根据行业特点，分析出博客的标题、标签、SEO建议、描述、摘要、分类。

请使用JSON，格式如下：{title: 博客标题, tags: [博客标签1, 博客标签2, ...], seoSuggestions: 博客SEO建议, description: 博客描述, summary: 博客摘要, category: 博客分类}`
        },
        {
          role: 'user',
          content: text
        }
      ],
      response_format: {
        type: 'json_object'
      },
      max_tokens: 1024
    }, {
      headers: {
        Authorization: 'Bearer ' + process.env.GLM_KEY
      }
    })
  // console.log('llmRet', llmRet)
  const content = llmRet.choices[0].message.content
  // console.log('content: ', content)
  const llmJson = JSON.parse(content)
  // console.log('llmJson: ', llmJson)
  return llmJson
}