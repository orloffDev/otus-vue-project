<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const state = reactive({
  title: '',
  price: '',
  description: '',
  category: '',
  image: '',
})

const rules = {
  title: { required},
  price: { required},
  description: { required},
  category: { required},
  image: { required}
}

const v$ = useVuelidate(rules, state)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    // Отправка формы
    alert('Товар добавлен');
  }
}
</script>

<template>
  <form @submit.prevent="submit">

    <label>Заголовок</label>
    <input 
      name="title"
      type="text"
      v-model="state.title"
    />
    <br />
    <label>Цена</label>
    <input 
      name="price"
      type="number"
      v-model="state.price"
    />
  <br />
    <label>Описание</label>
    <textarea
      name="description"
      v-model="state.description"
    ></textarea>
    <br />
    <label>Категория</label>
    <select
      name="category"
      v-model="state.category"
    >
      <option value="1">Категория 1</option>
      <option value="2">Категория 2</option>
      <option value="3">Категория 3</option>
    </select>
    <br />
    <label>Изображение</label>
    <input 
      name="image"
      type="text"
      v-model="state.image"
    />
    <br />
    <button :disabled="v$.$invalid">Submit</button>
  </form>
</template>

<style scoped>

</style>







