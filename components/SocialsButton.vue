<script lang="ts" setup>
import type { SocialsTypes } from '~~/utils/types'

defineProps<{
  type: SocialsTypes
  url: string
}>()

const iconMap: Record<SocialsTypes, string> = {
  Geneva: '',
  Reddit: 'bxl:reddit',
  TikTok: 'bxl:tiktok',
  Twitter: 'bxl:twitter',
  YouTube: 'bxl:youtube',
  Facebook: 'bxl:facebook',
  LinkedIn: 'bxl:linkedin-square',
  Whatsapp: 'bxl:whatsapp',
  Instagram: 'bxl:instagram',
  Pinterest: 'bxl:pinterest',
}

const imageMap: Record<string, string> = {
  Geneva: 'https://www.geneva.com/static/geneva-icon.png',
}
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noreferrer noopener"
    class="group flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-stone-800 transition-colors hover:bg-stone-800 dark:bg-zinc-900"
  >
    <Icon
      v-if="iconMap[type]"
      :name="iconMap[type]"
      class="text-stone-800 transition-colors group-hover:text-white dark:text-neutral-400 dark:group-hover:text-white"
    />
    <div
      v-else-if="imageMap[type]"
      class="relative duration-500 after:absolute after:inset-0 after:transition-colors after:content-[''] after:hover:bg-black/20"
    >
      <NuxtImg :src="imageMap[type]" />
    </div>
  </a>
</template>
