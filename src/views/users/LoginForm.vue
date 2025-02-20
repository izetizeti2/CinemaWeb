<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2>Welcome to MovieWorld</h2>
      
      <form>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="Enter your email" 
            class="input-field" />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Enter your password" 
            class="input-field" />
        </div>
        
        <button type="button" :disabled="loading" @click="loginUser" class="submit-btn">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      this.loading = true;
      this.errorMessage = ""; 

      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("user_role", response.data.role);

          console.log("Token saved:", localStorage.getItem("auth_token"));

          if (response.data.role === 'admin') {
            this.$router.push("/dashboard");
          } else {
            this.$router.push("/");
          }

          // Rifresko faqen pas suksesit
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        this.errorMessage = "Invalid credentials. Please try again.";
        console.error("Error logging in:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center; /* Qendro horizontalisht */
  align-items: center; /* Qendro vertikalisht */
  min-height: 100vh; /* Merr gjithë lartësinë e ekranit */
  background-color: #1a1a1a; /* Ngjyrë fundi e errët për kontrast */
}

.login-container {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ff6f61;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #ff6f61;
  display: block;
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #333;
  color: white;
  font-size: 14px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #ff6f61;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 111, 97, 0.5); /* Hije kur fokusohet */
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #ff3b2f; /* Ngjyrë më e errët kur kalon mbi */
  transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
}

.submit-btn:disabled {
  background-color: #7f8c8d; /* Ngjyrë e zbehtë kur është i çaktivizuar */
  cursor: not-allowed;
}

.error-message {
  color: #ff3b2f; /* Ngjyrë e kuqe për mesazhin e gabimit */
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
</style>