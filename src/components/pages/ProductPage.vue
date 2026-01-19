<script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

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
    error.value = err.message || 'Не удалось загрузить товар'
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
</template>

<style scoped>
  
</style>







