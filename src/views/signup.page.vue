<template>
    <section class="signup-page container">
        <h2>Signup</h2>
        <form @submit.prevent="doSignUp">
            <span class="signup-page-divider">
                <input type="email" placeholder="Email" v-model="credentials.email" required />
                <input type="text" placeholder="Username" v-model="credentials.username" required />
                <input type="password" placeholder="Password" v-model="credentials.password" required />
            </span>
            <span class="signup-page-divider">
                <image-input :value="credentials.avatar" @input-change="avatarChange" :isRequired="false"></image-input>
                <input type="submit" value="Sign up" />
            </span>
        </form>
    </section>
</template>

<script>
import { userService } from '@/services/user.service';

import imageInput from '@/cmps/dynamic-inputs/question-input-image.cmp';

export default {
    data() {
        return {
            credentials: userService.getEmptyCredentials()
        }
    },
    methods: {
        doSignUp() {
            const user = this.$store.dispatch({ type: 'signup', credentials: this.credentials });
            if (user) {
                this.credentials = userService.getEmptyCredentials();
                this.$router.push('/quiz');
            } 
        },
        avatarChange(imgUrl) {
            this.credentials.avatar = imgUrl;
        }
    },
    components: {
        imageInput
    }
};
</script>