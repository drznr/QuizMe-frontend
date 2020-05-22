<template>
    <section class="user-edit">
        <form @submit.prevent="updateUser">
            <input type="text" placeholder="Username" v-model="user.username" required />
            <input type="email" placeholder="Email" v-model="user.email" required />
            <image-input :value="user.avatar" @input-change="updateAvatar" :isRequired="false"></image-input>
            <input type="submit" value="Save" />
        </form>
        <portal to="clipboard-msg" v-if="portalActive">
            <p class="portal-msg">User Editted Successfully! <span title="Close" @click="closePortal">&times;</span></p>
        </portal>
    </section>
</template>

<script>
import imageInput from './dynamic-inputs/question-input-image.cmp';

export default {
    data() {
        return {
            user: { ...this.$store.getters.user },
            portalActive: false,
            timeOut: null
        }
    },
    methods: {
        async updateUser() {
            const user = await this.$store.dispatch({ type: 'updateUser', user: this.user });
            if (user) {
                this.portalActive = true;
                this.timeOut = setTimeout(() => {
                    this.portalActive = false;
                }, 1500);
            }
        },
        updateAvatar(imgUrl) {
            this.user.avatar = imgUrl;
        },
        closePortal() {
            this.portalActive = false;
            clearTimeout(this.timeOut);
        }
    },
    components: {
        imageInput
    }
};
</script>