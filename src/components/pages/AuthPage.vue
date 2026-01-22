<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute() // ← Получаем текущий маршрут
  const router = useRouter()

  const state = reactive({
    password: '',
    login: ''
  })

  const rules = {
    password: {required},
    login: { required, email },
  }

  const v$ = useVuelidate(rules, state)

  const submit = async () => {
    const isValid = await v$.value.$validate()
    if (isValid) {
        //Эмулируем авторизацию
        localStorage.setItem('token', 'adwadwdwa')

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
    <input 
      name="password"
      type="text"
      v-model="state.password" 
      @blur="v$.password.$touch"
      :class="{ 'error': v$.password.$error }"
    />



    
    <button :disabled="v$.$invalid">Submit</button>
  </form>
</template>

<style scoped>
  input {
    width:100%;
    margin-bottom:10px;
  }
</style>







