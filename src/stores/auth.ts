import {ref,computed} from 'vue'
import {defineStore} from 'pinia'
import {authService} from '../services'
import type {User} from '../services/auth/type'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('auth_token'))
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)
    const initAuth = async () => {
        if(token.value){
            try {
                const response = await authService.getMe()
                user.value = response.data

            }catch(err){
                logout()

            }
        }
    }

    const login = async (email:string,password:string) => {
        loading.value = true
        error.value = null
        try {
            const response = await authService.login({email,password})
            token.value = response.data.access_token
            localStorage.setItem('auth_token',token.value)
            return { success: true }

        }catch(err){
            const errorMessage = err instanceof Error ? err.message : 'An error occurred'
            error.value = errorMessage
            return { success: false, message: errorMessage }

        }finally{
            loading.value = false
        }
    }

    const logout = async () => {
        try{
            if(token.value){
                await authService.logout()
            }
            
        }catch(err){

        }finally{
            user.value = null
            token.value = null
            localStorage.removeItem('auth_token')
        }
    }
    return { 
        user, token, loading, error, isAuthenticated, initAuth, login ,logout  
    }

})