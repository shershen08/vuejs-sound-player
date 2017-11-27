import Vue from 'vue'
import VueAudio, { baseVolumeValue } from '../src/VueAudio.vue'
import { expect } from 'chai'

describe('VueAudio', () => {
  // 检查原始组件选项
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
    expect(defaultData.volumeValue).to.equal(7.5)
  })

  it('check audio object', () => {
    const vm = new Vue(VueAudio).$mount()
    const audio = vm.getAudio()
    expect(vm.$refs['audiofile']).to.equal(audio)
    expect(audio.tagName.toLowerCase()).to.equal('audio')
    expect(audio.style.display).to.equal('none')
    expect(audio.preload).to.equal('auto')
  })
})
