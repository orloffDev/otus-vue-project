<script setup lang="ts">
  import { provide } from 'vue';
  import Navigation from './components/prod/Navigation.vue';
  import { useCart } from './composables/useCart';
  const cartStore = useCart()
  provide('cartStore', cartStore)
</script>

<template>
  <div id="app">
    <Navigation />
    
    <!-- Здесь будут появляться компоненты -->
    <router-view></router-view>
  </div>
</template>