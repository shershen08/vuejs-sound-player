<template>
    <div class="vue-sound-wrapper">
        <div class="vue-sound__player">
            <div class="btn-group btn-group-xs" role="group">
                <a @click="stop()" title="Stop" class="btn btn-default"><i class="icon-white glyphicon glyphicon-stop"></i></a>
                <a @click="play()" title="Play" v-bind:class="playStyle"><i class="icon-white glyphicon glyphicon-play"></i></a>
                <a @click="pause()" title="Pause" v-bind:class="pauseStyle"><i class="icon-white glyphicon glyphicon-pause"></i></a>
                <a v-on:click="setPosition" class="btn btn-default vue-sound__playback-time-wrapper" title="Time played : Total time">
                    <div v-bind:style="progressStyle" class="vue-sound__playback-time-indicator"></div>
                    <span class="vue-sound__playback-time-current">{{currentTime}}</span>
                    <span class="vue-sound__playback-time-separator"></span>
                    <span class="vue-sound__playback-time-total">{{duration}}</span>
                </a>
                <a @click="download()" class="btn btn-default"><i class="glyphicon glyphicon-floppy-disk"></i></a>
                <a @click="mute()" v-bind:class="mutedStyle" title="Mute"><i class="icon-white glyphicon glyphicon-volume-off"></i></a>
                <a v-on:mouseover="toggleVolume()" class="btn btn-default" title="Volume"><i class="icon-white glyphicon glyphicon-equalizer"></i></a>
            </div>
            <input orient="vertical" v-model.lazy="volumeValue" v-on:change="updateVolume()" v-show="hideVolumeSlider" type="range" min="0" max="100" class="volume-slider"/>
        </div>
        <audio v-bind:id="playerId" ref="audiofile" :src="file" preload="auto" style="display:none;"></audio>
    </div>
</template>

<script src="./vueaudio.plugin.js"></script>

<style lang="sass" scoped>
    .vue-sound-wrapper {

    }
    .vue-sound__player {

    }
    .vue-sound__navigator {

    }
    .vue-sound__playback-time {

    }
    .vue-sound__playback-time-separator {

    }
    .vue-sound__playback-time-separator::after {
        content:' : ';
    }
    .vue-sound__playback-time-total {

    }
    .volume-slider {
        -webkit-appearance: slider-vertical;
        position: relative;
        height: 100px;
        top: -60px;
        left: 50px;
    }
    .vue-sound__playback-time-indicator {
        background: #aaa;
        height: 22px;
        position: absolute;
        z-index: -1;
        top:-1px;
        left: 0px;
    }
    .vue-sound__player .vue-sound__playback-time-wrapper {
        background: transparent;
    }
</style>
