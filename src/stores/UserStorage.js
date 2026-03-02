import {defineStore} from "pinia";
import {ref, computed} from 'vue'

export const useUserStore = defineStore('account', () => {
    let token = ref(localStorage.getItem('token'))
    const save = (newToken)=>{
        token.value = newToken;
        localStorage.setItem('token', newToken)
    }

    return {token, save}
})
