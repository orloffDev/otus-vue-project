<!-- ChildComponent.vue -->
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['update'])

  const onClick = ()=>{
    emit('update', 'Событие из дочернего компонента');
  };
</script>

<template>
  <button @click="onClick()">Кликнуть на дочернюю кнопку</button>
</template>