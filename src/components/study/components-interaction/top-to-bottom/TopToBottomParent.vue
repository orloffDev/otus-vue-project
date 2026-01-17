<script setup>
  import { ref } from 'vue'
  import TopToBottomChild from './TopToBottomChild.vue'
  let title = ref('Заголовок из родителя');
  const onClick = ()=>{
    title = "Заголовок меняется через родителя"
  }
</script>

<template>
  <TopToBottomChild :title="title" />
  <button @click="onClick()">Изменить заголовок</button>
</template>