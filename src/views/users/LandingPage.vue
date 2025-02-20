<template>
  <div class="movie-container">
    

    <div v-if="filteredMovies.length" class="movie-grid">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </div>
    
    <p v-else class="no-movies-msg">No movies available</p>
  </div>
</template>

<script>
import axios from "@/axios";
import MovieCard from "@/components/MovieCard.vue";
import emitter from "@/eventBus"; // Importo eventBus

export default {
  name: "LandingPage",
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],  // Lista e filmave origjinale
      filteredMovies: [],  // Lista e filmave të filtruar
      searchQuery: '',  // Kërkimi që merrni nga Header
    };
  },
  created() {
    this.fetchMovies();
    // Dëgjoni për ngjarje nga event bus
    emitter.on('filterCategory', this.filterMovies);
    emitter.on('search', this.searchMovies);  // Dëgjoni ngjarjen 'search' për filtrimin
    emitter.on('clearFilters', this.clearFilters); // Dëgjoni eventin për të pastruar filtrat
  },
  unmounted() {
    // Largoni event listener kur komponenti shkatërrohet
    emitter.off('filterCategory', this.filterMovies);
    emitter.off('search', this.searchMovies);  // Largoni ngjarjen e kërkimit kur shkatërrohet
    emitter.off('clearFilters', this.clearFilters); // Largoni ngjarjen për pastrimin e filtrave
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get("/movies");
        this.movies = response.data;
        this.filteredMovies = this.movies;  // Filtrimi fillestar është të gjitha filmat
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    filterMovies(categoryId) {
      console.log("Filtering movies with category:", categoryId);
      console.log("Movies before filtering:", this.movies);
      // Filtrimi i filmave sipas kategorisë
      if (categoryId) {
        this.filteredMovies = this.movies.filter(movie => {
          console.log("Movie category ID:", movie.category.id, "Selected category ID:", categoryId);
          return movie.category.id === categoryId;
        });
      } else {
        this.filteredMovies = this.movies;  // Nëse nuk është zgjedhur kategori, shfaq të gjitha filmat
      }
      console.log("Filtered movies:", this.filteredMovies);
    },
    searchMovies(query) {
      this.searchQuery = query;
      this.filterSearchResults();  // Filtroni filmat kur merrni kërkimin
    },
    filterSearchResults() {
      if (this.searchQuery.trim() === '') {
        this.filteredMovies = this.movies;  // Nëse kërkimi është bosh, shfaq të gjitha filmat
      } else {
        this.filteredMovies = this.movies.filter(movie =>
          movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())  // Filtrimi sipas titullit
        );
      }
      console.log("Filtered search results:", this.filteredMovies);
    },
    clearFilters() {
      this.filteredMovies = this.movies; // Rikthen listën origjinale të filmave
      this.searchQuery = ''; // Pastron kërkimin
      console.log("Filters cleared, showing all movies.");
    }
  },
};
</script>

<style scoped>
.movie-container {
  width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #3a3a3a; /* Ngjyrë e errët për sfond */
  min-height: calc(100vh - 130px);
  overflow: auto;
  text-align: center;
  color: white; /* Ngjyrë e tekstit e bardhë për kontrast */
}

.heading {
  font-size: 2.5rem;
  color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  margin-bottom: 30px;
  font-weight: bold;
  text-transform: uppercase; /* Teksti në shkronja të mëdha */
  letter-spacing: 2px; /* Hapësirë midis shkronjave */
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.no-movies-msg {
  font-size: 1.5rem;
  color: #ff6f61; /* Ngjyrë e kuqe për mesazhin */
  margin-top: 30px;
  font-weight: bold;
}
</style>