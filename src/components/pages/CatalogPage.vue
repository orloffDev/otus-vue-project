<!-- ParentComponent.vue -->
<script setup>
  import { ref, reactive, watch } from 'vue';
  import axios from 'axios';

  
import Products from '../prod/Products.vue';
import FilterBlock from '../prod/FilterBlock.vue';
import NewProductBlock from '../prod/NewProductBlock.vue';
import OrderForm from '../prod/OrderForm.vue';

let allProductsData = ref([])
let filteredProductsData = ref([])

//search


const loading = ref(true)
const error = ref(null)
const getProducts = async () => {
    try {
    loading.value = true
    const response = await axios.get('https://www.kinoafisha.info/examples/products.json')
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

const filterProducts = function(products, filters) {
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
getProducts();

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
          <NewProductBlock />
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