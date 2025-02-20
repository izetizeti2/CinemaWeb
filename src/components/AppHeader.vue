<template>
  <div class="header">
    <div class="logo" @click="$router.push('/')">
      <span>MovieWorld</span>
    </div>
    
    <ul class="nav-links">
      <li>
        <router-link to="/LandingPage" @click="resetFilters">Movies</router-link>
      </li>
      <li class="dropdown">
        <button @click="toggleDropdown" class="dropdown-title">Categories</button>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li v-for="category in categories" :key="category.id">
            <button @click="filterMovies(category.id)">{{ category.name }}</button>
          </li>
        </ul>
      </li>
    </ul>
    
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="searchMovies" 
        @keydown.enter="searchMovies"  
        class="search-input" 
        placeholder="Search for movies..."
      />
    </div>
    
    <div class="button-container">
      <button v-if="!isAuthenticated" @click="goToLogin" class="nav-button">Login</button>
      <button v-if="!isAuthenticated" @click="goToRegister" class="nav-button">Register</button>
      <button v-if="isAuthenticated" @click="logout" class="nav-button">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import emitter from "@/eventBus";

export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('auth_token'),
      userRole: localStorage.getItem('user_role') || '',
      searchQuery: '',
      categories: [],
      showDropdown: false,
    };
  },
  created() {
    this.fetchCategories();
    document.addEventListener("click", this.closeDropdownOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdownOutside);
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    toggleDropdown(event) {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    closeDropdownOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
    filterMovies(categoryId) {
      emitter.emit("filterCategory", categoryId);
      this.showDropdown = false;
    },
    resetFilters() {
      emitter.emit("clearFilters");
      emitter.emit("clearSearch");
      this.$router.go();
    },
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      this.isAuthenticated = false;
      this.userRole = '';
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    searchMovies() {
      emitter.emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  color: white;
  padding: 15px 40px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff6f61;
  cursor: pointer;
}

.nav-links {
  list-style-type: none;
  display: flex;
  align-items: center;
}

.nav-links li {
  margin: 0 15px;
  position: relative;
}

.nav-links li a,
.dropdown-title {
  color: white;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-links li a:hover,
.dropdown-title:hover {
  background-color: rgba(255, 111, 97, 0.1);
  color: #ff6f61;
  border-radius: 5px;
}

.dropdown-menu {
  position: absolute;
  left: 0;
  top: 100%;
  background-color: #1a1a1a;
  list-style-type: none;
  padding: 10px;
  width: 180px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.dropdown-menu li {
  padding: 8px 12px;
}

.dropdown-menu li button {
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-menu li button:hover {
  background-color: #ff6f61; /* Ngjyrë e kuqe kur kalon mbi */
  color: white;
  border-radius: 5px;
}


.search-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
}

.search-input {
  width: 400px;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
}

.button-container {
  display: flex;
  gap: 15px;
  margin-right: 70px;
}

.nav-button {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
</style>