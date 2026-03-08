<script setup>
  import { inject } from 'vue';
  import {useUserStore} from "../../stores/UserStorage";
  import {storeToRefs} from "pinia";
  import { useRouter, useRoute } from 'vue-router'

  const cartStore = inject('cartStore')

  const router = useRouter()
  const route = useRoute()

  //Авторизованный пользователь
  const userStorage = useUserStore(); //userStore
  const {authData} = storeToRefs(userStorage);

  const handleLogout = ()=>{
    userStorage.logout();

    router.push('/')
  }
</script>

<template>
  <header class="header">


    <div class="header_left">
      <nav>
        <router-link to="/">Главная</router-link> |
        <router-link to="/catalog">Каталог</router-link> |
        <router-link to="/add-product">Добавить товар</router-link>
      </nav>
    </div>
    <div class="header_right">
      <div v-if="authData">
        <button
            @click="handleLogout"
            class="btn btn-logout"
        >
          Выйти
        </button>
      </div>
      <div v-else>
        <router-link to="/auth">Войти</router-link>
      </div>
      <div class="cat">
        <p>Товаров в корзине: <span class="count-text">{{ cartStore.count }}</span></p>
        <button @click="cartStore.clearCart()">Очистить корзину</button>
      </div>
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
      column-gap: 20px;
    }
  }


</style>







