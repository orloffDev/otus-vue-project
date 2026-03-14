import { createApp, provide, h} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import './style.css'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import {useUserStore} from "./stores/UserStorage";

import {createPinia} from "pinia";
import {storeToRefs} from "pinia";

//Натсройки аякса
axios.defaults.headers.common['X-Request-Ajax'] = 1;

// Импорт компонентов
import HomePage from './components/pages/HomePage.vue'
import CatalogPage from './components/pages/CatalogPage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import AddProduct from './components/pages/AddProduct.vue'
import AuthPage from './components/pages/AuthPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'
import { RouteRecordRaw } from 'vue-router'

// Создаем Apollo Client
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  cache: cache,
  uri: 'https://graphqlzero.almansi.me/api', // Публичное тестовое API
})

// Определение маршрутов
const routes: RouteRecordRaw[] = [
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
  //Авторизованный пользователь
  const userStore = useUserStore();
  const {authData} = storeToRefs(userStore);

  if (to.meta.isRequiresAuth && !authData.value) {
    next({
      name: 'auth',
      query: { redirect: to.fullPath } // Сохраняем куда хотел пользователь
    })
  } else {
    next() 
  }
})


// Подключение роутера и хранилища(pinia) к приложению
const app = createApp({
  setup() {
    // 2. Предоставляем клиент всему приложению
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')