/**
 * Created by dosborne on 20/05/17.
 */
export function getLocation() {
    "use strict";
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
    })
}