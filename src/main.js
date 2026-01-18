import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Импорт компонентов
import Home from './components/pages/Home.vue'
import CatalogPage from './components/pages/CatalogPage.vue'
import ProductPage from './components/pages/ProductPage.vue'

// Определение маршрутов
const routes = [
  { path: '/', component: Home },
  { path: '/catalog', component: CatalogPage },
  { path: '/product/:productId', component: ProductPage, name: 'product'}
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