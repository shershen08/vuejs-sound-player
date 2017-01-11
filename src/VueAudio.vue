<template>
    <div class="vue-sound-wrapper">
        <div class="vue-sound-buttons">
            <div class="vue-sound__player">
                <div class="btn-group btn-group-xs" role="group">
                    <a @click="stop()" class="btn btn-default"><i class="icon-white glyphicon glyphicon-stop"></i></a>
                    <a @click="play()" v-bind:class="playStyle"><i class="icon-white glyphicon glyphicon-play"></i></a>
                    <a @click="pause()" v-bind:class="pauseStyle"><i class="icon-white glyphicon glyphicon-pause"></i></a>
                    <a class="btn btn-default vue-sound__playback-time-wrapper">
                        <div v-bind:style="progressStyle" class="vue-sound__playback-time-indicator"></div>
                        <span v-if="loaded" class="vue-sound__playback-time-current">{{currentTime}}</span>
                        <span class="vue-sound__playback-time-separator"></span>
                        <span class="vue-sound__playback-time-total" v-if="loaded">{{duration}}</span>
                    </a>
                    <a @click="download()" class="btn btn-default"><i class="glyphicon glyphicon-floppy-disk"></i></a>
                    <a @click="mute()" v-bind:class="mutedStyle"><i class="icon-white glyphicon glyphicon-equalizer"></i></a>
                </div>

            </div>
            <audio ref="audiofile" :src="file" preload="auto" style="display:none;"></audio>
</div>
</div>
</template>

<script>
    const buttonClass = 'btn btn-default';
    let audio;
    let duration;
    const convertTimeHHMMSS = ( val ) => {
        let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);
        return (hhmmss.indexOf('00:') == 0) ? hhmmss.substr(3) : hhmmss;
    };
    const toggleActive = (className) => {
        return (className.indexOf('active') > -1) ? className.replace('active', '') : (className + ' active');
    }
    export default {
        name: "vue-audio",
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
                return audio ? convertTimeHHMMSS( duration ) : '';
            }
        },
        data() {
            return {
                isMuted: false,
                loaded: false,
                playing: false,
                paused: false,
                mutedStyle: buttonClass,
                playStyle: buttonClass,
                pauseStyle: buttonClass,
                progressStyle : '',
                currentTime: 0
            };
        },
        methods: {
            stop: function () {
                audio.pause();
                this.pauseStyle = this.playStyle = buttonClass;
                this.paused = this.playing = false;
                this.currentTime = 0;
            },
            play: function () {
                if(this.playing) return;
                this.paused = false;
                this.pauseStyle = buttonClass;
                this.playStyle = toggleActive(this.playStyle);
                audio.play();
            },
            pause: function () {
                this.paused = !this.paused;
                (this.paused) ? audio.pause() : audio.play()
                this.pauseStyle = toggleActive(this.pauseStyle);
            },
            download: function () {
                audio.pause();
                window.open( this.file, 'download' );
            },
            mute: function () {
                this.isMuted = !this.isMuted;
                audio.muted = this.isMuted;
                this.mutedStyle = toggleActive(this.mutedStyle);
            },
            _handleLoaded: function () {
                if ( audio.readyState >= 2 ) {
                    if ( this.autoPlay ) audio.play();
                    this.loaded = true;
                    duration = parseInt(audio.duration);
                } else {
                    throw new Error( 'Failed to load sound file' );
                }
            },
            _handlePlayingUI: function ( e ) {
                let currTime = parseInt( audio.currentTime );
                let percentage = parseInt((currTime / duration)*100);
                this.progressStyle = `width:${percentage}%;`;
                this.currentTime = convertTimeHHMMSS(currTime);
            },
            init: function () {
                audio.addEventListener( 'timeupdate', this._handlePlayingUI );
                audio.addEventListener( 'loadeddata', this._handleLoaded );
            }
        },
        beforeMount: function () {
            this.mutedStyle = buttonClass;
                // playStyle: buttonClass,
                // pauseStyle: buttonClass,
        },
        mounted: function () {
            audio = this.$refs.audiofile;
            this.init();
        },
        beforeDestroy: function () {
            audio.removeEventListener( 'timeupdate', this._handlePlayingUI );
            audio.removeEventListener( 'loadeddata', this._handleLoaded );
        }

    };
</script>

<style lang="sass">
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