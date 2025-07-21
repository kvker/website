const engines = [
  { en: 'bing', link: 'https://www.bing.com/search?q=%keyword%', nick: 'bing', title: 'Bing', cn: 'biying' },
  { en: 'baidu', link: 'https://www.baidu.com/s?wd=%keyword%', nick: 'baidu', title: '百度', cn: 'baidu' },
  { en: 'google', link: 'https://www.google.com.hk/search?q=%keyword%', nick: '谷歌', title: 'Google', cn: 'guge' },
  { nick: 'taobao', title: '淘宝', cn: 'taobao', en: 'taobao', link: 'https://s.taobao.com/search?q=%keyword%' },
  { cn: 'jingdong', en: 'jingdong', link: 'https://search.jd.com/Search?keyword=%keyword%&enc=utf-8', nick: 'jd', title: '京东' },
  { cn: 'tianmao', en: 'tmall', link: 'https://list.tmall.com/search_product.htm?q=%keyword%', nick: 'tmall', title: '天猫' },
  { cn: 'yamaxun', en: 'amazon', link: 'https://www.amazon.cn/s?k=%keyword%', nick: 'amazon', title: '亚马逊' },
  { link: 'http://list.mogujie.com/s?q=%keyword%', nick: 'mogujie', title: '蘑菇街', cn: 'mogujie', en: 'mogujie' },
  { nick: 'xiaomi', title: '小米', cn: 'xiaomi', en: 'xiaomi', link: 'https://www.mi.com/search?keyword=%keyword%' },
  { title: '爱奇艺', cn: 'aiqiyi', en: 'iqiyi', link: 'http://so.iqiyi.com/so/q_%keyword%', nick: 'iqiyi' },
  { title: '优酷', cn: 'youku', en: 'youku', link: 'http://www.soku.com/search_video/q_%keyword%', nick: 'youku' },
  { link: 'https://search.bilibili.com/all?keyword=%keyword%', nick: 'bili', title: 'bilibili', cn: '哔哩哔哩', en: 'bilibili' },
  { link: 'https://v.qq.com/x/search/?q=%keyword%', nick: 'qqshipin', title: '腾讯视频', cn: 'tengxunshipin', en: 'tengxunshipin' },
  { en: 'youtube', link: 'https://www.youtube.com/results?search_query=%keyword%', nick: '油管', title: 'YouTube', cn: 'youtube' },
  { nick: 'huaban', title: '花瓣', cn: 'huaban', en: 'huaban', link: 'http://huaban.com/search/?q=%keyword%' },
  { cn: 'dribbble', en: 'drible', link: 'https://dribbble.com/search?q=%keyword%', nick: 'dribble', title: 'Dribbble' },
  {
    cn: 'behance',
    en: 'behance',
    link: 'https://www.behance.net/search?content=projects&sort=appreciations&time=week&search=%keyword%',
    nick: 'behance',
    title: 'Behance'
  },
  { title: 'Pinterest', cn: 'pinterest', en: 'pinterest', link: 'https://www.pinterest.com/search/pins/?q=%keyword%', nick: 'pinter' },
  { en: 'reeoo', link: 'http://reeoo.com/?s=%keyword%', nick: 'reeoo', title: 'Reeoo', cn: 'reeoo' },
  { link: 'http://www.iconfont.cn/search/index?searchType=icon&q=%keyword%', nick: '矢量', title: 'Iconfont', cn: '矢量图', en: 'icon' },
  { link: 'http://www.zcool.com.cn/search/content?&word=%keyword%', nick: '站酷', title: '站酷', cn: '站酷', en: 'zcool' },
  {
    en: 'freepik',
    link: 'https://www.freepik.com/index.php?goto=2&searchform=1&k=%keyword%',
    nick: 'freepik',
    title: 'Freepik',
    cn: 'freepik'
  },
  { en: 'zhihu', link: 'https://www.zhihu.com/search?type=content&q=%keyword%', nick: 'zihu', title: '知乎', cn: 'zhihu' },
  { title: '翻译', cn: 'youdaofanyi', en: 'translate', link: 'http://www.youdao.com/w/%keyword%', nick: 'fanyi' },
  {
    title: 'Kindle',
    cn: 'kindle',
    en: 'kindle',
    link: 'https://www.amazon.cn/s/ref=nb_sb_noss?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&url=node%3D116169071&field-keywords=%keyword%',
    nick: 'kindle'
  },
  { link: 'https://www.douban.com/search?q=%keyword%', nick: 'douban', title: '豆瓣', cn: 'douban', en: 'douban' },
  { link: 'http://weixin.sogou.com/weixin?type=2&query=%keyword%', nick: 'weixin', title: '微信', cn: 'weixin', en: 'wechat' },
  { en: 'wiki', link: 'https://en.wikipedia.org/wiki/%keyword%', nick: '维基', title: 'Wiki', cn: '维基百科' },
  { en: 'map', link: 'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D%keyword%', nick: 'ditu', title: '地图', cn: 'baiduditu' },
  { link: 'https://m.kuaidi100.com/result.jsp?nu=%keyword%', nick: 'kuaidi', title: '快递110', cn: 'kuaidi', en: 'express' },
  { link: 'https://twitter.com/search?q=%keyword%', nick: 'tuite', title: 'Twitter', cn: '推特', en: 'twitter' },
  { en: 'facebook', link: 'https://www.facebook.com/search/top/?init=quick&q=%keyword%', nick: '非死不可', title: 'Facebook', cn: '脸书' },
  { link: 'http://travel.qunar.com/search/all/%keyword%', nick: '去哪', title: '去哪儿', cn: 'qunaer', en: 'gowhere' },
  { link: 'http://s.weibo.com/weibo/%keyword%', nick: '围脖', title: '微博', cn: 'weibo', en: 'microblog' },
  { en: 'meituan', link: 'http://meituan.com/s/%keyword%', nick: '外卖', title: '美团', cn: 'meituan' },
  { title: '云音乐', cn: '音乐', en: 'music', link: 'http://music.163.com/#/search/m/?s=%keyword%', nick: 'yinyue' },
  { title: '斗图啦', cn: 'doutula', en: 'doutu', link: 'http://www.doutula.com/search?keyword=%keyword%', nick: '斗图' },
  {
    link: 'http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1510849585674_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%keyword%',
    nick: 'tupian',
    title: '图片',
    cn: 'tupian',
    en: 'image'
  },
  { cn: 'npm', en: 'npm', link: 'https://www.npmjs.com/search?q=%keyword%', nick: 'npm', title: 'NPM' },
  { cn: 'github', en: 'github', link: 'https://github.com/search?utf8=%E2%9C%93&q=%keyword%', nick: 'git', title: 'Github' },
  { cn: 'jquery', en: 'jquery', link: 'http://jquery.cuishifeng.cn/%keyword%.html', nick: '$', title: 'jQuery' },
  { cn: 'nodejs', en: 'nodejs', link: 'http://nodejs.cn/api/%keyword%.html', nick: 'node', title: 'Node.js' },
  {
    title: 'GooglePlay',
    cn: 'gugeshichang',
    en: 'googleapp',
    link: 'https://play.google.com/store/search?q=%keyword%&hl=cn',
    nick: 'gugeapp'
  },
  { link: 'http://app.mi.com/search?keywords=%keyword%', nick: 'xiaomistore', title: '小米应用', cn: 'xiaomiyingyong', en: 'mistore' },
  {
    nick: 'qstore',
    title: '应用宝',
    cn: 'yingyongbao',
    en: 'qqstore',
    link: 'https://webcdn.m.qq.com/webapp/homepage/index.html#/appSearch?kw=%keyword%'
  }
]

