<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import Product from '../prod/Product.vue';

  const route = useRoute()
  const productId = parseInt(route.params.productId)
  let item = ref({})

  const loading = ref(true)
const error = ref(null)
const getProduct = async () => {
    try {
    loading.value = true
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`)
      item = response.data
  } catch (err) {
    error.value = err.message || 'Не удалось загрузить товары'
  } finally {
    loading.value = false
  }
}

getProduct()


</script>

<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <Product
        :id="item.id"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :price="item.price"
        :category="item.category"
        :rating-rate="item.rating.rate"
        :rating-count="item.rating.count"
        class="product"
    />
    </div>
  </div>
</template>

<style scoped>
  
</style>







