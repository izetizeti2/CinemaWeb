import ListCategories from '@/views/categories/ListCategories.vue'; // Importimi i komponentit ListCategories
import EditCategory from '@/views/categories/EditCategory.vue';
import ListMovies from "@/views/movies/ListMovies.vue"; // Importimi i komponentit ListMovies
import EditMovie from "@/views/movies/EditMovie.vue"; // Importimi i komponentit EditMovie
import CreateMovie from "@/views/movies/CreateMovie.vue"; // Importimi i komponentit CreateMovie

import LoginForm from "@/views/users/LoginForm.vue";
import LandingPage from '@/views/users/LandingPage.vue';
import RegisterForm from "@/views/users/RegisterForm.vue";
import { createRouter, createWebHistory } from "vue-router";
import CreateCategory from '@/views/categories/CreateCategory.vue'; // Importimi i komponentit CreateCategory
import MovieView from "@/views/users/MovieView.vue";
import UsersList from '@/views/admin/UsersList.vue';
import EditUser from '@/views/admin/EditUser.vue';

// Funksioni që kontrollon nëse përdoruesi është admin dhe ka token
function isAuthenticated() {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("user_role");
  return token && role; // Kontrollo nëse ka token dhe rol
}

function isAdmin() {
  const role = localStorage.getItem("user_role");
  return role === 'admin'; // Kontrollo nëse përdoruesi është admin
}

const routes = [
    { path: '/', redirect: '/LandingPage' },
    { path: '/LandingPage', name: 'LandingPage', component: LandingPage },
    { path: '/login', name: 'LoginForm', component: LoginForm },
    { path: '/register', name: 'RegisterForm', component: RegisterForm },
    { path: "/movie/:movieData", name: "MovieView", component: MovieView, props: true },

    { 
        path: '/dashboard', 
        name: 'ListCategories', 
        component: ListCategories,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    }, 
    { 
        path: '/categories/:id/edit', 
        name: 'EditCategory', 
        component: EditCategory,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/categories/create', 
        name: 'CreateCategory', 
        component: CreateCategory,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/movies', 
        name: 'ListMovies', 
        component: ListMovies,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/movies/:id/edit', 
        name: 'EditMovie', 
        component: EditMovie,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/movies/create', 
        name: 'CreateMovie', 
        component: CreateMovie,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/users', 
        name: 'UsersList', 
        component: UsersList,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    { 
        path: '/users/:id/edit', 
        name: 'EditUser', 
        component: EditUser,
        beforeEnter: (to, from, next) => {
            if (!isAuthenticated() || !isAdmin()) {
                next('/login'); // Drejtoje te login nëse përdoruesi nuk është i loguar ose nuk është admin
            } else {
                next(); // Lejo hyrjen nëse është i loguar dhe admin
            }
        }
    },
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
