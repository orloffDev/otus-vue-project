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


  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">OTUS</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav>
        <b-nav-item to="/">Главная</b-nav-item>
        <b-nav-item to="/catalog">Каталог</b-nav-item>
        <b-nav-item to="/add-product">Добавить товар</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ms-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Пользователь</em>
          </template>
            <b-dropdown-item v-if="authData" @click="handleLogout">Выйти</b-dropdown-item>
            <b-dropdown-item  v-else to="/auth">Войти</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/cart">Корзина <span class="cat_number">{{ cartStore.count }}</span></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style scoped>

</style>







