<template>
  <div class="header">
    <h1 class="dashboard-title">Dashboard</h1>
    <div class="button-container">
      <button v-if="isAuthenticated" @click="logout" class="nav-button">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
      userRole: '',
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('auth_token');
    this.userRole = localStorage.getItem('user_role') || '';
  },
  methods: {
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      this.isAuthenticated = false;
      this.userRole = '';
      this.$router.push('/');

      setTimeout(() => {
    window.location.reload(); // Rifreskon faqen plotësisht
  }, 100);
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a; /* Ngjyrë e njëjtë si AppHeader */
  color: white;
  padding: 15px 40px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Hije moderne */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Vijë e hollë ndarëse */
}

.dashboard-title {
  font-size: 24px;
  font-weight: bold;
  color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
}

.button-container {
  display: flex;
  gap: 15px;
  margin-left: 50px; /* Hapësirë e njëjtë si në AppHeader */
  margin-right: 50px; /* Hapësirë e njëjtë si në AppHeader */
}

.nav-button {
  padding: 10px 20px;
  background-color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  color: white;
  border: none;
  border-radius: 25px; /* Butona të rrumbullakosur */
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-button:hover {
  background-color: #ff3b2f; /* Ngjyrë më e errët kur kalon mbi */
  transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
}

.nav-button:focus {
  outline: none;
}
</style>