<script setup lang="ts">
import { ref } from 'vue'
import { navLinks } from './utils/links'
import NavLink from './components/NavLink.vue'

const isOpenSidebar = ref<boolean>(true)
</script>

<template>
    <div :class="['absolute', isOpenSidebar ? 'bg-white' : 'bg-background']">
        <div :class="['flex flex-col gap-3 items-center bg-white w-24 transition-transform duration-300', isOpenSidebar ? 'translate-x-0 min-h-screen' : '-translate-x-24 h-10 w-10']">
            <div class="w-24 cursor-pointer" @click="isOpenSidebar = false">
                <img src="/images/logo.png" alt="Logo" />
            </div>
            <div class="flex flex-col gap-5 w-full items-center">
                <NavLink v-for="link in navLinks" :key="link.path" :path="link.path" :icon="link.icon" />
            </div>
        </div>
        <div
            v-if="!isOpenSidebar"
            class="absolute top-4 left-0 w-12 h-12 bg-white flex items-center justify-center cursor-pointer shadow-lg rounded-r-md transition-all duration-300"
            @click="isOpenSidebar = true"
        >
            <img src="/images/logo.png" alt="Logo" class="w-10 h-10" />
        </div>
    </div>
</template>
