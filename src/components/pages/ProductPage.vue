<script setup>
  import { ErrorCodes, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { inject } from 'vue';
  import { useWebSocket } from '@vueuse/core'

  const cartStore = inject('cartStore')

  const route = useRoute()
  const productId = parseInt(route.params.productId)
  let item = ref(null)

  let loading = ref(true);
  let errr = ref(null);

  // WebSocket для отслеживания просмотра
  const { status, send } = useWebSocket('wss://echo.websocket.org', {
    autoConnect: true,
    onMessage: (ws, event) => {
      console.log('Сервер подтвердил просмотр товара:', event.data)
    },
    onConnected: () => {
      console.log('WebSocket подключен для отслеживания просмотров')
    }
  })

const getProduct = async () => {
    try {
    loading.value = true
    const response = await axios.get(`https://www.kinoafisha.info/frontend/otus-products/${productId}/`)
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
  const sendProductView = () => {
    if (item.value) {
      const viewData = {
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







