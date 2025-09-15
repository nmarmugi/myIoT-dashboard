<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { navLinks } from './utils/links'

const isOpenSidebar = ref<boolean>(true)
const route = useRoute()
</script>

<template>
    <div :class="['absolute', isOpenSidebar ? 'bg-white' : 'bg-background']">
        <div :class="['flex flex-col gap-3 items-center bg-white w-24 transition-transform duration-300', isOpenSidebar ? 'translate-x-0 min-h-screen' : '-translate-x-24']">
            <div class="w-24 cursor-pointer" @click="isOpenSidebar = false">
                <img src="/logo.png" alt="Logo" />
            </div>
            <div class="flex flex-col gap-5 w-full items-center">
                <router-link v-for="link in navLinks" :key="link.path" :to="link.path" class="text-secondaryText cursor-pointer flex items-center w-full">
                    <div class="w-1/2 flex justify-end">
                        <i :class="link.icon"></i>
                    </div>
                    <div class="w-1/2 flex justify-end">
                        <span v-if="route.path === link.path" class="border-2 rounded-tl-md rounded-bl-md border-secondaryText h-4"></span>
                    </div>
                </router-link>
            </div>
        </div>
        <div
            v-if="!isOpenSidebar"
            class="absolute top-4 left-0 w-12 h-12 bg-white flex items-center justify-center cursor-pointer shadow-lg rounded-r-md transition-all duration-300"
            @click="isOpenSidebar = true"
        >
            <img src="/logo.png" alt="Logo" class="w-10 h-10" />
        </div>
    </div>
</template>
