```
npm run dev
```

nextTick().then - d в доме уже измененное значение

Отличия ref от reactive  
reactive -  с объектами и массивами

Плюсы reactive  
- не нужно везде писать .value

Плюсы ref
- работает с чем угодно

shalowref обект моем заменить, а сам объект не реактивен

![img_2.png](img_2.png)

## [Директивы](directives.md)


## [Компоненты](components.md)

## [Слоты](slots.md)

## [Пользовательские директивы](user-directives.md)

## State management & Pinia
Pinia позволāет легко организовýватþ взаимодействие
множества компонентов, ùто упроûает разработку и
поддержку приложениā

Pinia — это хранилище состояний для Vue.js, официальная замена Vuex.

## Тесты

### Установка
- vitest
- jsdom
- @types/jsdom
- @vue/test-utils


### AAA подход
1. Arrange - договариваемсā о входном знаùении и
   ожидаемом резулþтате  
2. Act - вýзýваем наú код от входнýх даннýх.
   Желателþно толþко один вýзов функøии!  
3. Assert - проверāем, ùто резулþтатý вýзова
   соответствуĀт ожиданиāм
   ![img_3.png](img_3.png)
   

### Тестирование компонентов
Исполþзуем пакет @vue/test-utils и функøиĀ mount()

   
## Синтаксис
### Pinia в тестах
```js
   beforeEach(() => {
    setActivePinia(createPinia())
   })
```

### Используем vue роутер в тестах
```js
import router from '@/router/index'
import { test } from 'vitest'
test('using router', async () => {
   router.push({ name: 'home' })
   await router.isReady()
   const wrapper = mount(App, { global: { plugins: [router] } })
])
```

### Браузерные тесты
- рендер браузера (показать, скрыть элементы, положение элементов)
- Брузерное API
- Загрузка или сохранение файлов
- Анимации
- Браузерные события (одно порождает другое итд)

``` @playwright/test ```

##Десктоп приложение на примере Electron
npm create @quick-start/electron@latest

##Nuxt
![img_4.png](img_4.png)

```https://nuxt.com/docs/4.x/directory-structure/app/middleware```






















