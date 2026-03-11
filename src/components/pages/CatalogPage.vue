<!-- ParentComponent.vue -->
<script setup>
  import { useQuery } from '@vue/apollo-composable'
  import { gql } from '@apollo/client/core'
  import {ref, computed, reactive, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import Products from '../prod/Products.vue';
  import FilterBlock from '../prod/FilterBlock.vue';
  import OrderForm from '../prod/OrderForm.vue';

  // GraphQL запрос для получения списка продуктов
  const PRODUCTS_QUERY = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`
  // Выполняем запрос
  const { result, loading, error, refetch } = useQuery(PRODUCTS_QUERY)





  const allProductsData = computed(() =>{
    if (result.value?.posts?.data) {
      return result.value.posts.data.map(product => ({
        price: Math.random()*1000,
        decription: product.body,
        category: 'Категория',
        rating: {
          "rate": Math.random()*10,
          "count": Math.random()*100,
        },
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        ...product
      }))
    }
    return []
  })

  let filteredProductsData = ref(allProductsData.value)

//search



const getProducts = async () => {
    try {
    loading.value = true
    const response = await axios.post('https://www.kinoafisha.info/frontend/otus-products/')
    allProductsData.value = response.data
    filteredProductsData.value = response.data
  } catch (err) {
    error.value = err.message || 'Не удалось загрузить товары'
  } finally {
    loading.value = false
  }
}



const formData = reactive({
  title: '',
  minPrice: '',
  maxPrice: ''
})

const filterProducts = (products, filters)=>{
      return products.filter(product => {
          // Фильтр по названию (регистронезависимый поиск)
          if (filters.title && filters.title.length>2 && !product.title.toLowerCase().includes(filters.title.toLowerCase())) {
              return false;
          }
          
          // Фильтр по минимальной цене
          if (filters.minPrice && product.price < filters.minPrice) {
              return false;
          }
          
          // Фильтр по максимальной цене
          if (filters.maxPrice && product.price > filters.maxPrice) {
              return false;
          }
          
          return true;
      });
  }


// Отслеживание изменений
watch(formData, (newVal) => {
  console.log('Данные изменились:', newVal);

  filteredProductsData.value = filterProducts(allProductsData.value, newVal);

}, { deep: true })

//
//getProducts();

</script>

<template>
  <div>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <section>
        <main>
          <FilterBlock v-model:form-data="formData" />
          <Products :items="filteredProductsData" />
        </main>
        <aside>
          <OrderForm />
        </aside>
      </section>
    </div>
  </div>
</template>

<style scoped>
  @media (max-width:759px){
    section {
      display: flex;
      flex-direction: column-reverse;
      row-gap: 20px;
    }
  }


  @media (min-width:760px){
    section {
      display: grid;
      align-items: flex-start;
      grid-template-columns: 1fr 200px;
      column-gap: 20px;
    }

    aside {
        position:sticky;
        left:0;
        top:0;
    }
  }
  



</style>