<template>
  <div class="movie-card">
    <img :src="getImageUrl(movie.poster)" alt="Movie Poster" class="movie-poster" />
    <div class="movie-details">
      <h2 class="movie-title">{{ movie.title }}</h2>
      <div class="movie-info">
        <p class="movie-category"><strong>Category:</strong> {{ movie.category.name }}</p>
        <button class="view-more-btn" @click="viewMovie">View More</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewMovie() {
      this.$router.push({
        name: "MovieView",
        params: { movieData: JSON.stringify(this.movie) },
      });
    },
    getImageUrl(poster) {
      return poster.startsWith("http") ? poster : `http://127.0.0.1:8000/storage/${poster}`;
    },
  },
};
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2d2d2d; /* Ngjyrë e errët për sfond */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Hije më e errët */
  max-width: 300px;
  margin: 10px auto;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  color: white; /* Ngjyrë e tekstit e bardhë për kontrast */
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* Hije më e madhe kur kalon mbi */
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
}

.movie-poster:hover {
  transform: scale(1.02);
}

.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 10px;
}

.movie-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
}

.movie-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.movie-category {
  font-size: 14px;
  color: #ccc; /* Ngjyrë e zbehtë për tekstin e kategorisë */
}

.view-more-btn {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.view-more-btn:hover {
  background-color: #ff3b2f; /* Ngjyrë më e errët kur kalon mbi */
  transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
}
</style>