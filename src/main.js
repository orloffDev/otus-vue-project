import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import './style.css'
import App from './App.vue'

//Натсройки аякса
axios.defaults.headers.common['X-Request-Ajax'] = 1;

// Импорт компонентов
import HomePage from './components/pages/HomePage.vue'
import CatalogPage from './components/pages/CatalogPage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import AddProduct from './components/pages/AddProduct.vue'
import AuthPage from './components/pages/AuthPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'

// Определение маршрутов
const routes = [
  { path: '/', component: HomePage },
  { path: '/catalog', component: CatalogPage },
  { path: '/product/:productId', component: ProductPage, name: 'product'},
  { path: '/add-product', component: AddProduct,  meta:{ isRequiresAuth: true}},
  { path: '/auth', component: AuthPage, name: 'auth'},
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage // создайте этот компонент
  }
]

// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.meta.isRequiresAuth && !isAuthenticated) {
    next({
      name: 'auth',
      query: { redirect: to.fullPath } // Сохраняем куда хотел пользователь
    })
  } else {
    next() 
  }
})


// Подключение роутера к приложению
const app = createApp(App)
app.use(router)
app.mount('#app')