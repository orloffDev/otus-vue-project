<script setup>
import { reactive} from 'vue';
import {ref}  from 'vue';

const users = reactive({
  user1:{
    name: 'Иванов',
    age: 69
  },
  user2:{
    name: 'Петров',
    age: 32
  },
  user3:{
    name: 'Сидоров',
    age: 21
  }
});
let hoveredIndex = ref(-1);
let isAge = ref(false);
const showAge = function(){
  isAge.value = true;
}
</script>

<template>
  <ul>
    <li
        v-for="(user, index) in users"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = -1"
        :style="{color: hoveredIndex === index ? 'red' : 'white'}"
    >
      {{user.name}} <span v-show="isAge">{{user.age}}</span>
    </li>
  </ul>
  <button v-show="!isAge" @click="showAge()">Показать возраст</button>
</template>





