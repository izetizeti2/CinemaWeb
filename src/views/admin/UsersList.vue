<template>
    <div class="user-container">
      <h1 class="heading">Users</h1>
  
      <table v-if="users.length" class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button @click="editUser(user.id)" class="edit-btn">Edit</button>
              <button @click="confirmDelete(user.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-else class="no-users-msg">No users available</p>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Are you sure you want to delete this user?</h3>
          <div class="modal-buttons">
            <button @click="deleteUser" class="confirm-btn">Yes, Delete</button>
            <button @click="closeModal" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "@/axios";
  import { useToast } from "vue-toastification";
  
  export default {
    name: "UsersList",
    data() {
      return {
        users: [],
        showDeleteModal: false,
        userToDelete: null,
      };
    },
    created() {
      this.fetchUsers();
      
    },
    methods: {
    async fetchUsers() {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            this.users = response.data;
            
            
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        },

      editUser(userId) {
        this.$router.push(`/users/${userId}/edit`);
      },
      confirmDelete(userId) {
        this.userToDelete = userId;
        this.showDeleteModal = true;
      },
      async deleteUser() {
        const toast = useToast();
        try {
          const token = localStorage.getItem("auth_token");
          await axios.delete(`/users/${this.userToDelete}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.users = this.users.filter(user => user.id !== this.userToDelete);
          this.closeModal();
          toast.success("User deleted successfully");
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Error deleting user. Please try again.");
        }
      },
      closeModal() {
        this.showDeleteModal = false;
        this.userToDelete = null;
      },
    },
  };
  </script>
  
  <style scoped>
  .user-container {
    width: 100%;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #1a1a1a;
    min-height: calc(100vh - 130px);
    overflow: auto;
    text-align: center;
    margin-top: 30px;
  }
  
  .heading {
    font-size: 2rem;
    color: #ff6f61;
    margin-bottom: 20px;
  }
  
  .user-table {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #2a2a2a;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .user-table th,
  .user-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #444;
    color: #e0e0e0;
    font-size: 14px;
  }
  
  .user-table th {
    background-color: #ff3b2f;
    color: white;
    font-weight: 600;
  }
  
  .user-table tr:hover {
    background-color: #333;
  }
  
  .edit-btn,
  .delete-btn {
    padding: 6px 12px;
    margin-right: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .edit-btn {
    background-color: #17a2b8;
    color: white;
  }
  
  .edit-btn:hover {
    background-color: #138496;
  }
  
  .delete-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  .no-users-msg {
    font-size: 1.2rem;
    color: #7f8c8d;
    margin-top: 20px;
  }
  
  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #2a2a2a;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    width: 300px;
    color: #e0e0e0;
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
    background-color: #dc3545;
    color: white;
  }
  
  .confirm-btn:hover {
    background-color: #c82333;
  }
  
  .cancel-btn {
    background-color: #6c757d;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #5a6268;
  }
  </style>
  