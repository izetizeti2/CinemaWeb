<template>
  <div class="category-container">
    <div class='header'>
      <h1 class="heading">Categories</h1>
      <button @click="$router.push('/categories/create')" class="add-category-btn">
        Add Category
      </button>
    </div>

    <table v-if="categories.length" class="category-table">
      <thead>
        <tr>
          <th>Category Name</th>
          <th class="actions-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td class="category-name">{{ category.name }}</td>
          <td class="actions">
            <button @click="$router.push(`/categories/${category.id}/edit`)" class="edit-btn">Edit</button>
            <button @click="confirmDelete(category.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-categories-msg">No categories available</p>
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Are you sure you want to delete this category?</h3>
        <div class="modal-buttons">
          <button @click="deleteCategory" class="confirm-btn">Yes, Delete</button>
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
  name: "ListCategories",
  data() {
    return {
      categories: [],
      showDeleteModal: false,
      categoryToDelete: null,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      const toast = useToast();
      try {
        const token = localStorage.getItem("auth_token");
        console.log(token);
        const response = await axios.get("/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories. Please try again.");
      }
    },

    confirmDelete(categoryId) {
      this.categoryToDelete = categoryId;
      this.showDeleteModal = true;
    },

    async deleteCategory() {
      try {
        const token = localStorage.getItem("auth_token");
        await axios.delete(`/categories/${this.categoryToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.categories = this.categories.filter((category) => category.id !== this.categoryToDelete);
        this.closeModal();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },

    closeModal() {
      this.showDeleteModal = false;
      this.categoryToDelete = null;
    },
  },
};
</script>

<style scoped>
.category-container {
  width: 100%;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #1a1a1a; /* Sfondi i errët */
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.heading {
  color: #ff6f61; /* Ngjyra e kuqe e theksuar */
  font-size: 2rem;
  font-weight: 700;
}

.add-category-btn {
  background-color: #ff6f61; /* Ngjyra e kuqe e theksuar */
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-category-btn:hover {
  background-color: #ff3b2f; /* Ngjyra më e errët kur hover */
}

.category-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2a2a2a; /* Sfondi i errët për tabelën */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.category-table th,
.category-table td {
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid #444; /* Kufijtë më të errët */
}

.category-table th {
  background-color: #c82333; /* Ngjyra e kuqe e theksuar */
  color: white;
  font-weight: 600;
}

.category-table td {
  background-color: #2a2a2a; /* Sfondi i errët për qelizat */
  color: #e0e0e0; /* Teksti i bardhë për kontrast */
}

.actions-header {
  width: 180px;
}

.actions {
  display: flex;
  gap: 12px;
}

.edit-btn,
.delete-btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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

.no-categories-msg {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d; /* Ngjyra e zbehtë për mesazhin */
}

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
  border-radius: 6px;
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