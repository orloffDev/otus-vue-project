<script setup>
  const formData = defineModel('formData'); 
</script>

<template>
  <article>
    <h2>Фильтр</h2>
  <input v-model="formData.title" placeholder="по названию" />
  <input v-model="formData.minPrice" type="number" placeholder="минимальная цена"/>
  <input v-model="formData.maxPrice" type="number" placeholder="максимальная цена"/>
  </article>
  
  
</template>

<style scoped>
  input {
    margin-bottom:10px;
  }
</style>







