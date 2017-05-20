/**
 * Created by dosborne on 20/05/17.
 */
"use strict";
export function getNearbyPoint(location, radius) {
    const output = document.createElement('div');
    const placesService = new google.maps.places.PlacesService(output);
    return new Promise((resolve, reject) => {
        // TODO: get the keyword from a reverse geocode of the current loc, rather than the hardcoded one
        placesService.radarSearch({location, radius, keyword: 'Lincoln'}, (results, status)=>{
            if(status !== google.maps.places.PlacesServiceStatus.OK){
                reject(status);
            }
            else{
                resolve(results);
            }
        })
    }).then((results) =>{
        // lat/lng need to be functions
        let obj = {
            lat(){
                return location.lat;
            },
            lng(){
                return location.lng;
            }
        };
        results.forEach(result => {
            result.dist = google.maps.geometry.spherical.computeDistanceBetween(obj, result.geometry.location)
        });
        results = results.filter(e => e.dist < radius).sort((a,b) => b.dist - a.dist);
        const targetCount = Math.max(Math.round(results.length / 10), 10);
        results = results.slice(0, targetCount);
        const randomIndex = Math.round(Math.random() * results.length);
        return results[randomIndex];
    })
}
