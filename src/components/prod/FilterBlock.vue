<script setup>
  const formData = defineModel('formData'); 
</script>

<template>
  <h2>Фильтр</h2>
  <input v-model="formData.title" placeholder="по названию" />
  <input v-model="formData.minPrice" type="number" placeholder="минимальная цена"/>
  <input v-model="formData.maxPrice" type="number" placeholder="максимальная цена"/>
  
</template>

<style scoped>
  input {
    width:100%;
    margin-bottom:10px;
  }
</style>







