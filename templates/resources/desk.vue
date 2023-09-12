<script lang="ts" setup>
import type { MetaFlatInput } from 'zhead'
const desk = setupDeskPage()

// override seo meta for each desk
const seoData: Record<string, MetaFlatInput & { title?: string | null | undefined }> = {
  'Drag a card here': {
    title: 'Drag a card here',
    description: 'Drag a card here Description',
  },
  'Delete me': {
    title: 'Delete me',
    description: 'Delete me Description',
  },
}
useSeoMeta(() => ({
  title: `All articles under ${desk.value.name}`, // can set default value here
  ...seoData[desk.value.name],
}))
</script>

<template>
  <DeskArticles :desk="desk" infinite-scroll is-desk-page />
</template>
