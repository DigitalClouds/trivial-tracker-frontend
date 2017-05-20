<template>
    <div id="location">
        <div class="location-wrapper" v-if="isReady">
            <google-map :center="center" :zoom="12">
                <google-marker :position="center"></google-marker>
            </google-map>
        </div>
        <div class="location-wrapper" v-else>
            Loading...
        </div>
    </div>
</template>

<script>

    import env from './env.js';

    import * as VueGoogleMaps from 'vue2-google-maps';
    import {getLocation} from "./GeoLocationPromisified";

    export default {
        name: 'location',
        created() {
            // FIXME: Don't let this get called twice, it'll load the API multiple times, which is bad.
            let promise;
//            if(!google || !google.maps) {
                VueGoogleMaps.load(env.googleMapsApiKey);

                promise = VueGoogleMaps.loaded.then(() => {
                    return getLocation()
                });
//            }
//            else{
//                promise = new Promise((resolve)=>resolve());
//            }
            promise.then((location) => {

                this.center = {lat: location.coords.latitude, lng: location.coords.longitude};
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
            'google-map': VueGoogleMaps.Map,
            'google-marker': VueGoogleMaps.Marker
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