document.addEventListener('alpine:init', () => {
  Alpine.data('mainData', () => ({
    engines,
    currentEngine: engines[0],
    value: '',
    showEngineModal: false,
    date: dayjs().format('MM-DD'),
    weekday: '星期' + getWeekday(dayjs().day() - 1),

    init() {
      // 监听ESC键关闭弹窗
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && this.showEngineModal) {
          this.closeEngineModal()
        }
      })
    },
    search(e) {
      if(e.ctrlKey) return

      const splitTexts = this.value.split(' ')
      const length = splitTexts.length
      if(length > 1) {
        const maybeEngine = splitTexts[length - 1]
        const currentEngine = this.engines.find(engine => engine.title === maybeEngine || engine.nick === maybeEngine || engine.cn === maybeEngine || engine.en === maybeEngine)
        if(currentEngine) {
          this.currentEngine = currentEngine
          splitTexts.pop()
          return window.open(this.currentEngine.link.replace('%keyword%', String(splitTexts).replace(/,/g, ' ')))
        }
      }
      this.normalSearch()
    },
    normalSearch() {
      window.open(this.currentEngine.link.replace('%keyword%', this.value))
    },
    clickCurrentEngine() {
      this.showEngineModal = true
    },
    closeEngineModal() {
      this.showEngineModal = false
    },
    selectEngine(engine) {
      this.currentEngine = engine
      this.closeEngineModal()
    }
  }))
})