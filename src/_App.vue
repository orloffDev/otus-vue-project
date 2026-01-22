<!-- ParentComponent.vue -->
<script setup>
  import BottomToTopParent from './components/study/components-interaction/bottom-to-top/BottomToTopParent.vue';
import TopToBottomParent from './components/study/components-interaction/top-to-bottom/TopToBottomParent.vue';
</script>

<template>
  <h2>Взаимодействие между компонентами</h2>
  <h3>1. Сверху вниз</h3>
  <TopToBottomParent></TopToBottomParent>
  <h3>2. Снизу вверх</h3>
  <BottomToTopParent />
</template>