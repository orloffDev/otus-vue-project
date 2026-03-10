<script setup>
  import { ErrorCodes, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { inject } from 'vue';

  const cartStore = inject('cartStore')

  const route = useRoute()
  const productId = parseInt(route.params.productId)
  let item = ref(null)

  let loading = ref(true);
  let errr = ref(null);
const getProduct = async () => {
    try {
    loading.value = true
    const response = await axios.get(`https://www.kinoafisha.info/frontend/otus-products/${productId}/`)
      item = response.data
  } catch (err) {
    errr.value = err.message || 'Не удалось загрузить товар'
  } finally {
    loading.value = false
  }
}

getProduct()


</script>

<template>
  <div>
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
  
</style>







