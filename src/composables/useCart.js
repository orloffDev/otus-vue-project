import { reactive, computed, watch } from 'vue'

export function useCart() {
  // Инициализируем состояние корзины
  const state = reactive({
    items: [],
    initialized: false
  })

  const count = computed(() => {
    let count = 0;
    state.items.forEach((item)=>{
        count = count + item.quantity || 0
    });
    return count;
  })

  // Загружаем корзину из localStorage
  const loadCart = () => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        state.items = parsed
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error)
      state.items = []
    }
    state.initialized = true
  }

  // Сохраняем корзину в localStorage
  const saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items))
    } catch (error) {
      console.error('Ошибка сохранения корзины:', error)
    }
  }

  // Добавить товар в корзину
  const addToCart = (product, quantity = 1) => {
    if (!state.initialized) loadCart()
    
    const existingItem = state.items.find(item => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      state.items.push({
        product: { ...product },
        quantity
      })
    }
    
    saveCart()
  }

  // Удалить товар из корзины
  const removeFromCart = (productId) => {
    const index = state.items.findIndex(item => item.product.id === productId)
    if (index !== -1) {
      state.items[index].quantity --;
      if(state.items[index].quantity === 0) state.items.splice(index, 1)
      saveCart()
    }
  }

  // Изменить количество товара
  const updateQuantity = (productId, quantity) => {
    const item = state.items.find(item => item.product.id === productId)
    if (item) {
      if (quantity > 0) {
        item.quantity = quantity
      } else {
        removeFromCart(productId)
      }
      saveCart()
    }
  }

  // Очистить корзину
  const clearCart = () => {
    state.items = []
    saveCart()
  }

  // Вычисляемые свойства
  const totalItems = computed(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const isEmpty = computed(() => state.items.length === 0)

  loadCart();

  // Автоматически сохраняем при изменении
  watch(() => state.items, saveCart, { deep: true })

  return {
    cart: state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    totalItems,
    totalPrice,
    isEmpty,
    count
  }
}