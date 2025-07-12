/**
 * 白噪音播放模块 - Alpine.js版本
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('whiteNoiseData', () => ({
    audio: null,
    isPlaying: false,
    currentIndex: 0,
    audioList: [],

    init() {
      this.initAudioList()
      this.loadAudio()
    },

    initAudioList() {
      if(typeof media !== 'undefined' && media.audio && media.audio['white-noise']) {
        this.audioList = media.audio['white-noise']
      } else {
        this.audioList = [
          'https://static.dirtyrabbit.work/audio/white-noise/%E5%9F%8E%E5%B8%82%E7%B9%81%E5%8D%8E%E8%A1%97%E9%81%93%E7%99%BD%E5%99%AA%E9%9F%B3.mp3',
          'https://static.dirtyrabbit.work/audio/white-noise/%E8%B6%85%E7%BA%AF%E5%87%80%E7%9A%84%E5%AE%A4%E5%86%85%E7%99%BD%E5%99%AA%E9%9F%B3.mp3'
        ]
      }
    },

    loadAudio() {
      if(this.audioList.length === 0) return

      this.currentIndex = Math.floor(Math.random() * this.audioList.length)
      this.createAudio()
    },

    createAudio() {
      if(this.audio) {
        this.audio.pause()
        this.audio.remove()
      }

      this.audio = new Audio()
      this.audio.src = this.audioList[this.currentIndex]
      this.audio.loop = false
      this.audio.volume = 1

      this.audio.addEventListener('ended', () => {
        this.playNext()
      })

      this.audio.addEventListener('canplaythrough', () => {
        console.log('White noise audio loaded')
      })

      this.audio.addEventListener('error', (e) => {
        console.error('White noise audio error:', e)
        this.playNext()
      })
    },

    togglePlay() {
      if(this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
    },

    play() {
      if(this.audioList.length === 0) return

      if(!this.audio) {
        this.createAudio()
      }

      this.audio.play().then(() => {
        this.isPlaying = true
      }).catch((error) => {
        console.error('Failed to play white noise:', error)
        this.playNext()
      })
    },

    stop() {
      if(this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
      }
      this.isPlaying = false
    },

    playNext() {
      if(this.audioList.length === 0) return

      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * this.audioList.length)
      } while(nextIndex === this.currentIndex && this.audioList.length > 1)

      this.currentIndex = nextIndex
      this.createAudio()

      if(this.isPlaying) {
        this.audio.play().catch((error) => {
          console.error('Failed to play next white noise:', error)
          this.playNext()
        })
      }
    }
  }))
}) 