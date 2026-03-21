import {beforeEach} from 'vitest'
import {setActivePinia, createPinia} from "pinia";

import { config } from '@vue/test-utils';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

// Создаем тестовый Apollo Client
const testApolloClient = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false, // Отключаем __typename для тестов
    }),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache', // Отключаем кэш в тестах
        },
        mutate: {
            fetchPolicy: 'no-cache',
        },
    },
    // Опционально: добавляем URI для реальных запросов (если нужно)
    uri: 'http://localhost:4000/graphql',
});

// Глобально предоставляем Apollo Client для всех тестов
// Это работает для Options API
config.global.provide = {
    apollo: testApolloClient,
    ...config.global.provide,
};

// Для Composition API - глобально предоставляем клиент
provideApolloClient(testApolloClient);

beforeEach(()=>{
    setActivePinia(createPinia())
})
