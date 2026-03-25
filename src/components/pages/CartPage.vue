<script setup lang="ts">
import Product from '../prod/Product.vue'
  import {inject} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "../../stores/UserStorage";


  // Типизация для товара
  interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }

  // Типизация для корзины
  interface CartStore {
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    [key: string]: any
  }

  const cartStore = inject<CartStore>('cartStore')
  const {isEmpty, items} = cartStore

  //Авторизованный пользователь
  const userStorage = useUserStore(); //userStore
  const {authData} = storeToRefs(userStorage);

</script>

<template>
  <button class="cat_clear" @click="cartStore.clearCart()">Очистить корзину</button>
  <button v-if="authData" class="cat_clear" @click="cartStore.order(authData.address)">Заказать</button>
  <router-link v-else class="cat_clear" to="/auth">Заказать</router-link>

  <h1>Корзина</h1>
  <div v-if="isEmpty">Нет ничего в корзине</div>
  <div v-else class="items">
    <div class="item" v-for="item in items">
      <Product
          :id="item.product.id"
          :title="item.product.title"
          :description="item.product.description"
          :image="item.product.image"
          :price="item.product.price"
          :category="item.product.category"
          :rating-rate="item.product.rating.rate"
          :rating-count="item.product.rating.count"
          class="list_left"
      />
      <div class="product_right">
        Количество {{item.quantity}}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .items {
    display:grid;
    grid-template-columns: 3fr 1fr;
    column-gap: 30px;
    row-gap: 10px;
  }
  .item {
    display: contents;
  }
</style>







