<template>
    <div class="edit-wrapper">
      <div class="edit-container">
        <div class="header">
          <button @click="goBack" class="back-btn">&larr;</button>
          <h2>Edit {{ user.name }}</h2>
        </div>
        <div class="form-container">
          <UserForm :user="user" @submit="updateUser" buttonText="Update" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserForm from '@/components/UserForm.vue';
  import axios from '@/axios';
  import { useToast } from 'vue-toastification';
  
  export default {
    name: 'EditUser',
    components: {
      UserForm,
    },
    data() {
      return {
        user: {
          name: '',
          email: '',
          role: 'user',
        },
      };
    },
    created() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        const toast = useToast();
        const token = localStorage.getItem("auth_token"); // Merr token-in nga localStorage
        console.log('Token:', token);
        try {
          const response = await axios.get(`/users/${this.$route.params.id}`, {
            headers: {
              Authorization: `Bearer ${token}` // Dërgon token-in në header
            }
          });
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
          toast.error('Failed to fetch user. Please try again.');
        }
      },
      async updateUser(updatedUser) {
        const toast = useToast();
        const token = localStorage.getItem("auth_token"); // Merr token-in nga localStorage
        console.log('Token:', token);
  
        try {
          const payload = { 
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role 
          }; // Dërgon të dhënat e përdoruesit
  
          const response = await axios.put(`/users/${this.$route.params.id}`, payload, {
            headers: {
              Authorization: `Bearer ${token}`, // Dërgon token-in në header
              'Content-Type': 'application/json' // Sigurohuni që dërgoni JSON
            }
          });
  
          console.log('User updated:', response.data); // Shfaq përgjigjen nga API
          this.$router.push('/dashboard'); // Ridrejton pas përditësimit
          toast.success('User updated successfully');
        } catch (error) {
          console.error('Error updating user:', error.response); // Printo gabimin real
          if (error.response) {
            toast.error(`Error: ${error.response.data.message || 'Failed to update user'}`);
          } else {
            toast.error('Failed to update user. Please try again.');
          }
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
    background-color: #1a1a1a; /* Ngjyrë fundi e errët për kontrast */
  }
  
  .edit-container {
    max-width: 500px;
    width: 100%;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    color: white;
    text-align: center;
  }
  
  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .back-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
    color: white;
    border: none;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .back-btn:hover {
    background-color: #ff3b2f; /* Ngjyrë më e errët kur kalon mbi */
    transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
  }
  
  h2 {
    font-size: 2rem;
    margin: 0;
    color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  }
  
  .form-container {
    margin-top: 20px;
  }
  
  /* Stilizimi i formës së UserForm (nëse është e nevojshme) */
  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }
  
  label {
    font-size: 14px;
    color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
    display: block;
    margin-bottom: 5px;
  }
  
  .input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #444;
    border-radius: 8px;
    background-color: #333;
    color: white;
    font-size: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .input-field:focus {
    border-color: #ff6f61;
    outline: none;
    box-shadow: 0 0 8px rgba(255, 111, 97, 0.5); /* Hije kur fokusohet */
  }
  
  .submit-btn {
    width: 100%;
    padding: 12px;
    background-color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .submit-btn:hover {
    background-color: #ff3b2f; /* Ngjyrë më e errët kur kalon mbi */
    transform: scale(1.05); /* Zvogëlohet pak kur kalon mbi */
  }
  
  .submit-btn:disabled {
    background-color: #7f8c8d; /* Ngjyrë e zbehtë kur është i çaktivizuar */
    cursor: not-allowed;
  }
  
  .error-message {
    color: #ff3b2f; /* Ngjyrë e kuqe për mesazhin e gabimit */
    font-size: 14px;
    text-align: center;
    margin-top: 15px;
  }
  </style>
  