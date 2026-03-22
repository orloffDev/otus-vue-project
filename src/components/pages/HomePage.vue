<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import {ref, computed, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Products from '../prod/Products.vue';
import FilterBlock from '../prod/FilterBlock.vue';
import OrderForm from '../prod/OrderForm.vue';
import { useWebSocket } from '@vueuse/core'

import lightGallery from 'lightgallery'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'


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


const galleryRef = ref(null)
let lgInstance = null

const images = ref([
  {
    url: 'https://picsum.photos/id/1015/1920/1080',
    thumbnail: 'https://picsum.photos/id/1015/200/150',
    alt: 'Горы',
    width: 1920,
    height: 1080
  },
  {
    url: 'https://picsum.photos/id/104/1920/1080',
    thumbnail: 'https://picsum.photos/id/104/200/150',
    alt: 'Озеро',
    width: 1920,
    height: 1080
  },
  {
    url: 'https://picsum.photos/id/106/1920/1080',
    thumbnail: 'https://picsum.photos/id/106/200/150',
    alt: 'Цветы',
    width: 1920,
    height: 1080
  },
  {
    url: 'https://picsum.photos/id/104/1920/1080',
    thumbnail: 'https://picsum.photos/id/104/200/150',
    alt: 'Озеро',
    width: 1920,
    height: 1080
  }
])

onMounted(() => {
  if (galleryRef.value) {
    lgInstance = lightGallery(galleryRef.value, {
      plugins: [lgThumbnail, lgZoom],
      speed: 500,
      download: false,
      counter: true,
      loop: true,
      thumbnail: true,
      zoomFromOrigin: true,
      autoplayFirstVideo: false
    })
  }
})


</script>

<template>
  <h2>Акции недели</h2>
  <div class="gallery-container">
    <div ref="galleryRef" id="lightgallery">
      <a
          v-for="(image, idx) in images"
          :key="idx"
          :href="image.url"
          :data-lg-size="`${image.width}-${image.height}`"
      >
        <img :src="image.thumbnail || image.url" :alt="image.alt" />
      </a>
    </div>
  </div>

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
.gallery-container {
  padding: 20px;
}

#lightgallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

#lightgallery a {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  transition: transform 0.3s;
}

#lightgallery a:hover {
  transform: scale(1.05);
}

#lightgallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>







