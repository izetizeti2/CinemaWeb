<template>
    <div class="navbar">
      <!-- Logo section -->
      <div class="logo">
        <h5 class="m-0">Laravel & Vue</h5>
      </div>
  
      <!-- Navbar Links -->
      <ul class="nav-links">
        <li>
          <router-link to="/dashboard" @click="resetFilters">Categories</router-link>
        </li>
        <li>
          <router-link to="/Movies">Movies</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminNavbar",
  };
  </script>
  
  <style scoped>
  .navbar {
    width: 200px; /* Gjerësi më e madhe */
    background-color: #1a1a1a; /* Ngjyrë e errët moderne */
    color: white;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh; /* Zgjatet në të gjithë lartësinë e faqes */
    z-index: 10;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3); /* Hije në anën e djathtë */
  }
  
  .logo {
    margin-bottom: 50px; /* Rritur margin-bottom për të vendosur butonat më poshtë */
    text-align: center;
  }
  
  .logo h5 {
    font-size: 20px;
    font-weight: bold;
    color: #ff6f61; /* Ngjyrë e kuqe e theksuar */
  }
  
  .nav-links {
    list-style-type: none;
    padding: 0;
    margin-top: 20px; /* Shtuar margin-top për të zhvendosur butonat më poshtë */
  }
  
  .nav-links li {
    margin: 15px 0;
    position: relative;
  }
  
  .nav-links li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 10px 15px;
    display: block;
    width: 100%;
    text-align: left;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .nav-links li a:hover {
    background-color: rgba(255, 111, 97, 0.1); /* Efekt hover i butë */
    color: #ff6f61; /* Ngjyrë e kuqe kur kalon mbi */
    border-radius: 5px;
  }
  
  .m-0 {
    margin: 0;
  }
  </style>