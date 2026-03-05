import { describe, it, expect, beforeEach } from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import { mount } from '@vue/test-utils'
import AuthPage from '../AuthPage.vue'



describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display component', () => {

    // 1. Arrange
    const wrapper = mount(AuthPage)
    const expectedText = 'Страница авторизации'

    // 2. Act
    const realText = wrapper.find('H1').text();
    console.log('realText', realText);

    // 3. Assert
    expect(realText).toBe(expectedText)
  })
})

