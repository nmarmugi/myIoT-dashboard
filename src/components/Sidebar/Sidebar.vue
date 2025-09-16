<script setup lang="ts">
import { ref } from 'vue'
import { navLinks } from './utils/links'
import NavLink from './components/NavLink.vue'
import { useRoute } from 'vue-router'

const isOpenSidebar = ref<boolean>(true)
const route = useRoute()
</script>

<template>
    <div v-if="navLinks.some(link => link.path === route.path)" :class="['fixed z-50 min-h-screen h-full', isOpenSidebar ? 'bg-white' : 'bg-background h-10 w-0']">
        <div :class="['flex flex-col gap-3 items-center bg-white w-24 transition-transform duration-300', isOpenSidebar ? 'translate-x-0' : '-translate-x-24']">
            <div class="w-24 cursor-pointer" @click="isOpenSidebar = false">
                <img src="/images/logo.png" alt="Logo" />
            </div>
            <div class="flex flex-col gap-5 w-full items-center">
                <NavLink @click="isOpenSidebar = false" v-for="link in navLinks" :key="link.path" :path="link.path" :icon="link.icon" />
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
