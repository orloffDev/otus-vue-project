<script setup>
  const props = defineProps([
    'title',
    'description',
    'price',
    'category',
    'image',
      'ratingRate',
      'ratingCount'
  ]);
</script>

<template>
  <article>
    <img :src="props.image" alt="" />
    <h3>{{ props.title }}</h3>
    <p>{{ props.description }}</p>
    <dl>
      <dt>Цена</dt>
      <dd>{{ props.price }}</dd>
      <dt>Категория</dt>
      <dd>{{ props.category }}</dd>
      <dt>Рейтинг</dt>
      <dd>{{ props.ratingRate }}/{{ props.ratingCount }}</dd>
    </dl>
  </article>
</template>

<style scoped>
   article{
     padding:20px;
     overflow-wrap: break-word;
     color:#000;
      background-color: #d7d1d1;
      border-radius:10px;
   }

   img {
      display:block;
      width:100%;
      margin-bottom: 20px;
   }

   h3{
    margin-top:0;
   }

   dl {
     text-align: left;
   }
</style>







