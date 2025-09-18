<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { language } from './utils/language'
import { ref } from 'vue'

const { locale } = useI18n()
const isOpen = ref<boolean>(false)

function changeLanguage(newLocale: string) {
  locale.value = newLocale
}
</script>

<template>
  <div class="fixed top-4 right-3">
    <button
      class="px-3 py-2 rounded-md bg-white flex items-center gap-2 text-secondaryText font-semibold cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <img :src="language.find(l => l.code === locale)?.src" :alt="locale" class="w-6 h-4 object-cover rounded-sm" />
      <span>{{ locale === 'it' ? 'Italiano' : 'English' }}</span>
      <i v-if="!isOpen" class="pi pi-chevron-down text-xs"></i>
      <i v-else="isOpen" class="pi pi-chevron-up text-xs"></i>
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-1 w-40 bg-white rounded-md text-secondaryText font-semibold z-10"
      @click.outside="isOpen = false"
    >
      <div
        v-for="lang in language"
        :key="lang.code"
        class="flex items-center gap-2 px-3 py-2 cursor-pointer"
        @click="changeLanguage(lang.code)"
      >
        <img :src="lang.src" :alt="lang.code" class="w-6 h-4 object-cover rounded-sm" />
        <span>{{ lang.code === 'it' ? 'Italiano' : 'English' }}</span>
      </div>
    </div>
  </div>
</template>
