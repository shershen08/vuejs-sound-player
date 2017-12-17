<template>
  <div :class="`${classes}-wrapper`">
    <div :class="`${classes}__player`">
      <a @click="stop()" title="Stop" class="icon-stop2" ></a>
      <a @click="pause()" title="Play" :class="[ paused ? 'icon-play3' : 'icon-pause2' ]"></a>
      <div v-on:click="setPosition" :class="`${classes}__playback-time-wrapper`" title="Time played : Total time">
          <div v-bind:style="progressStyle" :class="`${classes}__playback-time-indicator`"></div>
          <span :class="`${classes}__playback-time-current`">{{currentTime}}</span>
          <span :class="`${classes}__playback-time-separator`"></span>
          <span :class="`${classes}__playback-time-total`">{{duration}}</span>
      </div>
      <div :class="`${classes}__extern-wrapper`">
        <a @click="download()" class="icon-download"></a>
        <a @click="changeLoop()" :class="[ innerLoop ? 'icon-spinner10' : 'icon-spinner11']"></a>
        <a @click="mute()" :class="[isMuted ? 'icon-volume-mute2': 'icon-volume-high' ]" title="Mute"></a>
        <a v-on:mouseover="toggleVolume()" class="volume-toggle icon-paragraph-justify" title="Volume">
          <input orient="vertical" v-model.lazy="volumeValue" v-on:change="updateVolume()" v-show="hideVolumeSlider" type="range" min="0" max="100" class="volume-slider"/>
        </a>

      </div>
    </div>
    <audio v-bind:id="playerId" :loop="innerLoop" ref="audiofile" :src="file" preload="auto" style="display:none;"></audio>
  </div>
</template>

<script src="./vueaudio.plugin.js"></script>

<style lang="scss" scoped>
  $prefixCls: "vue-sound";
  .#{$prefixCls}-wrapper {
    .#{$prefixCls}__player {
      height: 30px;
      line-height: 30px;

      a {
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
      }

      .#{$prefixCls}__extern-wrapper {
        display: inline-block;
        margin-left: 10px;

        > a {
          margin-right: 5px;
          vertical-align: 0;
        }

        .volume-toggle {
          position: relative;

          .volume-slider {
            cursor: pointer;
            position: absolute;
            top: 0;
            width: 80px;
            left: 24px;
          }
        }
      }

      .#{$prefixCls}__playback-time-wrapper {
        background: transparent;
        position: relative;
        width: 250px;
        display: inline-block;
        background: #e0dcd7;
        height: 3px;
        cursor: pointer;
        font-size: 14px;
        vertical-align: middle;

        .#{$prefixCls}__playback-time-separator::after {
            content:' : ';
        }

        .#{$prefixCls}__playback-time-total {

        }

        .#{$prefixCls}__playback-time-indicator {
            background: #5099ff;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
        }
      }
    }
  }
</style>
