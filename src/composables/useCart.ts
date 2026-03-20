import { reactive, computed, watch } from 'vue'

// Типы данных
interface Product {
  id: number | string
  title?: string
  name?: string
  price: number
  [key: string]: any // для дополнительных полей
}

interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  initialized: boolean
}

export function useCart() {
  // Инициализируем состояние корзины с типами
  const state = reactive<CartState>({
    items: [],
    initialized: false
  })

  const count = computed<number>(() => {
    let count = 0;
    state.items.forEach((item: CartItem) => {
      count = count + (item.quantity || 0)
    });
    return count;
  })

  // Загружаем корзину из localStorage
  const loadCart = (): void => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[]
        state.items = parsed
      }
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error)
      state.items = []
    }
    state.initialized = true
  }

  // Сохраняем корзину в localStorage
  const saveCart = (): void => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items))
    } catch (error) {
      console.error('Ошибка сохранения корзины:', error)
    }
  }

  // Добавить товар в корзину
  const addToCart = (product: Product, quantity: number = 1): void => {
    if (!state.initialized) loadCart()

    const existingItem = state.items.find((item: CartItem) => item.product.id === product.id)

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
  const removeFromCart = (productId: number | string): void => {
    const index = state.items.findIndex((item: CartItem) => item.product.id === productId)
    if (index !== -1) {
      state.items[index].quantity--
      if(state.items[index].quantity === 0) {
        state.items.splice(index, 1)
      }
      saveCart()
    }
  }

  // Изменить количество товара
  const updateQuantity = (productId: number | string, quantity: number): void => {
    const item = state.items.find((item: CartItem) => item.product.id === productId)
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
  const clearCart = (): void => {
    state.items = []
    saveCart()
  }

  // Вычисляемые свойства
  const totalItems = computed<number>(() => {
    return state.items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  })

  const items = computed(() => {
    return state.items
  })

  const totalPrice = computed<number>(() => {
    return state.items.reduce((total: number, item: CartItem) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  })

  const isEmpty = computed<boolean>(() => state.items.length === 0)

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
    items,
    totalPrice,
    isEmpty,
    count
  }
}