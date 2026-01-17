<!-- ChildComponent.vue -->
<script setup>
import { watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'Заголовок'
  }
})

// Следим за его изменениями
watch(() => props.title, (newValue) => {
  console.log('Count получил новое значение:', newValue);
  debugger
})

</script>

<template>
  <h2>{{ title }}</h2>
</template>