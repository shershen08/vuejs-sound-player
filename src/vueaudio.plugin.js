  const baseVolumeValue = 7.5
  const defaultButtonClass = 'btn btn-default'
  let audio, uuid

  const generateUUID = () => {
      /* eslint-disable */
    return 'xxxxxxxx-xxxx-4xxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
     /* eslint-enable */
  }
  const convertTimeHHMMSS = (val) => {
    let hhmmss = new Date(val * 1000).toISOString().substr(11, 8)
    return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss
  }
  const toggleActive = (className) => {
    return (className.indexOf('active') > -1) ? className.replace('active', '') : (className + ' active')
  }
  export default {
    name: 'vue-audio',
    props: {
      file: {
        type: String,
        default: null
      },
      autoPlay: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      duration: function () {
        return this.audio ? convertTimeHHMMSS(this.totalDuration) : ''
      },
      playerId: function () {
        return 'player-' + this.uuid
      }
    },
    data () {
      return {
        isMuted: false,
        loaded: false,
        playing: false,
        paused: false,
        mutedStyle: defaultButtonClass,
        playStyle: defaultButtonClass,
        pauseStyle: defaultButtonClass,
        progressStyle: '',
        currentTime: '00:00',
        uuid: 0,
        audio: undefined,
        totalDuration: 0,
        hideVolumeSlider: false,
        volumeValue: baseVolumeValue
      }
    },
    methods: {
      setPosition: function name (e) {
        let tag = e.target
        if (!this.playing) return
        if (e.target.tagName === 'SPAN') {
          tag = e.target.parentElement
        }
        const pos = tag.getBoundingClientRect()
        const seekPos = (e.clientX - pos.left) / pos.width
        this.audio.currentTime = parseInt(this.audio.duration * seekPos)
      },
      updateVolume: function name () {
        this.hideVolumeSlider = false
        this.audio.volume = this.volumeValue / 100
        if (this.volumeValue / 100 > 0) {
          this.isMuted = this.audio.muted = false
          this.mutedStyle = defaultButtonClass
        }
      },
      toggleVolume: function () {
        this.hideVolumeSlider = true
      },
      stop: function () {
        this.pauseStyle = this.playStyle = defaultButtonClass
        this.paused = this.playing = false
        this.audio.pause()
        this.audio.currentTime = 0
      },
      play: function () {
        if (this.playing) return
        this.paused = false
        this.pauseStyle = defaultButtonClass
        this.playStyle = toggleActive(this.playStyle)
        this.audio.play()
        this.playing = true
      },
      pause: function () {
        this.paused = !this.paused;
        (this.paused) ? this.audio.pause() : this.audio.play()
        this.pauseStyle = toggleActive(this.pauseStyle)
      },
      download: function () {
        this.audio.pause()
        window.open(this.file, 'download')
      },
      mute: function () {
        this.isMuted = !this.isMuted
        this.audio.muted = this.isMuted
        this.mutedStyle = toggleActive(this.mutedStyle)
        this.volumeValue = this.isMuted ? 0 : 75
      },
      _handleLoaded: function () {
        if (this.audio.readyState >= 2) {
          if (this.autoPlay) this.audio.play()
          this.loaded = true
          this.totalDuration = parseInt(this.audio.duration)
        } else {
          throw new Error('Failed to load sound file')
        }
      },
      _handlePlayingUI: function (e) {
        let currTime = parseInt(this.audio.currentTime)
        let percentage = parseInt((currTime / this.totalDuration) * 100)
        this.progressStyle = `width:${percentage}%;`
        this.currentTime = convertTimeHHMMSS(currTime)
      },
      _handlePlayPause: function (e) {
        if (e.type === 'pause' && this.paused === false && this.playing === false) {
          this.progressStyle = `width:0%;`
          this.currentTime = '00:00'
        }
      },
      init: function () {
        this.audio.addEventListener('timeupdate', this._handlePlayingUI)
        this.audio.addEventListener('loadeddata', this._handleLoaded)
        this.audio.addEventListener('pause', this._handlePlayPause)
        this.audio.addEventListener('play', this._handlePlayPause)
      },
      getAudio: function () {
        return this.$el.querySelectorAll('audio')[0]
      }
    },
    mounted: function () {
      this.uuid = generateUUID()
      this.audio = this.$el.querySelectorAll('audio')[0]
      this.init()
    },
    beforeDestroy: function () {
      this.audio.removeEventListener('timeupdate', this._handlePlayingUI)
      this.audio.removeEventListener('loadeddata', this._handleLoaded)
      this.audio.removeEventListener('pause', this._handlePlayPause)
      this.audio.removeEventListener('play', this._handlePlayPause)
    }

  }
