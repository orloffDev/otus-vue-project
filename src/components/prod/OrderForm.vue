<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import axios from 'axios'

const state = reactive({
  name: '',
  date: '',
  email: ''
})

const rules = {
  name: {required, minLength: minLength(5) },
  date: {required},
  email: { required, email },
}

const v$ = useVuelidate(rules, state)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    try {
      const response = await axios.get('https://httpbin.org/', {
      params: state
    })
      
      alert(`Данные отправлены! Ответ сервера: ${response.status}`)
    } catch (error) {
      alert(`Ошибка: ${error}`)
    }
  }
}
</script>

<template>
  <h2>Форма заказа</h2>
  <form @submit.prevent="submit">
    <label>ФИО</label>
    <input 
      name="name"
      type="text"
      v-model="state.name" 
      @blur="v$.name.$touch"
      :class="{ 'error': v$.name.$error }"
    />

    <label>Дата рождения</label>
    <input 
      name="name"
      type="date"
      v-model="state.date" 
      @blur="v$.date.$touch"
      :class="{ 'error': v$.date.$error }"
    />

    <label>"Электронная почта"</label>
    <input 
      name="email"
      type="email"
      v-model="state.email" 
      @blur="v$.email.$touch"
      :class="{ 'error': v$.email.$error }"
    />
    <div v-if="v$.email.$error" class="error-messages">
      <div v-for="error in v$.email.$errors" :key="error.$uid">
        {{ error.$message }}
      </div>
    </div>
    
    <button :disabled="v$.$invalid">Submit</button>
  </form>
</template>

<style scoped>
  input {
    width:100%;
    margin-bottom:10px;
  }
</style>







