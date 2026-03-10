<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import { useRoute, useRouter } from 'vue-router'
  import {useUserStore} from "../../stores/UserStorage";

  const route = useRoute() // ← Получаем текущий маршрут
  const router = useRouter()

  const userStorage = useUserStore();

  const state = reactive({
    password: '',
    login: '',
    address: ''
  })

  const rules = {
    password: {required},
    login: { required, email },
    address: { required }
  }

  const v$ = useVuelidate(rules, state)

  const submit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
      // Сохраняем все значения из полей
      const authData = {
        login: state.login,
        password: state.password,
        address: state.address,
        token: 'asdasdasdsadad'
      }



        //Эмулируем авторизацию
        userStorage.login(authData);

      // ПОЛУЧАЕМ redirect параметр из query
      const redirect = route.query.redirect

      // Редиректим обратно или на главную
      if (redirect) {
        router.push(redirect) // ← Вернем туда, откуда пришел
      } else {
        router.push('/') // ← На главную, если нет redirect
      }
    }
  }
</script>

<template>
  <h1>Страница авторизации</h1>
  <form @submit.prevent="submit">
    <label>Логин(Электронная почта)</label>
    <input 
      name="login"
      type="email"
      v-model="state.login" 
      @blur="v$.login.$touch"
      :class="{ 'error': v$.login.$error }"
    />
    <label>Адрес</label>
    <input
        name="adress"
        type="text"
        v-model="state.address"
        @blur="v$.address.$touch"
        :class="{ 'error': v$.address.$error }"
    />
    <label>Пароль</label>
    <input 
      name="password"
      type="password"
      v-model="state.password" 
      @blur="v$.password.$touch"
      :class="{ 'error': v$.password.$error }"
    />

    <button :disabled="v$.$invalid">Войти</button>
  </form>
</template>

<style scoped>
input {
  width:100%;
  margin-bottom:5px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>






