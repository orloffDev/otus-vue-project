import { describe, it, expect, beforeEach } from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import { mount } from '@vue/test-utils'
import HomePage from '../HomePage.vue'



describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display component', () => {

    // 1. Arrange
    const wrapper = mount(HomePage)
    const expectedText = 'Главная страница'

    // 2. Act
    const realText = wrapper.find('H1').text();
    console.log('realText', realText);

    // 3. Assert
    expect(realText).toBe(expectedText)
  })
})

