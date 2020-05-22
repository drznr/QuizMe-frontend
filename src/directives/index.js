import Vue from 'vue';
import vueDebounce from 'vue-debounce';
import { VueHammer } from 'vue2-hammer';
import VueClipboard from 'vue-clipboard2';
import VueCodeHighlight from 'vue-code-highlight';
import VuePrism from 'vue-prism';

Vue.use(vueDebounce, {
    listenTo: 'input',
    defaultTime: '500ms'
});

Vue.use(VueHammer);
Vue.use(VueClipboard);
Vue.use(VuePrism);
Vue.use(VueCodeHighlight);