<template>
  <div class="movie-container">
    <div class="header">
      <button @click="goToAddMovie" class="add-movie-btn">Add Movie</button>
    </div>

    <h1 class="heading">Movies</h1>

    <table v-if="movies.length" class="movie-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Director</th>
          <th>Release Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.category.name }}</td>
          <td>{{ movie.director }}</td>
          <td>{{ movie.release_date }}</td>
          <td>
            <button @click="editMovie(movie.id)" class="edit-btn">Edit</button>
            <button @click="confirmDelete(movie.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-movies-msg">No movies available</p>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Are you sure you want to delete this movie?</h3>
        <div class="modal-buttons">
          <button @click="deleteMovie" class="confirm-btn">Yes, Delete</button>
          <button @click="closeModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import { useToast } from 'vue-toastification';

export default {
  name: "ListMovies",
  data() {
    return {
      movies: [],
      showDeleteModal: false, // Controls the modal visibility
      movieToDelete: null, // Stores the movie to delete
    };
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get("/movies");
        this.movies = response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    goToAddMovie() {
      this.$router.push("/movies/create");
    },
    editMovie(movieId) {
      this.$router.push(`/movies/${movieId}/edit`);
    },
    confirmDelete(movieId) {
      this.movieToDelete = movieId;
      this.showDeleteModal = true; // Show the delete confirmation modal
    },
    async deleteMovie() {
      const toast = useToast(); // Initialize toast
      try {
        const token = localStorage.getItem("auth_token");
        // Send delete request
        await axios.delete(`/movies/${this.movieToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Shto token-in në header
          },
        });
        // Remove the deleted movie from the list
        this.movies = this.movies.filter(movie => movie.id !== this.movieToDelete);
        this.closeModal();
        toast.success("Movie deleted successfully"); // Show success toast
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error("Error deleting movie. Please try again."); // Show error toast
      }
    },
    closeModal() {
      this.showDeleteModal = false;
      this.movieToDelete = null;
    },
  },
};
</script>

<style scoped>
.movie-container {
  width: 100%;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #1a1a1a; /* Sfondi i errët */
  min-height: calc(100vh - 130px);
  overflow: auto;
  text-align: center;
  margin-top: 30px;
  margin-top: 50px;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.add-movie-btn {
  padding: 10px 20px;
  background-color: #ff6f61; /* Ngjyra e kuqe e theksuar */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.add-movie-btn:hover {
  background-color: #ff3b2f; /* Ngjyra më e errët kur hover */
  transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
}

.heading {
  font-size: 2rem;
  color: #ff6f61; /* Ngjyra e kuqe e theksuar */
  margin-bottom: 20px;
}

.movie-table {
  width: 80%; /* Ngushto tabelën */
  margin: 0 auto; /* Qendro tabelën */
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #2a2a2a; /* Sfondi i errët për tabelën */
  border-radius: 8px;
  overflow: hidden;
}

.movie-table th,
.movie-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #444; /* Kufijtë më të errët */
  color: #e0e0e0; /* Teksti i bardhë për kontrast */
  font-size: 14px; /* Zvogëlo madhësinë e tekstit */
}

.movie-table th {
  background-color: #ff3b2f; /* Ngjyra e kuqe e theksuar për header */
  color: white;
  font-weight: 600;
}

.movie-table tr:hover {
  background-color: #333; /* Ngjyra më e errët kur hover */
}

.edit-btn,
.delete-btn {
  padding: 6px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px; /* Zvogëlo madhësinë e tekstit */
}

.edit-btn {
  background-color: #17a2b8; /* Blu e theksuar */
  color: white;
}

.edit-btn:hover {
  background-color: #138496; /* Blu më e errët kur hover */
}

.delete-btn {
  background-color: #dc3545; /* E kuqe e theksuar */
  color: white;
}

.delete-btn:hover {
  background-color: #c82333; /* E kuqe më e errët kur hover */
}

.no-movies-msg {
  font-size: 1.2rem;
  color: #7f8c8d; /* Ngjyra e zbehtë për mesazhin */
  margin-top: 20px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* Sfondi i errët për modal */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #2a2a2a; /* Sfondi i errët për modal */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 300px;
  color: #e0e0e0; /* Teksti i bardhë për kontrast */
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-btn,
.cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.confirm-btn {
  background-color: #dc3545; /* E kuqe e theksuar */
  color: white;
}

.confirm-btn:hover {
  background-color: #c82333; /* E kuqe më e errët kur hover */
}

.cancel-btn {
  background-color: #6c757d; /* Gri e theksuar */
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268; /* Gri më e errët kur hover */
}
</style>