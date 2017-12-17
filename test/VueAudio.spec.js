import Vue from 'vue'
import VueAudio from '../src/VueAudio.vue'
import { baseVolumeValue, generateUUID, convertTimeHHMMSS, prefixCls } from '../src/vueaudio.plugin.js'
import { expect } from 'chai'

describe('Tool', () => {
  it('test prefixCls type', () => {
    expect(prefixCls).to.be.a('string')
  })

  it('test generateUUID method', () => {
    expect(generateUUID()).to.have.match(/^.{8}-.{4}-4.{3}$/)
    expect(generateUUID()).to.lengthOf(18)
  })

  it('test convertTimeHHMMSS method', () => {
    expect(convertTimeHHMMSS(60)).to.equal('01:00')
    expect(convertTimeHHMMSS(130)).to.equal('02:10')
    expect(convertTimeHHMMSS(200)).to.equal('03:20')
  })
})

describe('VueAudio', () => {
  describe('props attribute', () => {
    let vm, fileUrl = "http://ozo3wlmi6.bkt.clouddn.com/first.mp3"

    beforeEach(() => {
      vm = new Vue(VueAudio)
      vm.file = fileUrl
    })

    it('File prop', () => {
      vm.$mount()

      const audio = vm.$refs['audiofile']
      expect(audio.src).to.equal(fileUrl)
    })

    it('Auto play prop', () => {
      vm.$mount()
      let audio = vm.$refs['audiofile']
      expect(vm.paused).to.equal(true)
    })

    it('Loop prop', (done) => {
      vm.$mount()
      let audio = vm.$refs['audiofile']

      // test change loop
      vm.changeLoop()
      Vue.nextTick(() => {
        expect(audio.loop).to.equal(true)
        done()
      })
    })
  });

  describe('computed attribute', () => {
    let vm

    beforeEach(() => {
      vm = new Vue(VueAudio)
    })

    it('duration', () => {
      expect(vm.duration).to.equal('')
      vm.$mount()
      expect(vm.duration).to.equal(convertTimeHHMMSS(vm.totalDuration))
    }),
    it('playerId', () => {
      expect(vm.playerId).to.equal('player-0')
      vm.$mount()
      expect(vm.playerId).to.have.match(/^player-.{8}-.{4}-4.{3}$/)
    }),
    it('classes', () => {
      expect(vm.classes).to.equal(prefixCls)
      vm.$mount()
      expect(vm.classes).to.equal(prefixCls)
    })
  });

  describe('Class attribute', () => {
    it('set correct default data', () => {
      expect(VueAudio.data).to.be.a('function')
      let defaultData = VueAudio.data()
      expect(defaultData.isMuted).to.equal(false)
      expect(defaultData.loaded).to.equal(false)
      expect(defaultData.playing).to.equal(false)
      expect(defaultData.paused).to.equal(true)
      expect(defaultData.progressStyle).to.equal('')
      expect(defaultData.currentTime).to.equal('00:00')
      expect(defaultData.uuid).to.equal('0')
      expect(defaultData.audio).to.equal(undefined)
      expect(defaultData.totalDuration).to.equal(0)
      expect(defaultData.hideVolumeSlider).to.equal(false)
      expect(defaultData.volumeValue).to.equal(baseVolumeValue)
    })
  });

  describe('instance methods', () => {
    let vm

    beforeEach(() => {
      vm = new Vue(VueAudio).$mount()
    })

    it('check audio object', () => {
      const audio = vm.getAudio()
      expect(vm.$refs['audiofile']).to.equal(audio)
      expect(audio.tagName.toLowerCase()).to.equal('audio')
      expect(audio.style.display).to.equal('none')
      expect(audio.preload).to.equal('auto')
    })

    it('test toggle volume method', () => {
      expect(vm.hideVolumeSlider).to.equal(false)
      vm.toggleVolume()
    })
  });
})
