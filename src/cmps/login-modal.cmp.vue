<template>
    <section class="login">
        <form @submit.prevent="doLogin">
            <input type="email" placeholder="Email" v-model="credentials.email" required />
            <input type="password" placeholder="Password" v-model="credentials.password" required />
            <input type="submit" value="Login">
            <p>Don't have an acount? <button class="link" @click="closeModal">Sign up!</button></p>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        doLogin() {
            this.$store.dispatch({ type: 'login', credentials: this.credentials });
            this.credentials = {
                email: '',
                password: ''
            }
            this.$emit('close-modal');
        },
        closeModal() {
            this.$router.push('/signup');
            this.$emit('close-modal');
        }
    }
};
</script>