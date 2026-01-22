<script setup>
  import { inject } from 'vue';
  const cartStore = inject('cartStore')
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/catalog">Каталог</router-link> 
    </nav>
    <p>Товаров в корзине: <span>{{ cartStore.count }}</span></p>
  </header>
</template>

<style scoped>

</style>







