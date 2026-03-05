import { describe, it, expect, beforeEach } from 'vitest'
import {createPinia, setActivePinia} from "pinia";
import { mount } from '@vue/test-utils'
import AddProduct from '../AddProduct.vue'



describe('App', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display component', () => {

    // 1. Arrange
    const wrapper = mount(AddProduct)
    const expectedText = 'Страница добавления товара'

    // 2. Act
    const realText = wrapper.find('H1').text();
    console.log('realText', realText);

    // 3. Assert
    expect(realText).toBe(expectedText)
  })
})

