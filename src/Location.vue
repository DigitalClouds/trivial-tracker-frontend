<template>
    <div id="location">
        <layout></layout>
        <div class="location-wrapper" v-if="isReady">
            <google-map :center="center" :zoom="14">
                <google-marker :position="center"></google-marker>
                <google-marker :position="targetPosition"></google-marker>
            </google-map>
            <countdown :time="totalTime * 1000" v-on:countdownend="timerExpired" ref="countdown">
                <template scope="props">Time remaining: {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds</template>
            </countdown>
        </div>
        <div class="location-wrapper" v-else>
            Loading...
        </div>
    </div>
</template>

<script>

    import env from './env.js';

    import * as VueGoogleMaps from 'vue2-google-maps';
    import VueCountdown from 'vue-countdown';
    import {getLocation} from "./GeoLocationPromisified";
    import {getNearbyLocation, getPathToTarget, getDistanceBetween} from './LocationTargetService';
    import Layout from "./Layout.vue";
    // leeway for end point
    const threshold = 100;
    const tickRate = 5000;

    export default {
        name: 'location',
        created() {
            // FIXME: Don't let this get called twice, it'll load the API multiple times, which is bad.
            let promise;
            if(!window.google || !window.google.maps) {
                VueGoogleMaps.load(env.googleMapsApiKey,null,['places','geometry']);

                promise = VueGoogleMaps.loaded.then(() => {
                    return getLocation();
                });
            }
            else{
                promise = getLocation();
            }
            promise.then((location) => {
                this.center = {lat: location.coords.latitude, lng: location.coords.longitude};
                return getNearbyLocation(this.center, Number(this.randomLocationRadius));
            }).then((targetLocation) => {
                this.targetPosition = targetLocation.geometry.location;
                console.dir(this.targetPosition);
                return getPathToTarget(this.center, this.targetPosition);
            }).then((directions) => {
                const route = directions.routes[0];
                const routeLeg = route.legs[0];this.isReady = true;
                this.totalTime = routeLeg.duration.value;
                this.interval = setInterval(() => {
                    getLocation().then((location) => {
                        this.center = {lat: location.coords.latitude, lng: location.coords.longitude};
                        const currentLocation = {lat(){ return location.coords.latitude }, lng(){return location.coords.longitude} };
                        this.checkDistance(currentLocation, this.targetPosition).then((inRange) => {
                            if(inRange){
                                this.gotoNextQuestionOrWin();
                                clearInterval(this.interval);
                            }
                        }, tickRate);
                    })

                });
                this.isReady = true;
            })

        },
        data () {
            return {
                isReady: false,
                center: {lat: 0, lng: 0},
                targetPosition: {lat: 0, lng: 0},
                totalTime: 0,
                ticking: true,
                interval: 0
            }
        },
        methods: {
            timerExpired(){
                this.ticking = false;
                this.checkDistance().then((inRange) => {
                    if(inRange){
                        // go to next question
                        this.gotoNextQuestionOrWin();
                    }
                    else{
                        // go to fail screen (and post to twitter)
                    }
                });
            },
            checkDistance(){
                return getLocation().then((location) =>{
                    const currentLocation = {lat(){ return location.coords.latitude }, lng(){return location.coords.longitude} };
                    return getDistanceBetween(currentLocation, this.targetPosition) <= threshold;
                })
            },
            gotoNextQuestionOrWin(){
                console.log('NEXT QUESTION PLEASE!');
                this.$refs.countdown.stop();
                alert("WINNAR!");
            }
        },
        props: ['randomLocationRadius'],
        computed: {},
        components: {
            Layout,
            'google-map': VueGoogleMaps.Map,
            'google-marker': VueGoogleMaps.Marker,
            'countdown': VueCountdown
        }
    }
</script>

<style lang="scss">
    .location-wrapper{
        height: 600px;
    }

    .vue-map-container{
        height:100%;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
