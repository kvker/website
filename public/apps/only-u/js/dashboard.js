/**
 * 仪表盘功能模块
 * 实现时间、日期、天气和日出日落时间显示
 */
const Dashboard = {
  // DOM元素
  elements: {
    currentTime: null,
    currentDate: null,
    currentWeekday: null,
    weatherIcon: null,
    weatherTemp: null,
    weatherDesc: null,
    sunriseTime: null,
    sunsetTime: null,
    // 新增元素
    dashboard: null,
    dashboardClose: null,
    dashboardCircle: null,
    circleTime: null
  },

  // 状态
  isCollapsed: false,

  // 天气图标映射
  weatherIcons: {
    0: '☀️',  // 晴（国内城市白天晴）
    1: '🌙',  // 晴（国内城市夜晚晴）
    2: '☀️',  // 晴（国外城市白天晴）
    3: '🌙',  // 晴（国外城市夜晚晴）
    4: '☁️',  // 多云
    5: '⛅',  // 晴间多云
    6: '⛅',  // 晴间多云
    7: '☁️',  // 大部多云
    8: '☁️',  // 大部多云
    9: '☁️',  // 阴
    10: '🌧️',  // 阵雨
    11: '⛈️',  // 雷阵雨
    12: '⛈️',  // 雷阵雨伴有冰雹
    13: '🌧️',  // 小雨
    14: '🌧️',  // 中雨
    15: '🌧️',  // 大雨
    16: '⛈️',  // 暴雨
    17: '⛈️',  // 大暴雨
    18: '⛈️',  // 特大暴雨
    19: '🌧️',  // 冻雨
    20: '🌨️',  // 雨夹雪
    21: '🌨️',  // 阵雪
    22: '🌨️',  // 小雪
    23: '🌨️',  // 中雪
    24: '🌨️',  // 大雪
    25: '🌨️',  // 暴雪
    26: '🌫️',  // 浮尘
    27: '🌫️',  // 扬沙
    28: '🌪️',  // 沙尘暴
    29: '🌪️',  // 强沙尘暴
    30: '🌫️',  // 雾
    31: '🌫️',  // 霾
    32: '💨',  // 风
    33: '💨',  // 大风
    34: '🌪️',  // 飓风
    35: '🌪️',  // 热带风暴
    36: '🌪️',  // 龙卷风
    37: '❄️',  // 冷
    38: '🌡️',  // 热
    99: '❓'   // 未知
  },

  // 星期映射
  weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],

  /**
   * 初始化仪表盘
   */
  init() {
    this.initElements()
    this.initToggleEvents()
    this.startTimeUpdate()
    this.updateDate()
    this.updateWeather()
    this.updateSunTimes()
  },

  /**
   * 初始化DOM元素
   */
  initElements() {
    this.elements.currentTime = document.getElementById('current-time')
    this.elements.currentDate = document.getElementById('current-date')
    this.elements.currentWeekday = document.getElementById('current-weekday')
    this.elements.weatherIcon = document.getElementById('weather-icon')
    this.elements.weatherTemp = document.getElementById('weather-temp')
    this.elements.weatherDesc = document.getElementById('weather-desc')
    this.elements.sunriseTime = document.getElementById('sunrise-time')
    this.elements.sunsetTime = document.getElementById('sunset-time')

    // 新增元素
    this.elements.dashboard = document.getElementById('dashboard')
    this.elements.dashboardClose = document.getElementById('dashboard-close')
    this.elements.dashboardCircle = document.getElementById('dashboard-circle')
    this.elements.circleTime = document.getElementById('circle-time')
  },

  /**
   * 初始化切换事件
   */
  initToggleEvents() {
    // 关闭按钮点击事件
    if(this.elements.dashboardClose) {
      this.elements.dashboardClose.addEventListener('click', () => {
        this.toggleCollapse()
      })
    }

    // 圆圈点击事件
    if(this.elements.dashboardCircle) {
      this.elements.dashboardCircle.addEventListener('click', () => {
        this.toggleCollapse()
      })
    }
  },

  /**
   * 切换收起/展开状态
   */
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed

    if(this.elements.dashboard) {
      if(this.isCollapsed) {
        this.elements.dashboard.classList.add('collapsed')
      } else {
        this.elements.dashboard.classList.remove('collapsed')
      }
    }
  },

  /**
   * 开始时间更新
   */
  startTimeUpdate() {
    this.updateTime()
    // 每秒更新一次时间
    setInterval(() => {
      this.updateTime()
    }, 1000)
  },

  /**
   * 更新时间显示
   */
  updateTime() {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    if(this.elements.currentTime) {
      this.elements.currentTime.textContent = `${hours}:${minutes}:${seconds}`
    }

    // 更新圆圈中的时间（只显示小时和分钟）
    if(this.elements.circleTime) {
      this.elements.circleTime.textContent = `${hours}:${minutes}`
    }
  },

  /**
   * 更新日期显示
   */
  updateDate() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const weekday = this.weekdays[now.getDay()]

    if(this.elements.currentDate) {
      this.elements.currentDate.textContent = `${year}年${month}月${date}日`
    }

    if(this.elements.currentWeekday) {
      this.elements.currentWeekday.textContent = weekday
    }
  },

  /**
   * 获取当前位置
   */
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if(!navigator.geolocation) {
        reject(new Error('浏览器不支持地理位置'))
        return {
          coords: {
            latitude: 39.9042,
            longitude: 116.4074
          }
        }
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  },

  /**
   * 更新天气信息
   */
  async updateWeather() {
    try {
      const position = await this.getCurrentPosition()
      window.currentPosition = position
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      // 使用心知天气API获取天气信息
      const apiKey = 'ms7yfydh195oxocx'
      const url = `https://api.seniverse.com/v3/weather/now.json?key=${apiKey}&location=${lat}:${lon}&language=zh-Hans&unit=c&start=0&days=1`

      const response = await fetch(url)
      const { results: [data] } = await response.json()

      if(data) {
        this.updateWeatherDisplay(data)
      } else {
        throw new Error('天气API返回错误')
      }
    } catch(error) {
      console.warn('获取天气数据失败:', error)
      this.setDefaultWeather()
    }
  },

  /**
   * 更新天气显示
   */
  updateWeatherDisplay(weatherData) {
    const temp = Math.round(weatherData.now.temperature)
    const description = weatherData.now.text
    const weatherCode = weatherData.now.code

    const icon = this.weatherIcons[weatherCode] || '🌤️'

    if(this.elements.weatherTemp) {
      this.elements.weatherTemp.textContent = `${temp}°C`
    }

    if(this.elements.weatherDesc) {
      this.elements.weatherDesc.textContent = description
    }

    if(this.elements.weatherIcon) {
      this.elements.weatherIcon.textContent = icon
    }
  },

  /**
   * 设置默认天气信息
   */
  setDefaultWeather() {
    if(this.elements.weatherTemp) {
      this.elements.weatherTemp.textContent = '--'
    }

    if(this.elements.weatherDesc) {
      this.elements.weatherDesc.textContent = '--'
    }

    if(this.elements.weatherIcon) {
      this.elements.weatherIcon.textContent = '--'
    }
  },

  /**
   * 更新日出日落时间
   */
  async updateSunTimes() {
    try {
      const position = await this.getCurrentPosition()
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const url = `/api/apps/sun/status?latitude=${lat}&longitude=${lon}`
      const response = await fetch(url)
      const { data } = await response.json()
      const sunrise = dayjs(data.sunrise).format('HH:mm')
      const sunset = dayjs(data.sunset).format('HH:mm')

      if(this.elements.sunriseTime) {
        this.elements.sunriseTime.textContent = sunrise
      }

      if(this.elements.sunsetTime) {
        this.elements.sunsetTime.textContent = sunset
      }
    } catch(error) {
      console.warn('获取日出日落时间失败:', error)
    }
  },

  /**
   * 计算日出日落时间
   * 使用简化的太阳位置算法
   */
  calculateSunTimes(date, lat, lon) {
    // 简化的日出日落时间计算
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))

    // 基于日期和纬度的简化计算
    let sunriseHour = 6
    let sunsetHour = 18

    // 根据季节调整
    if(dayOfYear >= 80 && dayOfYear <= 172) {
      // 春季 (3月21日 - 6月21日)
      sunriseHour = 6
      sunsetHour = 18
    } else if(dayOfYear >= 173 && dayOfYear <= 265) {
      // 夏季 (6月22日 - 9月22日)
      sunriseHour = 5
      sunsetHour = 19
    } else if(dayOfYear >= 266 && dayOfYear <= 355) {
      // 秋季 (9月23日 - 12月21日)
      sunriseHour = 6
      sunsetHour = 18
    } else {
      // 冬季 (12月22日 - 3月20日)
      sunriseHour = 7
      sunsetHour = 17
    }

    // 根据纬度微调
    const latAdjustment = Math.abs(lat) / 90 * 0.5
    sunriseHour += latAdjustment
    sunsetHour -= latAdjustment

    // 添加随机分钟数模拟真实变化
    const sunriseMinute = Math.floor(Math.random() * 30)
    const sunsetMinute = Math.floor(Math.random() * 30)

    const sunriseTime = `${String(Math.floor(sunriseHour)).padStart(2, '0')}:${String(sunriseMinute).padStart(2, '0')}`
    const sunsetTime = `${String(Math.floor(sunsetHour)).padStart(2, '0')}:${String(sunsetMinute).padStart(2, '0')}`

    return {
      sunrise: sunriseTime,
      sunset: sunsetTime
    }
  }
}

// 页面加载完成后初始化仪表盘
document.addEventListener('DOMContentLoaded', () => {
  Dashboard.init()
}) 