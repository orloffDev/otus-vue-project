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

// Определение маршрутов
const routes = [
  { path: '/', component: HomePage },
  { path: '/catalog', component: CatalogPage },
  { path: '/product/:productId', component: ProductPage, name: 'product'},
  { path: '/add-product', component: AddProduct}
]

// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Подключение роутера к приложению
const app = createApp(App)
app.use(router)
app.mount('#app')