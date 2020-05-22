import Vue from 'vue';
import moment from 'vue-moment';

Vue.use(moment);

Vue.filter('duration', ms => {
    let milliseconds = ms % 1000; 
    while (milliseconds > 10) {
        milliseconds = Math.floor(milliseconds / 10);
    }
    
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (60 * 1000)) % 60);
    const hours = Math.floor((ms / (3600 * 1000)) % 3600);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}.${milliseconds}`;
});