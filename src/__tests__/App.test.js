import {describe, it, expect, beforeEach} from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import HomePage from '../components/pages/HomePage.vue'
import {createPinia, setActivePinia} from "pinia";
import { createRouter, createWebHistory } from 'vue-router'

describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display home page', async () => {
    // 1. Arrange
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: HomePage }
        // add other routes as needed
      ]
    })

    router.push({name: 'home'})
    await router.isReady()
    const wrapper = mount(HomePage, {global: {plugins: [router]}})
    const expectedText = 'Главная страница'

    // 2. Act
    const realText = wrapper.find('H1').text();

    // 3. Assert
    expect(realText).toBe(expectedText)
  })
})

