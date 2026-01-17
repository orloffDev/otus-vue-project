<script setup>
  import { ref } from 'vue'
  import BottomToTopChild from './BottomToTopChild.vue'
  let message = ref('');
  const onUpdate = (text)=>{
    message.value = text;
  }

</script>

<template>
  <p>{{ message }}</p>
  <BottomToTopChild 
    @update="onUpdate" 
  />
</template>