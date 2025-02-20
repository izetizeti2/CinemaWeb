<template>
  <div id="app">
  
    <NavbarAdmin v-if="isAuthenticated && userRole === 'admin'" />
    
    <div class="main-container" :style="{ marginLeft: mainContainerMargin }">
      <!-- Header-i i përshtatshëm për përdoruesin ose adminin -->
      <AppHeader v-if="!isAuthenticated || userRole !== 'admin'" />
      <HeaderAdmin v-if="isAuthenticated && userRole === 'admin'" />

      <!-- Përmbajtja kryesore -->
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- Footer-i -->
    <AppFooter />
  </div>
</template>

<script>
import NavbarAdmin from '@/components/NavbarAdmin.vue';
import axios from '@/axios';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import HeaderAdmin from './components/HeaderAdmin.vue';

export default {
  components: {
    NavbarAdmin,
    AppHeader,
    AppFooter,
    HeaderAdmin,
  },
  data() {
    return {
      isAuthenticated: false,
      userRole: '',
      searchQuery: '' // Ruajtja e fjalës së kërkimit
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('auth_token');
    this.userRole = localStorage.getItem('user_role') || '';
  },
  computed: {
    mainContainerMargin() {
      if (this.isAuthenticated && this.userRole === 'admin') {
        return '235px'; // Margin për admin
      }
      return '0px'; // Margin për përdorues të paautentikuar ose të regjistruar si user
    }
  },
  methods: {
    logout() {
      axios.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        this.isAuthenticated = false;
        this.userRole = '';
        this.$router.push('/');
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    searchMovies() {
      this.$emit('search', this.searchQuery); // Dërgon event për filtrimin e filmave
    }
  },
};
</script>

<style scoped>
/* Stili global për aplikacionin */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #3a3a3a; /* Fundi i errët për një pamje moderne */
  color: white;
  overflow-x: hidden; /* Parandalon scroll horizontalin */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Merr gjithë lartësinë e ekranit */
  overflow-x: hidden; /* Parandalon scroll horizontalin */
}

.main-container {
  flex: 1; /* Zgjat përmbajtjen kryesore për të mbushur hapësirën */
  padding: 20px;
  background-color: #3a3a3a; /* Ngjyrë e njëjtë si fundi */
  overflow-x: hidden; /* Siguron që përmbajtja të mos dalë jashtë */
}

.main-content {
  max-width: 1200px;
  margin: 0 auto; /* Qendro përmbajtjen */
  padding: 20px;
  padding-top: 30px; /* Distanca 30px nga headeri */
  background-color: #3a3a3a; /* Përmbajtja me transparencë */
  border-radius: 10px;
  overflow-x: hidden; /* Parandalon scroll horizontal */
}

/* Tailwind: Responsiveness për përdoruesin */
@media (max-width: 640px) {
  .main-container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .main-content {
    padding: 10px;
    max-width: 100%;
  }
}
</style>
