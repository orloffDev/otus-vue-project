import {defineStore} from "pinia";
import {ref} from 'vue'

export const useUserStore = defineStore('account', () => {
    let authData = ref(JSON.parse(localStorage.getItem('user')) || null)

    const login = (newAuthData)=>{
        authData.value = newAuthData
        localStorage.setItem('user', JSON.stringify(authData.value))
    }

    const logout = ()=>{
        authData.value = null
        localStorage.removeItem('user')
    }

    return {authData, login, logout}
})
