<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const localError = ref<string | null>(null)
const loading = ref(false)

onMounted(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
})

const handleLogin = async (e: Event) => {
    e.preventDefault() // IMPORTANT: Prevent default form submission
    localError.value = null
    
    if (!email.value || !password.value) {
        localError.value = 'Email dan password harus diisi.'
        return
    }
    
    // loading.value = true
    // setTimeout(() => {
    //     loading.value = false
    //     router.push('/home')
    // }, 1000)

    const result = await authStore.login(email.value, password.value)   
    if(result.success) {
        router.push('/home')
    } else {
        loading.value = false
        localError.value = result.message || 'Gagal login. Silakan coba lagi.'
    }
}
</script>

<template>
    <div class="fixed inset-0 w-screen h-screen bg-base-200 flex items-center justify-center p-4">
        <div class="card w-full max-w-sm bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="text-2xl font-bold text-center text-primary mb-1">Angga Jago Koding</h2>
                <p class="text-center text-base-content/60 mb-6">Silakan login dengan akun Anda</p>
                
                <form @submit="handleLogin" novalidate>
                    <!-- Email -->
                    <fieldset class="fieldset">
                        <legend class="fieldset-legen">Email</legend>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="nama@email.com"
                            class="input w-full"
                        />
                    </fieldset>
                    
                    <!-- Password -->
                    <fieldset class="fieldset mt-4">
                        <legend class="fieldset-legen">Password</legend>
                        <div class="join w-full">
                            <input
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                placeholder="Masukan password"
                                class="input join-item flex-1"
                            />
                            <button 
                                type="button" 
                                class="btn join-item" 
                                @click="showPassword = !showPassword"
                            >
                                {{ showPassword ? 'hide' : 'show' }}
                            </button>
                        </div>
                    </fieldset>
                    
                    <!-- Error Message -->
                    <div v-if="localError" class="alert alert-error mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{{ localError }}</span>
                    </div>
                    
                    <!-- Button Login -->
                    <div class="mt-6">
                        <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                            {{ loading ? 'Memproses...' : 'Login' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>