<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import {ref, computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import Products from '../prod/Products.vue';
import FilterBlock from '../prod/FilterBlock.vue';
import OrderForm from '../prod/OrderForm.vue';
import { useWebSocket } from '@vueuse/core'

// Типизация для данных продукта
interface Product {
  id: string | number
  title: string
  price: number
  decription?: string
  category?: string
  rating?: {
    rate: number
    count: number
  }
  image?: string
  body?: string
}

// GraphQL запрос для получения списка продуктов
const PRODUCTS_QUERY = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`
// Выполняем запрос
const { result, loading, error, refetch } = useQuery(PRODUCTS_QUERY)





const allProductsData = computed<Product[]>(() =>{
  if (result.value?.posts?.data) {
    return result.value.posts.data.map(product => ({
      price: Math.random()*1000,
      decription: product.body,
      category: 'Категория',
      rating: {
        "rate": Math.random()*10,
        "count": Math.random()*100,
      },
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      ...product
    }))
  }
  return []
})

//search



const getProducts = async () => {
  try {
    loading.value = true
    const response = await axios.post('https://www.kinoafisha.info/frontend/otus-products/')
    allProductsData.value = response.data
    filteredProductsData.value = response.data
  } catch (err) {
    error.value = err.message || 'Не удалось загрузить товары'
  } finally {
    loading.value = false
  }
}



const formData = reactive({
  title: '',
  minPrice: '',
  maxPrice: ''
})

/**
 * Формула: (рейтинг * количество отзывов) / 100
 */
const popularProductsData = computed(() => {
  return [...allProductsData.value]
      .sort((a, b) => {
        const scoreA = a.rating.rate * a.rating.count
        const scoreB = b.rating.rate * b.rating.count
        return scoreB - scoreA
      })
      .slice(0, 6)
})


const { status,
  data,
  send,  // ← вот эту переменную нужно обязательно получить!
  open,
  close  } = useWebSocket('wss://echo.websocket.org', {
  onMessage: (ws, event) => {
    console.log('Echo response:', event.data)
  }
})

// Отправка тестового сообщения
const sendTest = () => {
  send(JSON.stringify({
    type: 'test',
    message: 'Hello Server!'
  }))
}

sendTest();

//
//getProducts();

</script>

<template>
  <h1>Главная страница</h1>

  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section>
        <h2>Популярные товары</h2>
        <Products :items="popularProductsData" />
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>







