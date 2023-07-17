<script setup lang="ts">
import dayjs from 'dayjs'

type Article = ReturnType<typeof setupArticlePage>['value']
defineProps<{ article: Article }>()
</script>

<template>
  <article class="overflow-hidden">
    <NuxtLink
      :to="`/posts/${article.slug}`"
      class="relative mb-4 block aspect-[3/2] rounded-3xl bg-neutral-100 duration-500 after:absolute after:inset-0 after:rounded-3xl after:transition-colors after:content-[''] after:hover:bg-black/10"
    >
      <nuxt-img
        v-if="article.cover?.url"
        :src="article.cover.url"
        :alt="article.cover?.alt"
        class="h-full w-full rounded-3xl object-cover"
        loading="lazy"
      />
      <div v-else class="aspect-[3/2] rounded-3xl bg-gray-100 transition duration-200 ease-in" />
    </NuxtLink>
    <div>
      <NuxtLink
        :to="`/desks/${article.desk.slug}`"
        class="text-xs font-medium uppercase tracking-[.7px] text-sky-800 hover:underline dark:text-orange-300"
      >
        {{ article.desk.name }}
      </NuxtLink>
      <h3 class="my-2 font-sans text-2xl font-semibold hover:underline dark:text-white">
        <NuxtLink :to="`/posts/${article.slug}`">
          {{ article.title }}
        </NuxtLink>
      </h3>
      <p class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="author of article.authors"
          :key="author.id"
          :to="`/author/${author.id}`"
          class="block text-xs font-medium uppercase tracking-[.7px] text-gray-600 hover:underline dark:text-neutral-400"
        >
          {{ author.name }}
        </NuxtLink>
      </p>
      <time
        v-if="article.published_at"
        class="mt-2 text-xs text-gray-600 dark:text-neutral-400"
        :datetime="article.published_at"
      >
        {{ dayjs(article.published_at).format('MMMM DD, YYYY') }}
      </time>
    </div>
  </article>
</template>

<style scoped></style>
