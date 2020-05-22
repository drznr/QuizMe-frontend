<template>
  <nav class="main-navbar" :class="{sticky: isScrolled}">
    <div class="layout-main-navbar container">
      <div class="logo">
           <router-link to="/">QuizMe<span>.</span></router-link>
      </div>
      <ul class="main-navbar-nav" :class="{open: isMenuOpen}">
        <li @click="toggleMenu">
          <router-link to="/" class="main-navbar-nav-link">Home</router-link>
        </li>
        <li @click="toggleMenu">
          <router-link to="/quiz" class="main-navbar-nav-link">App</router-link>
        </li>
        <li>
          <label class="main-navbar-nav-avatar">
            <img :src="user.avatar" alt="User's avatar" v-if="user && user.avatar" class="avatar" />
            <span v-else class="main-navbar-nav-avatar-guest" :style="{backgroundColor: rndColor}">{{ userChar }}</span>
            <input type="checkbox" hidden />
            <img src="@/assets/imgs/dropdown-arrow.svg" alt="drop down arrow" class="main-navbar-nav-avatar-arr" />
            <div class="main-navbar-nav-avatar-dropdown">
              <button v-if="user" @click="doLogOut">Logout</button>
              <button v-else @click="openModal">Login</button>
              <router-link to="/signup">Signup</router-link>
            </div>
          </label>
        </li>
      </ul>
      <hamburger-toggle class="main-navbar-hamburger" @menu-toggle="toggleMenu" :isMenuOpen="isMenuOpen"></hamburger-toggle>
    </div>
    <modal-wrap :isActive="isModalActive" @close-modal="isModalActive = false">
      <login-modal @close-modal="isModalActive = false"></login-modal>
    </modal-wrap>
  </nav>
</template>

<script>
import { utilService } from '@/services/util.service';
import hamburgerToggle from '@/cmps/reusable/hamburger-toggle.cmp';
import modalWrap from '@/cmps/reusable/modal-wrap.cmp';
import loginModal from '@/cmps/login-modal.cmp';

export default {
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false,
      isModalActive: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userChar() {
      return (this.user) ? this.user.username.charAt(0).toUpperCase() : 'G';
    },
    rndColor() {
      return utilService.getRandomColor();
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = (window.scrollY > 0);
    },
    toggleMenu() { 
      this.isMenuOpen = !this.isMenuOpen;
    },
    openModal() {
      this.isModalActive = true;
      if (this.isMenuOpen) this.toggleMenu();
    },
    doLogOut() {
      this.$store.dispatch({ type: "logout" });
    }
  },
  components: {
    hamburgerToggle,
    modalWrap,
    loginModal
  }
};
</script>