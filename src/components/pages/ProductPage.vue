<script setup lang="ts">
  import { ErrorCodes, ref, Ref } from 'vue';
  import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
  import axios, { AxiosResponse, AxiosError } from 'axios';
  import { inject } from 'vue';
  import { useWebSocket } from '@vueuse/core'

  // Типизация для товара
  interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }

  // Типизация для корзины
  interface CartStore {
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    [key: string]: any
  }

  // Типизация для данных просмотра товара
  interface ProductViewData {
    type: 'PRODUCT_VIEW'
    productId: number
    productTitle: string
    productCategory: string
    timestamp: string
    page: string
  }

  // Типизация для ошибки
  interface ErrorWithMessage {
    message: string
  }

  const cartStore = inject<CartStore>('cartStore')

  const route: RouteLocationNormalizedLoaded = useRoute()
  const productId = parseInt(route.params.productId)
  let item: Ref<Product | null> = ref(null)

  let loading: Ref<boolean> = ref(true);
  let errr: Ref<string | null> = ref(null);

  // WebSocket для отслеживания просмотра
  const { status, send } = useWebSocket('wss://echo.websocket.org', {
    autoConnect: true,
    onMessage: (ws: WebSocket, event: MessageEvent) => {
      console.log('Сервер подтвердил просмотр товара:', event.data)
    },
    onConnected: (ws: WebSocket) => {
      console.log('WebSocket подключен для отслеживания просмотров')
    }
  })

const getProduct = async (): Promise<void> => {
    try {
    loading.value = true
    const response: AxiosResponse<Product> = await axios.get(`https://www.kinoafisha.info/frontend/otus-products/${productId}/`)
      item.value = response.data
      // Отправляем просмотр после загрузки данных о товаре
      if (item.value) {
        sendProductView()
      }
  } catch (err) {
    errr.value = err.message || 'Не удалось загрузить товар'
  } finally {
    loading.value = false
  }
}

  // Функция отправки просмотра
  const sendProductView = (): void => {
    if (item.value) {
      const viewData: ProductViewData = {
        type: 'PRODUCT_VIEW',
        productId: item.value.id,
        productTitle: item.value.title,
        productCategory: item.value.category,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      }

      if (status.value === 'OPEN') {
        send(JSON.stringify(viewData))
        console.log('✓ Просмотр товара отправлен:', viewData)
      } else {
        console.log('WebSocket не подключен, просмотр не отправлен')
      }
    }
  }


//
getProduct()


</script>

<template>
  <div>
    <!-- Индикатор статуса (можно убрать, просто для отладки) -->
    <div v-if="!loading && item" class="view-status">
      Статус отслеживания: {{ status === 'OPEN' ? 'активен' : 'подключение...' }}
    </div>


    <div v-if="loading">Загрузка...</div>
    <div v-else-if="errr">{{ errr }}</div>
    <div v-else>
      <div class="product" v-if="item">
          <button class="product_add" @click="cartStore.addToCart(item)">Добавить товар</button>
          <button class="product_remove" @click="cartStore.removeFromCart(item.id)">Удалить товар</button>
        <h1>{{ item.title }}</h1>
        <img :src="item.image" alt="" />
        <p>{{ item.description }}</p>
        <dl>
          <dt>Цена</dt>
          <dd>{{ item.price }}</dd>
          <dt>Категория</dt>
          <dd>{{ item.category }}</dd>
          <dt>Рейтинг</dt>
          <dd>{{ item.rating.rate }}/{{ item.rating.count }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-status {
  font-size: 12px;
  color: #666;
  padding: 4px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>







