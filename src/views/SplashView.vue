<script lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const isVisible = ref(true);
    
    onMounted(() => {
      // Hide scrollbar saat splash screen
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        isVisible.value = false;
      }, 2000);
      
      setTimeout(() => {
        // Restore scrollbar sebelum pindah halaman
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        router.push('/Login');
      }, 2300);
    });
    
    return {
      isVisible
    }
  }
}
</script>

<template>
  <div 
    class="fixed inset-0 w-screen h-screen bg-base-100 flex flex-col items-center justify-center transition-opacity duration-300"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
  >
    <h1 class="text-3xl font-bold text-primary">Angga jago koding</h1>
    <p class="text-base-content/60 mt-2">Sistem Presensi Digital</p>
    <span class="loading loading-dots loading-lg mt-4 text-primary"></span>
  </div>
</template>