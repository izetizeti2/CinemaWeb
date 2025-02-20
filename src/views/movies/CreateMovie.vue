<template>
  <div class="create-wrapper">
    <div class="create-container">
      <div class="header">
        <button @click="goBack" class="back-btn">&larr;</button>
        <h2>Create Movie</h2>
      </div>
      <div class="form-container">
        <MovieForm @submit="createMovie" buttonText="Create" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieForm from '@/components/MovieForm.vue';
import axios from '@/axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'CreateMovie',
  components: { MovieForm },
  methods: {
    async createMovie(formData) {
      const toast = useToast();
      const token = localStorage.getItem('auth_token');
      console.log(token)
      try {
        await axios.post('/movies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        this.$router.push('/movies');
        toast.success('Movie added successfully');
      } catch (error) {
        console.error('Error creating movie:', error);
        toast.error('Failed to add movie. Try again later');
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.create-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a; /* Dark background */
}

.create-container {
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.8); /* Dark background for the form */
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ff6f61; /* Highlight red color */
  color: white;
  border: none;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-btn:hover {
  background-color: #ff3b2f; /* Darker red on hover */
  transform: scale(1.05); /* Slightly enlarge when hovered */
}

h2 {
  font-size: 2rem;
  margin: 0;
  color: #ff6f61; /* Highlight red color */
}

.form-container {
  margin-top: 20px;
}
</style>
