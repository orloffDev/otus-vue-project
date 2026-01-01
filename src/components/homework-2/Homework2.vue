<script setup>
import {ref}  from 'vue';
import UserList from './UserList.vue'

const BUTTON_LIST_TEXT = Object.freeze({
  'show': 'Показать список',
  'hide': 'Спрятать список'
});

const BUTTON_AGE_TEXT = 'Показать возраст';

let buttonText = ref(BUTTON_LIST_TEXT.show);

let isListShow = false;

/**
 *
 */
const toggleList = function(){
  /**
   * Текст кнопки
   * @type {string}
   */
  const textValue = isListShow ? BUTTON_LIST_TEXT.show : BUTTON_LIST_TEXT.hide;
  buttonText.value = textValue;
  isListShow = !isListShow;
}
</script>

<template>
  <h2>Домашнее задание 2</h2>
  <p>Создать Vue-приложение, где:</p>
  <ul>
    <li>Вывести список пользователей (например, имена) с помощью v-for.</li>
    <li>Реализовать переключение отображения дополнительной информации (например, возраста) через v-if или v-show.</li>
    <li>Использовать v-bind для изменения цвета текста при наведении.</li>
    <li>Добавить кнопку, которая при клике (v-on) скрывает или показывает весь список.</li>
  </ul>
  <h2>Результат:</h2>

  <button @click="toggleList()">{{buttonText}}</button>

  <UserList v-if="isListShow" />

</template>

