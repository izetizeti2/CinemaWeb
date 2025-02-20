<template>
  <div class="movie-container">
    <div class="movie-content">
      <img :src="getImageUrl(movie.poster)" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <div class="movie-meta">
          <p class="movie-category"><strong>Category:</strong> {{ movie.category.name }}</p>
          <p class="movie-director"><strong>Director:</strong> {{ movie.director }}</p>
          <p class="movie-release"><strong>Release Date:</strong> {{ movie.release_date }}</p>
        </div>
        <p class="movie-synopsis">{{ movie.synopsis }}</p>
        <button class="back-btn" @click="$router.push('/')">Back to Movies</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieDsc",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(poster) {
      return poster.startsWith("http") ? poster : `http://127.0.0.1:8000/storage/${poster}`;
    },
  },
};
</script>

<style scoped>
.movie-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #3a3a3a;
  padding: 20px;
}

.movie-content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 1200px;
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  text-align: left;
  color: #e0e0e0;
}

.movie-poster {
  width: 300px;
  height: auto;
  border-radius: 12px;
  margin-right: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.movie-info {
  flex: 1;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6f61;
  margin-bottom: 20px;
}

.movie-meta {
  margin-bottom: 20px;
}

.movie-category,
.movie-director,
.movie-release {
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 8px;
}

strong {
  color: #ff6f61;
}

.movie-synopsis {
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.6;
  margin-top: 20px;
}

/* Butoni */
.back-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  transition: background 0.3s;
}

.back-btn:hover {
  background-color: #c0392b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .movie-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .movie-poster {
    width: 100%;
    max-width: 300px;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .movie-title {
    font-size: 2rem;
  }

  .movie-meta {
    text-align: left;
  }

  .back-btn {
    width: 100%;
  }
}
</style>
