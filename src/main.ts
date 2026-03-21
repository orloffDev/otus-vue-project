import { createApp, provide, h, App as VueApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import axios, { AxiosInstance } from 'axios'
import './style.css'
import App from './App.vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { useUserStore } from "./stores/UserStorage";
import { createPinia, Pinia } from "pinia";
import { storeToRefs } from "pinia";


// Правильный импорт для Vue 3
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


// Импорт компонентов
import HomePage from './components/pages/HomePage.vue'
import CatalogPage from './components/pages/CatalogPage.vue'
import ProductPage from './components/pages/ProductPage.vue'
import AddProduct from './components/pages/AddProduct.vue'
import AuthPage from './components/pages/AuthPage.vue'
import CartPage from './components/pages/CartPage.vue'
import NotFoundPage from './components/pages/NotFoundPage.vue'

// Типизация для мета-полей маршрутов
declare module 'vue-router' {
  interface RouteMeta {
    isRequiresAuth?: boolean
  }
}

// Типизация ответа API (если нужно)
interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
}

// Настройки аякса с типами
;(axios as AxiosInstance).defaults.headers.common['X-Request-Ajax'] = 1

// Создаем Apollo Client с типами
const cache: InMemoryCache = new InMemoryCache()
const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  uri: 'https://graphqlzero.almansi.me/api', // Публичное тестовое API
})

// Определение маршрутов с типами
const routes: RouteRecordRaw[] = [
  { path: '/', component: HomePage },
  { path: '/catalog', component: CatalogPage },
  {
    path: '/product/:productId',
    component: ProductPage,
    name: 'product',
    props: true // передаем productId как пропс
  },
  {
    path: '/add-product',
    component: AddProduct,
    meta: { isRequiresAuth: true }
  },
  {
    path: '/auth',
    component: AuthPage,
    name: 'auth'
  },
  {
    path: '/cart',
    component: CartPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]

// Создание роутера с типами
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Типизированный навигационный гард
router.beforeEach((
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
  // Создаем экземпляр хранилища
  const userStore = useUserStore();
  const { authData } = storeToRefs(userStore);

  // Проверяем требует ли маршрут авторизации
  if (to.meta.isRequiresAuth && !authData.value) {
    next({
      name: 'auth',
      query: { redirect: to.fullPath } // Сохраняем куда хотел пользователь
    })
  } else {
    next()
  }
})

// Типизация для props компонента
interface AppProps {
  apolloClient?: ApolloClient<NormalizedCacheObject>
}

// Создание приложения с типами
const app: VueApp<Element> = createApp({
  setup(): void {
    // Предоставляем клиент всему приложению
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

// Создание Pinia с типами
const pinia: Pinia = createPinia()

// Подключение плагинов с типами
app.use(router)
app.use(pinia)
app.use(BootstrapVue3)

// Монтирование приложения
app.mount('#app')

// Экспорт для использования в других файлах (опционально)
export { router, pinia, apolloClient }