<template>
  <div class="form-container">
    <!-- First Row: Title, Category, Release Date -->
    <div class="row">
      <div class="column">
        <label for="title" class="label">Title</label>
        <input
          id="title"
          v-model="localMovie.title"
          placeholder="Enter the Movie title"
          class="input-field"
          required
        />
      </div>
      <div class="column">
        <label for="category" class="label">Category</label>
        <select
          id="category"
          v-model="localMovie.category_id"
          class="input-field"
          required
        >
          <option disabled value="">Select Category</option>
          <option v-for="category in categoryList" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="column">
        <label for="release_date" class="label">Release Date</label>
        <input
          id="release_date"
          type="date"
          v-model="localMovie.release_date"
          class="input-field"
          required
        />
      </div>
    </div>

    <!-- Second Row: Synopsis (Now spanning the full width) -->
    <div class="row">
      <div class="full-width">
        <label for="synopsis" class="label">Synopsis</label>
        <textarea
          id="synopsis"
          v-model="localMovie.synopsis"
          placeholder="Enter the Movie synopsis"
          class="input-field"
          required
        ></textarea>
      </div>
    </div>

    <!-- Poster Section -->
    <label for="poster" class="label">Movie Poster</label>
    <input type="file" id="poster" @change="handleFileUpload" class="input-field" accept="image/jpeg, image/png" />

    <!-- Display existing poster if available -->
    <div v-if="previewPoster || localMovie.poster">
      <img
        v-if="previewPoster"
        :src="previewPoster"
        alt="Poster Preview"
        class="poster-preview"
      />
      <p v-if="localMovie.poster && !previewPoster">Current Poster:</p>
      <img
        v-if="localMovie.poster && !previewPoster"
        :src="getImageUrl(localMovie.poster)"
        alt="Current Movie Poster"
        class="poster-preview"
      />
    </div>

    <button @click="emitMovieData" class="submit-btn">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  props: {
    buttonText: String,
    movie: Object,
  },
  data() {
    return {
      localMovie: { ...this.movie },
      categoryList: [],
      posterFile: null,
      previewPoster: null,
    };
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categoryList = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.posterFile = file;
        this.previewPoster = URL.createObjectURL(file);
      }
    },
    emitMovieData() {
      const movieData = {
        title: this.localMovie.title,
        director: this.localMovie.director,
        release_date: this.localMovie.release_date,
        category_id: this.localMovie.category_id,
        synopsis: this.localMovie.synopsis,
        poster: this.posterFile || this.localMovie.poster, // Send file object or existing poster filename
      };

      console.log("Movie Data to Emit:", movieData);

      this.$emit("submit", movieData);
    },
    getImageUrl(poster) {
      // Check if poster is a full URL or a relative path
      return poster.startsWith("http") ? poster : `http://127.0.0.1:8000/storage/${poster}`;
    }
  },
  watch: {
    movie(newMovie) {
      this.localMovie = { ...newMovie };
      this.previewPoster = null; // Reset preview when new movie is loaded
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #2a2a2a; /* Dark background for the form */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  color: #e0e0e0; /* White text for contrast */
}

.row {
  display: flex;
  gap: 20px;
}

.column {
  flex: 1;
}

.full-width {
  flex: 3; /* Spans the entire row for the synopsis */
}

.label {
  font-size: 14px;
  color: #ff6f61; /* Highlighted red color */
  margin-bottom: 5px;
}

.input-field {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444; /* Darker borders */
  border-radius: 8px;
  transition: border-color 0.3s ease;
  background-color: #333; /* Dark background for inputs */
  color: #e0e0e0; /* White text for contrast */
}

.input-field:focus {
  border-color: #ff6f61; /* Highlighted red on focus */
  outline: none;
  box-shadow: 0 0 8px rgba(255, 111, 97, 0.5); /* Shadow on focus */
}

.submit-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #ff6f61; /* Highlighted red button */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #ff3b2f; /* Darker red on hover */
  transform: scale(1.05); /* Slight scale on hover */
}

.poster-preview {
  max-width: 150px; /* Smaller poster preview */
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
