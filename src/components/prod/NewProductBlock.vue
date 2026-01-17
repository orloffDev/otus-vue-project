<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

const state = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) }
}

const v$ = useVuelidate(rules, state)

const submit = async () => {
  const isValid = await v$.value.$validate()
  if (isValid) {
    // Отправка формы
  }
}
</script>

<template>
  <h2>Новый товар</h2>
  <form @submit.prevent="submit">
    <input 
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







