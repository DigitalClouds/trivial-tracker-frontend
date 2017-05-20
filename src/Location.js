import env from './env.js';

import {load as loadGoogleApi, loaded as loadedGoogleApi, Map, Marker} from 'vue-google-maps';

const template =
    `<div id="location">
        <div v-if="isReady">
            <div id="map"></div>
            <google-map></google-map>
        </div>
        <div v-else>
            Loading...
        </div>
    </div>`;

loadGoogleApi(env.googleMapsApiKey);

export default new Vue.Component('location', {
    _apiReady: false,
    _api: null,
    _map: null,
    template,
    created() {
        loadedGoogleApi.then(() => {
            this._apiReady = true;
        })
    },
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
        }
    },
    computed: {
        isReady: function () {
            return this._apiReady;
        }
    },
    components: {
        'google-map': Map
    }
});
