<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { language } from './utils/language'
import { ref } from 'vue'

const { locale } = useI18n()
const isOpen = ref<boolean>(false)
const selectedLang = ref<string>('Italiano')

function changeLanguage(label: string, newLocale: string) {
  locale.value = newLocale
  selectedLang.value = label
}
</script>

<template>
  <div class="fixed top-4 right-3">
    <button
      :class="['px-3 py-2 bg-white w-[140px] flex border-secondartText items-center gap-2 text-secondaryText font-semibold cursor-pointer', isOpen ? 'rounded-tl-md rounded-tr-md border-1' : 'rounded-md border-1']"
      @click="isOpen = !isOpen"
    >
      <img :src="language.find(l => l.code === locale)?.src" :alt="locale" class="w-6 h-4 object-cover rounded-sm" />
      <span>{{ selectedLang }}</span>
      <i v-if="!isOpen" class="pi pi-chevron-down text-xs"></i>
      <i v-else class="pi pi-chevron-up text-xs"></i>
    </button>
    <div
      v-if="isOpen"
      class="absolute right-0 w-[140px] bg-white text-secondaryText font-semibold z-10 rounded-bl-md rounded-br-md border-b-1 border-x-1"
      @click.outside="isOpen = false"
    >
      <div
        v-for="lang in language"
        :key="lang.code"
        class="flex items-center gap-2 px-3 py-2 cursor-pointer"
        @click="changeLanguage(lang.label, lang.code)"
      >
        <img :src="lang.src" :alt="lang.code" class="w-6 h-4 object-cover rounded-sm" />
        <span>{{ lang.label }}</span>
      </div>
    </div>
  </div>
</template>
