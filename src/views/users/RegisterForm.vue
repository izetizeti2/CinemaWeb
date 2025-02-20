<template>
  <div class="register-wrapper">
    <div class="register-container">
      <h2>Create Your Account</h2>
      
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            placeholder="Enter your name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="Enter your email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Enter your password" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required 
            placeholder="Confirm your password" />
        </div>

        <button type="submit" :disabled="loading">{{ loading ? 'Registering...' : 'Register' }}</button>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          localStorage.setItem("auth_token", response.data.token);
          this.$router.push("/");
        }
      } catch (error) {
        this.errorMessage = "Error registering. Please try again.";
        console.error("Error registering:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
}

.register-container {
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

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #333;
  color: white;
  font-size: 14px;
}

input:focus {
  border-color: #ff6f61;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff3b2f;
}

button:disabled {
  background-color: #7f8c8d;
  cursor: not-allowed;
}

.error-message {
  color: #ff3b2f;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
</style>
