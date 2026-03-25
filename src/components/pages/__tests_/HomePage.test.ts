import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from '../HomePage.vue'



describe('App', () => {
  it('should display component', () => {

    // 1. Arrange
    const wrapper = mount(HomePage)
    const expectedText = 'Акции недели'

    // 2. Act
    const realText = wrapper.find('H2').text();

    // 3. Assert
    expect(realText).toBe(expectedText)
  })
})

