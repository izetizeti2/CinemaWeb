<template>
  <div class="movie-view">
    
    <MovieDsc :movie="movie" />
  </div>
</template>

<script>
import MovieDsc from "@/components/MovieDsc.vue";

export default {
  name: "MovieView",
  components: {
    MovieDsc,
  },
  data() {
    return {
      movie: JSON.parse(this.$route.params.movieData),
    };
  },
};
</script>

<style scoped>
.movie-view {
  padding: 20px;
  max-width: 700px;
  margin: auto;
  text-align: center;
  position: relative;
}


</style>
