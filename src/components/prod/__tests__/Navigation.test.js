import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Navigation from '../Navigation.vue'
import { ref } from 'vue';

describe('Navigation', () => {
  it('вызывает clearCart при клике на кнопку очистки корзины', async () => {
    // Создаем реактивное состояние с ref
    const count = ref(5)

    // Создаем мок для cartStore с функцией clearCart
    const mockCartStore = {
      count,
      clearCart: vi.fn(() => {
        count.value = 0 // Обновляем реактивное значение
      })
    }

    // Монтируем компонент
    const wrapper = mount(Navigation, {
      global: {
        provide: {
          cartStore: mockCartStore
        },
        stubs: ['router-link'] // Заглушка для router-link
      }
    })

    // Проверяем начальное состояние
    expect(mockCartStore.count.value).toBe(5)
    expect(wrapper.find('span').text()).toBe('5')

    // Находим кнопку и кликаем по ней
    const button = wrapper.find('button')
    await button.trigger('click')

    // Проверяем, что функция clearCart была вызвана
    expect(mockCartStore.clearCart).toHaveBeenCalled()
    expect(mockCartStore.clearCart).toHaveBeenCalledTimes(1)

    // Проверяем, что функция выполнилась правильно (обновила count)
    expect(mockCartStore.count.value).toBe(0)

    // Ждем обновления DOM и проверяем отображение
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span.count-text').text()).toBe('0')
  })
})