<template>
    <div class="footer">
      <p>&copy; 2025 MovieWorld. All Rights Reserved.</p>
      <div class="social-links">
        <a href="#" class="social-link">Facebook</a>
        <a href="#" class="social-link">Twitter</a>
        <a href="#" class="social-link">Instagram</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AppFooter",
  };
  </script>
  
  <style scoped>
  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a;
    color: white;
    padding: 20px;
    text-align: center;
    position: relative;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer p {
    margin: 0;
    font-size: 14px;
    color: #ff6f61;
  }
  
  .social-links {
    margin-top: 10px;
    display: flex;
    gap: 15px;
  }
  
  .social-link {
    color: white;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;
  }
  
  .social-link:hover {
    color: #ff6f61;
  }
  </style>