/**
 * 图片合并服务
 * 将两张相同尺寸的图片按照特定规则合并为一张
 * 使其在黑色和白色背景下显示不同的内容
 */

/**
 * 检查图片尺寸是否相同
 * @param {{img1Data: ImageData, img2Data: ImageData}} params
 * @returns {boolean} - 是否相同
 */
function onCheckImageSize({ img1Data, img2Data }) {
  return img1Data.width === img2Data.width && img1Data.height === img2Data.height
}

/**
 * 将图片转换为ImageData
 * @param {{imgSrc: string}} params - 图片路径或base64
 * @returns {Promise<ImageData>} - 图片的ImageData数据
 */
async function onGetImageData({ imgSrc }) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(ctx.getImageData(0, 0, img.width, img.height))
    }
    img.onerror = reject
    img.src = imgSrc
  })
}

/**
 * 合并两张图片
 * @param {{img1Src: string, img2Src: string}} params
 * @returns {Promise<{base64: string, blob: Blob}>} - 返回合并后的图片base64和blob对象
 */
window.onMergeImages = async function ({ img1Src, img2Src }) {
  try {
    // 获取两张图片的ImageData
    const [img1Data, img2Data] = await Promise.all([onGetImageData({ imgSrc: img1Src }), onGetImageData({ imgSrc: img2Src })])

    // 检查图片尺寸
    if (!onCheckImageSize({ img1Data, img2Data })) {
      throw new Error('图片尺寸不一致')
    }

    // 创建新的canvas
    const canvas = document.createElement('canvas')
    canvas.width = img1Data.width
    canvas.height = img1Data.height
    const ctx = canvas.getContext('2d')
    const newImageData = ctx.createImageData(img1Data.width, img1Data.height)

    // 处理像素数据
    const width = img1Data.width
    for (let y = 0; y < img1Data.height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4
        // 根据坐标计算是否为奇数点，通过y行号来错开
        const isOddPixel = (x + (y % 2)) % 2 === 0

        if (isOddPixel) {
          // 奇数像素使用第一张图的数据，并添加半透明黑色效果
          const value = (255 * 3 - (img1Data.data[i] + img1Data.data[i + 1] + img1Data.data[i + 2])) / 3
          newImageData.data[i] = 0 // R
          newImageData.data[i + 1] = 0 // G
          newImageData.data[i + 2] = 0 // B
          newImageData.data[i + 3] = value // A
        } else {
          // 偶数像素使用第二张图的数据，并添加半透明白色效果
          const value = (img2Data.data[i] + img2Data.data[i + 1] + img2Data.data[i + 2]) / 3
          newImageData.data[i] = 255 // R
          newImageData.data[i + 1] = 255 // G
          newImageData.data[i + 2] = 255 // B
          newImageData.data[i + 3] = value // A
        }
      }
    }

    // 将处理后的像素数据绘制到canvas上
    ctx.putImageData(newImageData, 0, 0)

    // 转换为base64和blob
    const base64 = canvas.toDataURL('image/png')
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))

    return {
      base64,
      blobURL: URL.createObjectURL(blob)
    }
  } catch (error) {
    console.error('图片合并失败:', error)
    throw error
  }
}
