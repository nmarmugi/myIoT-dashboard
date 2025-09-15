<script setup lang="ts">
import { useRoute } from 'vue-router';
defineProps<{path: string, icon: string}>();

const route = useRoute()
</script>

<template>
    <router-link :to="path" class="text-secondaryText cursor-pointer flex items-center w-full">
        <div class="w-1/2 flex justify-end">
            <i :class="icon"></i>
        </div>
        <div class="w-1/2 flex justify-end">
            <span v-if="route.path === path" class="border-2 rounded-tl-md rounded-bl-md border-secondaryText h-4"></span>
        </div>
    </router-link>
</template>