<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomNavigation from '../components/BottomNavigation.vue'

const router = useRouter()

const mockUser = {
    name: "Angga Jago Koding",
    role: "Employee"
}

const mockAttendanceHistory = [
    { id: 1, attendance_date: '2025-12-26', check_in_time: '08:15:00', check_out_time: '17:05:00', status: 'on_time', is_late: false },
    { id: 2, attendance_date: '2025-12-25', check_in_time: '08:32:00', check_out_time: '17:00:00', status: 'present', is_late: true },
    { id: 3, attendance_date: '2025-12-24', check_in_time: '07:55:00', check_out_time: '17:10:00', status: 'on_time', is_late: false },
    { id: 4, attendance_date: '2025-12-23', check_in_time: '08:00:00', check_out_time: '17:00:00', status: 'on_time', is_late: false },
    { id: 5, attendance_date: '2025-12-22', check_in_time: null, check_out_time: null, status: 'absent', is_late: false },
]

const hasCheckedIn = ref(false)
const loading = ref(false)
const currentTime = ref(new Date())

setInterval(() => {
    currentTime.value = new Date()
}, 1000)

const formattedDate = computed(() => {
    return currentTime.value.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
})

const checkinTime = computed(() => {
    return hasCheckedIn.value ? '08:15' : '--:--'
})

const checkoutTime = computed(() => {
    return hasCheckedIn.value ? '17:05' : '--:--'
})

const goToAttendance = () => {
    router.push('/attendance')
}



const getStatusBadge = (status: string, isLate: boolean) => {
    if (status === 'absent') return 'badge-error'
    if (isLate) return 'badge-warning'
    return 'badge-success'
}

const getStatusText = (status: string, isLate: boolean) => {
    if (status === 'absent') return 'Tidak Hadir'
    if (isLate) return 'Terlambat'
    return 'Tepat Waktu'
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })
}
</script>

<template>
    <div class="min-h-screen bg-base-200 pb-24">
        <!-- Header Section -->
        <div class="bg-primary text-white pt-8 px-5 pb-5 rounded-b-3xl">
            <!-- User Info & Date -->
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-xl font-bold mb-0.5">{{ mockUser.name }}</h2>
                    <p class="text-sm opacity-90">{{ mockUser.role }}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-medium">{{ formattedDate }}</p>
                </div>
            </div>

            <!-- Title -->
            <p class="text-sm mb-4 opacity-95">Presensi Hari Ini</p>

            <!-- Check In/Out Card -->
            <div class="bg-white rounded-2xl p-4 text-gray-800">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center">
                        <p class="text-xs text-gray-500 mb-2">Check In</p>
                        <p class="text-2xl font-bold text-primary">{{ checkinTime }}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500 mb-2">Check Out</p>
                        <p class="text-2xl font-bold text-primary">{{ checkoutTime }}</p>
                    </div>
                </div>

                <button
                    v-if="!hasCheckedIn"
                    class="btn btn-primary w-full rounded-xl"
                    @click="goToAttendance"
                    :disabled="loading"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    {{ loading ? 'Memproses...' : 'Check In' }}
                </button>

                <button
                    v-else
                    class="btn btn-outline btn-primary w-full rounded-xl"
                    @click="goToAttendance"
                >
                    Check Out
                </button>
            </div>
        </div>

        <!-- Attendance History -->
        <div class="px-5 mt-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-bold text-base-content">Riwayat Presensi</h3>
                <button class="text-sm text-primary font-medium" >
                    Lihat Semua
                </button>
            </div>

            <div class="space-y-3">
                <div
                    v-for="record in mockAttendanceHistory"
                    :key="record.id"
                    class="card bg-base-100 shadow-sm"
                >
                    <div class="card-body p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex-1">
                                <p class="font-semibold text-base-content mb-1">{{ formatDate(record.attendance_date) }}</p>
                                <div class="flex items-center gap-4 text-sm text-base-content/70">
                                    <span v-if="record.check_in_time">
                                        Masuk: {{ record.check_in_time.substring(0, 5) }}
                                    </span>
                                    <span v-if="record.check_out_time">
                                        Keluar: {{ record.check_out_time.substring(0, 5) }}
                                    </span>
                                    <span v-if="!record.check_in_time && !record.check_out_time">
                                        Tidak ada data
                                    </span>
                                </div>
                            </div>
                            <div :class="['badge badge-sm', getStatusBadge(record.status, record.is_late)]">
                                {{ getStatusText(record.status, record.is_late) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bottom Navigation -->
    <BottomNavigation />
    </div>
</template>