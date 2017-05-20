<template>
    <div id="location">
        <div v-if="isReady">
            <google-map :center="center" :zoom="12"></google-map>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>
</template>

<script>

    import env from './env.js';

    import {load as loadGoogleApi, loaded as loadedGoogleApi, Map, Marker} from 'vue-google-maps';
    import {getLocation} from "./GeoLocationPromisified";

    export default {
        name: 'location',
        created() {
            // FIXME: Don't let this get called twice, it'll load the API multiple times, which is bad.
            let promise;
//            if(!google || !google.maps) {
                loadGoogleApi(env.googleMapsApiKey);
                promise = loadedGoogleApi.then(() => {
                    return getLocation()
                });
//            }
//            else{
//                promise = new Promise((resolve)=>resolve());
//            }
            promise.then((location) => {
                this.center = {lat: location.latitude, lng: location.longitude};
                this.isReady = true;
            });

        },
        data () {
            return {
                isReady: false,
                center: {lat: 0, lng: 0}
            }
        },
        methods: {},
        props: {},
        computed: {},
        components: {
            'google-map': Map
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
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
