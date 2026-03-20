<script setup lang="ts">
  import {inject} from "vue";

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
  const cartStore = inject<CartStore>('cartStore')
</script>

<template>
  <h1>Корзина</h1>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section>
        <h2>Товары из корзины</h2>
        <Products :items="popularProductsData" />
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>







