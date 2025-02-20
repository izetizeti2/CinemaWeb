<template>
  <div class="form-container">
    <label for="category-name" class="label">Name</label>
    <input
      id="category-name"
      v-model="localCategory.name"
      placeholder="Enter the Category's name"
      class="input-field"
    />
    <button @click="handleSubmit" class="submit-btn">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: String,
    category: Object, // Shkruhet me të vogël si prop
  },
  data() {
    return {
      localCategory: {} // Fillimisht bosh
    };
  },
  watch: {
    category: {
      handler(newCategory) {
        this.localCategory = { ...newCategory }; // Përditësohet kur `category` ndryshon
      },
      immediate: true, // Ekzekuton `handler` menjëherë sapo komponenti montohet
      deep: true // E bën reagimin ndaj ndryshimeve më të thella në objekt
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.localCategory);
    }
  }
};
</script>

<style scoped>
.form-container {
  background-color: #1a1a1a; /* Dark background */
  color: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.label {
  font-size: 1rem;
  margin-bottom: 10px;
  display: block;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ff6f61; /* Highlight red color */
  border-radius: 5px;
  background-color: #2c2c2c; /* Dark input background */
  color: white;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

.input-field::placeholder {
  color: #b0b0b0; /* Placeholder text color */
}

.input-field:focus {
  outline: none;
  border-color: #ff3b2f; /* Darker red on focus */
  background-color: #333333; /* Slightly lighter background when focused */
}

.submit-btn {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  background-color: #ff6f61; /* Highlight red */
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #ff3b2f; /* Darker red on hover */
  transform: scale(1.05); /* Slightly enlarge when hovered */
}
</style>
