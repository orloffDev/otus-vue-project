<script setup>
import Product from './Product.vue'
const props = defineProps(['items']);

</script>

<template>
  <div class="products">
    <Product
        v-for="item in items"
        :title="item.title"
        :description="item.description"
        :image="item.image"
        :price="item.price"
        :category="item.category"
        :rating-rate="item.rating.rate"
        :rating-count="item.rating.count"
        class="product"
    />
  </div>
</template>

<style scoped>
  @media (max-width: 759px){
    .products{
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    }
  }

  @media (min-width: 760px){
    .products{
      display: grid; 
      grid-template-columns: repeat(3, minmax(0, 1fr));
      column-gap: 10px;
      row-gap: 10px;
    }
  }
</style>
