<template>
    <section class="modal-share">
        <h3>Quiz Saved Successfully!</h3>
        <div class="modal-share-actions">
            <router-link :to="endpoint">
                <font-awesome-icon icon="link"></font-awesome-icon>
                <span>Go to Quiz</span>
            </router-link>
            <button v-clipboard:copy="link" v-clipboard:success="onCopy">
                <font-awesome-icon :icon="['far', 'copy']"></font-awesome-icon>
                <span>Copy Link</span>
            </button>
        </div>
        <hr />
        <div class="modal-share-social">
            <social-sharing :url="link" inline-template>
                <div class="icons">
                    <network network="facebook">
                        <font-awesome-icon :icon="['fab', 'facebook']" title="Share via Facebook"></font-awesome-icon>
                    </network>
                    <network network="whatsapp">
                        <font-awesome-icon :icon="['fab', 'whatsapp']" title="Share via Whatsapp"></font-awesome-icon>
                    </network>
                    <network network="telegram">
                        <font-awesome-icon :icon="['fab', 'telegram']" title="Share via Telegram"></font-awesome-icon>
                    </network>
                    <network network="linkedin">
                        <font-awesome-icon :icon="['fab', 'linkedin']" title="Share via Linkedin"></font-awesome-icon>
                    </network>
                </div>
            </social-sharing>
        </div>
        <portal to="clipboard-msg" v-if="portalActive">
            <p class="portal-msg">&#x2714; Copied to Clipboard! <span title="Close" @click="closePortal">&times;</span></p>
        </portal>
    </section>
</template>

<script>
import socialSharing from 'vue-social-sharing';

export default {
    props: {
        endpoint: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            portalActive: false,
            timeOut: null
        }
    },
    computed: {
        link() {
            return `${window.location.origin}/#${this.endpoint}`;
        }
    },
    methods: {
        onCopy() {
            this.portalActive = true;
            this.timeOut = setTimeout(() => {
                this.portalActive = false;
            }, 1500);
        },
        closePortal() {
            this.portalActive = false;
            clearTimeout(this.timeOut);
        }
    },
    components: {
        socialSharing
    }
};
</script>