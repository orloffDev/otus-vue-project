<script setup>
  import { inject } from 'vue';
  const cartStore = inject('cartStore')
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/catalog">Каталог</router-link> |
      <router-link to="/add-product">Добавить товар</router-link> 
    </nav>
    <div class="cat">
        <p>Товаров в корзине: <span>{{ cartStore.count }}</span></p>
    <button @click="cartStore.clearCart()">Очистить корзину</button>
    </div>
  </header>
</template>

<style scoped>
  header {
    background-color: #000;
    margin-bottom:20px;
    padding: 20px 20px;
  }

  @media (min-width: 760px){
    header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }


</style>







