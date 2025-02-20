<template>
  <div class="edit-wrapper">
    <div class="edit-container">
      <div class="header">
        <button @click="goBack" class="back-btn">&larr;</button>
        <h2>Edit Movie</h2>
      </div>
      <div class="form-container">
        <MovieForm :movie="movie" @submit="updateMovie" buttonText="Edit" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieForm from '@/components/MovieForm.vue';
import axios from '@/axios';
import { useToast } from 'vue-toastification';

export default {
  name: 'EditMovie',
  components: { MovieForm },
  data() {
    return {
      movie: {
        title: "",
        director: "",
        release_date: "",
        category_id: "",
        synopsis: "",
        poster: "",
      },
      categoryList: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchMovie();
    this.fetchCategories();
  },
  methods: {
    async fetchMovie() {
      const toast = useToast();
      this.isLoading = true;
      try {
        const response = await axios.get(`/movies/${this.$route.params.id}`);
        if (response.data) {
          this.movie = response.data;
        } else {
          this.$router.push("/movies");
          toast.error('Movie not found!');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error('Failed to fetch movie data. Try again later');
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCategories() {
      const toast = useToast();
      try {
        const response = await axios.get("/categories");
        this.categoryList = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories. Try again later');
      }
    },

    async updateMovie(movieData) {
      console.log("Received Movie Data:", movieData);

      if (!movieData.title || !movieData.director || !movieData.release_date || !movieData.category_id || !movieData.synopsis) {
        console.error("Të dhënat janë të pamjaftueshme:", movieData);
        return;
      }

      const toast = useToast();
      this.isLoading = true;
      try {
        const formData = new FormData();

        formData.append("title", movieData.title);
        formData.append("director", movieData.director);
        formData.append("release_date", movieData.release_date);
        formData.append("category_id", movieData.category_id);
        formData.append("synopsis", movieData.synopsis);

        if (movieData.poster instanceof File) {
          formData.append("poster", movieData.poster);
        }

        const token = localStorage.getItem("auth_token");

        await axios.post(`/movies/${this.$route.params.id}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        this.$router.push("/movies");
        toast.success("Movie updated successfully!");
      } catch (error) {
        console.log("Error updating movie:", error.response?.data);
        toast.error("Failed to update movie. Please try again");
      } finally {
        this.isLoading = false;
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.edit-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 40px 0;
}

.edit-container {
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.back-btn {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #ff6f61;
  color: white;
  border: none;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.back-btn:hover {
  background-color: #ff3b2f;
  transform: scale(1.05);
}

h2 {
  font-size: 2.5rem;
  margin: 0;
  color: #ff6f61;
  font-weight: 600;
}

.form-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .submit-btn {
  padding: 15px;
  font-size: 18px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.form-container .submit-btn:hover {
  background-color: #ff3b2f;
  transform: scale(1.05);
}

input, select, textarea {
  padding: 12px;
  font-size: 16px;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  color: #e0e0e0;
  width: 100%;
  box-sizing: border-box;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #ff6f61;
  box-shadow: 0 0 8px rgba(255, 111, 97, 0.5);
}

label {
  font-size: 14px;
  color: #ff6f61;
  margin-bottom: 8px;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.poster-preview {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>
