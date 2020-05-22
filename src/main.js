import Vue from 'vue';
import App from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faThList, faPlusSquare, faPlusCircle, faSortAlphaDown, faSortAlphaUp, faShareSquare,
         faQuoteRight, faQuoteLeft, faCode, faImage, faHandPointRight, faEllipsisH, faTrash, faExternalLinkAlt,
        faNetworkWired, faTrophy, faEdit, faFileAlt, faRandom, faFont, faEllipsisV, faUserAstronaut,
        faCaretDown, faGripHorizontal, faLink, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faTrashAlt, faCopy, faClock } from '@fortawesome/free-regular-svg-icons';
import portalVue from 'portal-vue';    

import './directives';
import './filters';
import './index.scss';

Vue.use(portalVue);

library.add(faThList, faPlusSquare, faPlusCircle, faSortAlphaDown, faSortAlphaUp, faQuoteRight, faExternalLinkAlt,
            faQuoteLeft, faCode, faImage, faHandPointRight, faShareSquare, faTrash, faUserAstronaut,
            faGripHorizontal, faRandom ,faNetworkWired, faTrophy, faEdit, faFileAlt, faFont, faClock, faCaretDown, 
            faFacebook, faWhatsapp, faEllipsisH, faEllipsisV, faChevronRight, faChevronLeft,
            faTrashAlt, faTelegram, faLinkedin, faCopy, faLink);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.config.errorHandler = function (err, vm, info) {
  console.log('Error', err);
  console.log('Info', info);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
