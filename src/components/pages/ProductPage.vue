<script setup lang="ts">
import {computed, ErrorCodes, ref, Ref} from 'vue';
  import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
  import { inject } from 'vue';
  import {gql} from "@apollo/client/core";
  import {useQuery} from "@vue/apollo-composable";

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




  let errr: Ref<string | null> = ref(null);


  // GraphQL запрос для получения списка продуктов
  const PRODUCT_QUERY = gql`
  query GetPost {
    post(id: ${productId}) {
      id
      title
      body
    }
  }
`
  // Выполняем запрос
  const { result, loading, error, refetch } = useQuery(PRODUCT_QUERY)

  const item = computed<Product[]>(() =>{
    if (result.value?.post) {
      const product = result.value.post;
      return {
        price: Math.random()*1000,
        decription: product.body,
        category: 'Категория',
        rating: {
          "rate": Math.random()*10,
          "count": Math.random()*100,
        },
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        ...product
      }
    }
  return null
})



const getProduct = async (): Promise<void> => {
    try {
    loading.value = true;
    const response = await axios.post(`https://www.kinoafisha.info/frontend/otus-products/${productId}/`)

      console.log(response.data);

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
//getProduct()


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







