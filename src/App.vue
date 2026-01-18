<script setup lang="ts">
import Navigation from './components/prod/Navigation.vue';

</script>

<template>
  <div id="app">
    <Navigation />
    
    <!-- Здесь будут появляться компоненты -->
    <router-view></router-view>
  </div>
</template>